import React, { useEffect, useRef, useState } from "react";

import { useI18n } from "../i18n";

// Cartoon portrait. The pupils follow the cursor, the eyes blink now and
// then, and clicking him makes him say something.
const Avatar = ({ talking = false, onAsk }) => {
	const { ui } = useI18n();
	const QUIPS = ui.quips;
	const ref = useRef(null);
	const [p, setP] = useState({ x: 0, y: 0 });
	const [quip, setQuip] = useState(null);
	const [blinkDelay] = useState(() => `${(Math.random() * 4).toFixed(2)}s`);
	const timer = useRef(null);
	const next = useRef(Math.floor(Math.random() * 7));

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}
		let frame = null;
		const onMove = (event) => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = null;
				if (!ref.current) return;
				const box = ref.current.getBoundingClientRect();
				const vx = event.clientX - (box.left + box.width / 2);
				const vy = event.clientY - (box.top + box.height * 0.36);
				const dist = Math.hypot(vx, vy) || 1;
				const k = Math.min(1, dist / 280);
				setP({ x: (vx / dist) * 9 * k, y: (vy / dist) * 6 * k });
			});
		};
		window.addEventListener("pointermove", onMove);
		return () => {
			window.removeEventListener("pointermove", onMove);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	useEffect(() => () => clearTimeout(timer.current), []);

	const talk = () => {
		if (onAsk) {
			onAsk();
			return;
		}
		next.current = (next.current + 1) % QUIPS.length;
		setQuip(QUIPS[next.current]);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setQuip(null), 2800);
	};

	return (
		<button
			type="button"
			className={`avatar about__photo${talking ? " is-talking" : ""}`}
			onClick={talk}
			data-react="👋,✨,🚀"
			aria-label={ui.avatarLabel}
		>
			{quip && (
				<span className="avatar__bubble" role="status">
					{quip}
				</span>
			)}
			<svg
				ref={ref}
				viewBox="45 45 900 915"
				role="img"
				aria-labelledby="avatar-title"
			>
				<title id="avatar-title">{ui.avatarTitle}</title>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6b4cff"/><stop offset=".55" stopColor="#ff5c7a"/><stop offset="1" stopColor="#ffb84d"/></linearGradient>
<clipPath id="frame"><rect x="45" y="45" width="900" height="915" rx="90"/></clipPath>
<g id="brow"><path d="M342 240 C392 204 452 212 492 232 L488 250 C450 238 396 238 350 258 Z" fill="#17111a" stroke="#17111a" strokeWidth="6" strokeLinejoin="round"/></g>
<g id="eye">
<ellipse cx="405" cy="332" rx="40" ry="18" fill="#f4ede6" stroke="#17111a" strokeWidth="6"/>

<path d="M362 328 Q405 298 448 328" fill="none" stroke="#17111a" strokeWidth="9" strokeLinecap="round"/>
</g>
<g id="lens"><rect x="318" y="252" width="176" height="132" rx="34" fill="#ffffff" fillOpacity=".14" stroke="#17111a" strokeWidth="17"/></g>
<g id="paisley"><path d="M0 0 C 30 -10 50 20 30 45 C 12 66 -22 52 -20 22 C -18 2 -4 -6 6 4 C 14 12 10 28 -2 26" fill="#ff6a4d" stroke="#17111a" strokeWidth="6" strokeLinejoin="round"/><circle cx="8" cy="30" r="9" fill="#ffd27a"/></g>
</defs>
<g clipPath="url(#frame)">
<rect x="45" y="45" width="900" height="915" fill="url(#bg)"/>
<circle cx="800" cy="240" r="150" fill="#ffd27a" opacity=".85"/>
<circle cx="170" cy="170" r="70" fill="#fff" opacity=".12"/>

<path d="M0 790 C130 730 260 700 335 628 L655 628 C735 700 860 730 990 795 L990 960 L0 960 Z" fill="#2a2152" stroke="#17111a" strokeWidth="10" strokeLinejoin="round"/>
<use href="#paisley" x="110" y="830"/><use href="#paisley" transform="translate(230 770) rotate(40)"/>
<use href="#paisley" transform="translate(790 840) rotate(-30)"/><use href="#paisley" transform="translate(880 790) rotate(25)"/>
<use href="#paisley" transform="translate(70 930) rotate(-20) scale(.8)"/><use href="#paisley" transform="translate(900 930) rotate(60) scale(.8)"/>
<use href="#paisley" transform="translate(300 900) rotate(10) scale(.7)"/><use href="#paisley" transform="translate(720 905) rotate(-15) scale(.7)"/>

<path d="M348 600 L656 600 L648 770 Q502 850 366 770 Z" fill="#9b6444" stroke="#17111a" strokeWidth="9" strokeLinejoin="round"/>
<path d="M366 770 Q502 850 648 770 L618 960 L392 960 Z" fill="#f6f0e7" stroke="#17111a" strokeWidth="9" strokeLinejoin="round"/>
<path d="M340 622 L392 960 M664 622 L618 960" stroke="#17111a" strokeWidth="10" strokeLinecap="round" fill="none"/>

<ellipse cx="302" cy="388" rx="24" ry="54" fill="#c48a63" stroke="#17111a" strokeWidth="8"/>
<ellipse cx="714" cy="392" rx="22" ry="52" fill="#c48a63" stroke="#17111a" strokeWidth="8"/>
<path d="M312 330 C306 210 380 124 508 120 C640 120 712 210 706 340 L702 470 C692 600 612 706 504 708 C392 706 314 600 308 470 Z" fill="#c48a63" stroke="#17111a" strokeWidth="10" strokeLinejoin="round"/>
<ellipse cx="510" cy="204" rx="92" ry="14" fill="#dcad88" opacity=".55"/>

<path d="M308 372 L308 470 C316 600 394 708 504 710 C612 708 696 600 704 470 L704 372 C690 424 664 448 630 456 C600 442 560 450 506 458 C452 450 412 442 382 456 C346 448 324 424 308 372 Z" fill="#1d1519" stroke="#17111a" strokeWidth="8" strokeLinejoin="round"/>
<path d="M360 600 Q430 680 504 690 M650 600 Q585 680 504 690" fill="none" stroke="#3a2c33" strokeWidth="7" strokeLinecap="round" opacity=".7"/>

<path d="M316 296 C308 170 384 66 510 62 C642 66 708 170 702 296 C692 234 662 192 622 176 C560 158 450 158 396 176 C354 192 324 238 316 296 Z" fill="#17111a" stroke="#17111a" strokeWidth="8" strokeLinejoin="round"/>

<use href="#brow"/><use href="#brow" transform="translate(1018 0) scale(-1 1)"/>

<path d="M494 352 C480 392 452 402 454 420 C476 438 546 438 570 420 C572 402 542 392 530 352 Z" fill="#d29c76" stroke="#17111a" strokeWidth="7" strokeLinejoin="round"/>
<ellipse cx="480" cy="418" rx="11" ry="7" fill="#17111a"/><ellipse cx="544" cy="418" rx="11" ry="7" fill="#17111a"/>

<path d="M420 484 C460 452 486 466 506 474 C530 466 558 452 596 484 C572 494 540 488 506 494 C474 488 446 494 420 484 Z" fill="#1d1519" stroke="#17111a" strokeWidth="6" strokeLinejoin="round"/>
<g className="avatar__mouth">
<path d="M434 508 C462 494 486 500 506 508 C530 498 556 494 584 508 C570 538 536 548 506 548 C476 548 448 538 434 508 Z" fill="#c4695e" stroke="#17111a" strokeWidth="7" strokeLinejoin="round"/>
<path d="M440 512 C480 520 532 520 578 512" fill="none" stroke="#17111a" strokeWidth="6" strokeLinecap="round"/>
</g>

<use href="#eye"/><use href="#eye" transform="translate(1018 0) scale(-1 1)"/>

<g style={{ transform: `translate(${p.x}px, ${p.y}px)` }} className="avatar__pupil">
				<g className="avatar__blink" style={{ animationDelay: blinkDelay }}>
					<circle cx="408" cy="332" r="15" fill="#1a1018" />
					<circle cx="414" cy="326" r="4" fill="#fff" />
					<circle cx="610" cy="332" r="15" fill="#1a1018" />
					<circle cx="604" cy="326" r="4" fill="#fff" />
				</g>
			</g>
			<use href="#lens"/><use href="#lens" transform="translate(1030 0) scale(-1 1)"/>
<path d="M494 284 Q511 266 538 286" fill="none" stroke="#17111a" strokeWidth="15" strokeLinecap="round"/>
<path d="M318 290 L300 280 M712 292 L730 282" stroke="#17111a" strokeWidth="14" strokeLinecap="round"/>
<path d="M340 276 L380 270 M565 270 L606 276" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".55"/>
</g>
<rect x="45" y="45" width="900" height="915" rx="90" fill="none" stroke="#17111a" strokeWidth="12"/>
			</svg>
		</button>
	);
};

export default Avatar;
