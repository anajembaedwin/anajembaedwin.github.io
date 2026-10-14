import React, { useState } from "react";

import INFO from "../data/user";
import { useI18n, fmt, fmtText } from "../i18n";

// Web3Forms access key. It is designed to be public in client-side code.
// Put it in .env.local as REACT_APP_WEB3FORMS_KEY before building.
// Without it the form falls back to opening the visitor's email app.
const ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ defaultTypeIndex, defaultMessage }) => {
	const { lang, site, ui } = useI18n();
	const f = ui.form;
	const types = site.contact.collabTypes;
	const [values, setValues] = useState({
		name: "",
		email: "",
		typeIndex: defaultTypeIndex || 0,
		message: defaultMessage || "",
		botcheck: "",
	});
	const [errors, setErrors] = useState({});
	const [status, setStatus] = useState("idle");

	const update = (field) => (event) => {
		setValues({ ...values, [field]: event.target.value });
		if (errors[field]) {
			setErrors({ ...errors, [field]: undefined });
		}
	};

	const validate = () => {
		const next = {};
		if (!values.name.trim()) next.name = f.errName;
		if (!values.email.trim()) {
			next.email = f.errEmail;
		} else if (!EMAIL_PATTERN.test(values.email.trim())) {
			next.email = f.errEmailInvalid;
		}
		if (!values.message.trim()) {
			next.message = f.errMessage;
		}
		return next;
	};

	const submit = async (event) => {
		event.preventDefault();
		const found = validate();
		setErrors(found);
		if (Object.keys(found).length > 0) return;

		if (!ACCESS_KEY) {
			const typeLabel = types[values.typeIndex] || types[0];
			const subject = fmtText(f.subject, {
				type: typeLabel,
				name: values.name.trim(),
			});
			const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
			window.location.href = `mailto:${INFO.main.email}?subject=${encodeURIComponent(
				subject
			)}&body=${encodeURIComponent(body)}`;
			setStatus("mailto");
			return;
		}

		setStatus("sending");
		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					access_key: ACCESS_KEY,
					subject: fmtText(f.subject, {
						type: types[values.typeIndex] || types[0],
						name: values.name.trim(),
					}),
					from_name: values.name.trim(),
					name: values.name.trim(),
					email: values.email.trim(),
					collaboration_type: types[values.typeIndex] || types[0],
					language: lang,
					message: values.message.trim(),
					botcheck: values.botcheck,
				}),
			});
			const result = await response.json();
			setStatus(result.success ? "sent" : "error");
		} catch (error) {
			setStatus("error");
		}
	};

	if (status === "sent") {
		return (
			<div className="form-result" role="status">
				<h3>{f.sentTitle}</h3>
				<p>
					{fmtText(f.sentBody, {
						name: values.name.trim(),
						email: values.email.trim(),
					})}
				</p>
			</div>
		);
	}

	return (
		<form className="form" onSubmit={submit} noValidate>
			<div className="field">
				<label htmlFor="cf-name">{f.name}</label>
				<input
					id="cf-name"
					type="text"
					autoComplete="name"
					value={values.name}
					onChange={update("name")}
					aria-invalid={errors.name ? "true" : undefined}
					aria-describedby={errors.name ? "cf-name-err" : undefined}
				/>
				{errors.name && (
					<div className="field__error" id="cf-name-err">
						{errors.name}
					</div>
				)}
			</div>

			<div className="field">
				<label htmlFor="cf-email">{f.email}</label>
				<input
					id="cf-email"
					type="email"
					autoComplete="email"
					placeholder={f.emailPlaceholder}
					value={values.email}
					onChange={update("email")}
					aria-invalid={errors.email ? "true" : undefined}
					aria-describedby={errors.email ? "cf-email-err" : undefined}
				/>
				{errors.email && (
					<div className="field__error" id="cf-email-err">
						{errors.email}
					</div>
				)}
			</div>

			<div className="field">
				<label htmlFor="cf-type">{f.type}</label>
				<select
					id="cf-type"
					value={values.typeIndex}
					onChange={(event) =>
						setValues({ ...values, typeIndex: Number(event.target.value) })
					}
				>
					{types.map((type, i) => (
						<option key={type} value={i}>
							{type}
						</option>
					))}
				</select>
			</div>

			<div className="field">
				<label htmlFor="cf-message">{f.message}</label>
				<textarea
					id="cf-message"
					rows="5"
					placeholder={f.messagePlaceholder}
					value={values.message}
					onChange={update("message")}
					aria-invalid={errors.message ? "true" : undefined}
					aria-describedby={errors.message ? "cf-message-err" : undefined}
				/>
				{errors.message && (
					<div className="field__error" id="cf-message-err">
						{errors.message}
					</div>
				)}
			</div>

			<input
				type="checkbox"
				name="botcheck"
				className="form__trap"
				tabIndex="-1"
				autoComplete="off"
				aria-hidden="true"
				checked={values.botcheck === "on"}
				onChange={(event) =>
					setValues({
						...values,
						botcheck: event.target.checked ? "on" : "",
					})
				}
			/>

			<button
				className="btn btn--hot"
				type="submit"
				disabled={status === "sending"}
			>
				{status === "sending" ? f.sending : f.send}
			</button>

			<div className="form__note" role="status">
				{status === "mailto" &&
					fmtText(f.mailtoNote, { email: INFO.main.email })}
				{status === "error" && (
					<span>
						{fmt(f.failed, {
							email: (
								<a href={`mailto:${INFO.main.email}`}>{INFO.main.email}</a>
							),
						})}
					</span>
				)}
			</div>
		</form>
	);
};

export default ContactForm;
