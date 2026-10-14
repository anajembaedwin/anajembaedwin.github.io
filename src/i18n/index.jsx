import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { SITE } from "../data/site";
import PRODUCTS from "../data/products";
import INFO from "../data/user";

import en from "./en";
import fr from "./fr";
import pt from "./pt";
import es from "./es";

const TABLE = { en, fr, pt, es };
export const LANGS = Object.keys(TABLE).map((code) => ({
	code,
	label: TABLE[code].label,
	name: TABLE[code].name,
}));

const isObject = (value) =>
	value !== null && typeof value === "object" && !Array.isArray(value);

// Overlay a translation on the English base. Arrays are merged item by
// item, so a translation only has to supply the text fields.
const merge = (base, over) => {
	if (over === undefined) return base;
	if (Array.isArray(over)) {
		return over.map((item, i) =>
			merge(Array.isArray(base) ? base[i] : undefined, item)
		);
	}
	if (isObject(over) && isObject(base)) {
		const out = { ...base };
		Object.keys(over).forEach((key) => {
			out[key] = merge(base[key], over[key]);
		});
		return out;
	}
	return over;
};

const initialLang = () => {
	try {
		const saved = window.localStorage.getItem("lang");
		if (saved && TABLE[saved]) return saved;
	} catch (error) {
		// storage unavailable: fall through to the browser language
	}
	const wanted = (navigator.languages || [navigator.language || "en"]).map(
		(code) => String(code).slice(0, 2).toLowerCase()
	);
	return wanted.find((code) => TABLE[code]) || "en";
};

const I18nContext = createContext(null);

export const I18nProvider = ({ children }) => {
	const [lang, setLangState] = useState(initialLang);

	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);

	const setLang = useCallback((code) => {
		if (!TABLE[code]) return;
		setLangState(code);
		try {
			window.localStorage.setItem("lang", code);
		} catch (error) {
			// ignore: the choice just won't be remembered
		}
	}, []);

	const value = useMemo(() => {
		const pack = TABLE[lang];
		const site = merge(SITE, pack.site);
		const products = PRODUCTS.map((product) => ({
			...product,
			...((pack.products || {})[product.slug] || {}),
		}));
		const projects = INFO.projects.map((project, i) => ({
			...project,
			description: (pack.projects || [])[i] || project.description,
		}));
		return { lang, setLang, site, ui: merge(en.ui, pack.ui), products, projects };
	}, [lang, setLang]);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);

// Fill {placeholders} in a string with React nodes (for links) ...
export const fmt = (text, map = {}) =>
	text.split(/(\{\w+\})/g).map((part, i) => {
		const match = part.match(/^\{(\w+)\}$/);
		if (match && match[1] in map) {
			return <React.Fragment key={i}>{map[match[1]]}</React.Fragment>;
		}
		return part;
	});

// ... or with plain strings (for attributes and email subjects).
export const fmtText = (text, map = {}) =>
	text.replace(/\{(\w+)\}/g, (all, key) => (key in map ? map[key] : all));
