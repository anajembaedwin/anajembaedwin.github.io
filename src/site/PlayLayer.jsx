import React, { useEffect, useState, useSyncExternalStore } from "react";

import { useI18n } from "../i18n";
import { burst } from "./reactions";
import { getCount, install, onReset, reset, subscribe } from "./play";

// The floating "Reset the world" button, a one-time hint, and a small toast.
const PlayLayer = () => {
	const { ui } = useI18n();
	const count = useSyncExternalStore(subscribe, getCount);
	const [toast, setToast] = useState(null);
	const [hint, setHint] = useState(false);

	useEffect(() => install(), []);

	useEffect(
		() =>
			onReset((auto) => {
				const button = document.querySelector(".play-reset");
				const box = button ? button.getBoundingClientRect() : null;
				const x = box ? box.left + box.width / 2 : window.innerWidth - 60;
				const y = box ? box.top + box.height / 2 : window.innerHeight - 40;
				if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
					const ring = document.createElement("div");
					ring.className = "play-ripple";
					ring.style.left = `${x}px`;
					ring.style.top = `${y}px`;
					ring.addEventListener("animationend", () => ring.remove());
					document.body.appendChild(ring);
					burst(x, y, ["🌍", "✨", "💫"], 8);
				}
				setToast(auto ? `${ui.worldReset} 🌍` : `${ui.worldReset} ✨`);
			}),
		[ui.worldReset]
	);

	useEffect(() => {
		if (!toast) return undefined;
		const timer = setTimeout(() => setToast(null), 2200);
		return () => clearTimeout(timer);
	}, [toast]);

	// Show the hint once per visit.
	useEffect(() => {
		let seen = false;
		try {
			seen = window.sessionStorage.getItem("play-hint") === "1";
		} catch (error) {
			seen = false;
		}
		if (seen) return undefined;
		const show = setTimeout(() => {
			setHint(true);
			try {
				window.sessionStorage.setItem("play-hint", "1");
			} catch (error) {
				// ignore
			}
		}, 4500);
		const hide = setTimeout(() => setHint(false), 11500);
		return () => {
			clearTimeout(show);
			clearTimeout(hide);
		};
	}, []);

	const coarse =
		typeof window !== "undefined" &&
		window.matchMedia("(pointer: coarse)").matches;

	return (
		<React.Fragment>
			<button
				type="button"
				className={`play-reset${count > 0 ? " is-on" : ""}`}
				onClick={() => reset(false)}
				tabIndex={count > 0 ? 0 : -1}
				aria-hidden={count > 0 ? undefined : "true"}
			>
				<span className="play-reset__icon" aria-hidden="true">
					↺
				</span>
				{ui.reset}
			</button>
			{hint && count === 0 && (
				<div className="play-hint" role="status">
					{coarse ? ui.dragHintTouch : ui.dragHint}
				</div>
			)}
			{toast && (
				<div className="play-toast" role="status">
					{toast}
				</div>
			)}
		</React.Fragment>
	);
};

export default PlayLayer;
