import React, { useState } from "react";

import INFO from "../data/user";
import { SITE } from "../data/site";

// Web3Forms access key. It is designed to be public in client-side code.
// Put it in .env.local as REACT_APP_WEB3FORMS_KEY before building.
// Without it the form falls back to opening the visitor's email app.
const ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ defaultType, defaultMessage }) => {
	const types = SITE.contact.collabTypes;
	const [values, setValues] = useState({
		name: "",
		email: "",
		type: defaultType || types[0],
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
		if (!values.name.trim()) next.name = "Enter your name.";
		if (!values.email.trim()) {
			next.email = "Enter your email address.";
		} else if (!EMAIL_PATTERN.test(values.email.trim())) {
			next.email = "Enter a valid email address, like name@company.com.";
		}
		if (!values.message.trim()) {
			next.message = "Tell me a little about what you need.";
		}
		return next;
	};

	const submit = async (event) => {
		event.preventDefault();
		const found = validate();
		setErrors(found);
		if (Object.keys(found).length > 0) return;

		if (!ACCESS_KEY) {
			const subject = `${values.type}: message from ${values.name.trim()}`;
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
					subject: `${values.type}: message from ${values.name.trim()}`,
					from_name: values.name.trim(),
					name: values.name.trim(),
					email: values.email.trim(),
					collaboration_type: values.type,
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
				<h3>Message sent</h3>
				<p>Thanks, {values.name.trim()}. I'll reply to {values.email.trim()}.</p>
			</div>
		);
	}

	return (
		<form className="form" onSubmit={submit} noValidate>
			<div className="field">
				<label htmlFor="cf-name">Name</label>
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
				<label htmlFor="cf-email">Email</label>
				<input
					id="cf-email"
					type="email"
					autoComplete="email"
					placeholder="name@company.com"
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
				<label htmlFor="cf-type">What do you need?</label>
				<select id="cf-type" value={values.type} onChange={update("type")}>
					{types.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>

			<div className="field">
				<label htmlFor="cf-message">Message</label>
				<textarea
					id="cf-message"
					rows="5"
					placeholder="What you're building, your timeline, and your budget range"
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
				{status === "sending" ? "Sending…" : "Send message"}
			</button>

			<div className="form__note" role="status">
				{status === "mailto" &&
					`Your email app should open with the message filled in. If it didn't, email ${INFO.main.email}.`}
				{status === "error" && (
					<span>
						That didn't send. Email me at{" "}
						<a href={`mailto:${INFO.main.email}`}>{INFO.main.email}</a>{" "}
						instead.
					</span>
				)}
			</div>
		</form>
	);
};

export default ContactForm;
