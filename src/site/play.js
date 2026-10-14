// Playful cards: pick one up, drag it around, let go and it keeps moving a
// little. "Reset the world" (or 30 idle seconds) springs everything back.
//
// Uses the independent CSS properties translate / rotate / scale, so it never
// fights with the hover transforms on the same elements.

const SELECTOR =
	".step, .service, .work__row, .proof__item, .product-card, .cast-card, .game-card, .game-feature, .principles li, .testi, .contact__card, .avatar, .repo";
const IGNORE = "a, button, input, textarea, select, label";
const IDLE_MS = 30000;

const reduced = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const items = new Map(); // element -> motion state
const active = new Set(); // elements currently animating
const moved = new Set(); // elements away from their home spot
const listeners = new Set();
const resetListeners = new Set();

let drag = null;
let raf = null;
let lastFrame = 0;
let zTop = 12;
let justDragged = false;
let idleTimer = null;

const emit = () => listeners.forEach((fn) => fn());

const stateOf = (el) => {
	if (!items.has(el)) {
		items.set(el, {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			rot: 0,
			rv: 0,
			sc: 1,
			delay: 0,
			mode: "rest",
		});
	}
	return items.get(el);
};

const apply = (el, st) => {
	el.style.translate = `${st.x.toFixed(1)}px ${st.y.toFixed(1)}px`;
	el.style.rotate = `${st.rot.toFixed(2)}deg`;
	el.style.scale = st.sc.toFixed(3);
};

const clearStyles = (el) => {
	el.style.translate = "";
	el.style.rotate = "";
	el.style.scale = "";
	el.style.zIndex = "";
	el.classList.remove("is-lifted");
};

// Keep a card inside the page so it never causes sideways scrolling.
const keepInside = (el, st, docHeight) => {
	const r = el.getBoundingClientRect();
	const vw = document.documentElement.clientWidth;
	const top = r.top + window.scrollY;
	const bottom = r.bottom + window.scrollY;
	let hitX = false;
	let hitY = false;
	if (r.left < 0) {
		st.x -= r.left;
		hitX = true;
	} else if (r.right > vw) {
		st.x -= r.right - vw;
		hitX = true;
	}
	if (top < 0) {
		st.y -= top;
		hitY = true;
	} else if (bottom > docHeight) {
		st.y -= bottom - docHeight;
		hitY = true;
	}
	return { hitX, hitY };
};

const rotSpring = (st, target) => {
	st.rv += (target - st.rot) * 0.16;
	st.rv *= 0.74;
	st.rot += st.rv;
};

const tick = (now) => {
	const dt = Math.min(48, now - lastFrame || 16);
	lastFrame = now;
	const docHeight = document.documentElement.scrollHeight;

	if (drag && drag.started) {
		const edge = 90;
		if (drag.cy < edge) window.scrollBy(0, -14);
		else if (drag.cy > window.innerHeight - edge) window.scrollBy(0, 14);
	}

	active.forEach((el) => {
		const st = items.get(el);
		if (!st) {
			active.delete(el);
			return;
		}

		if (st.mode === "drag") {
			rotSpring(st, Math.max(-14, Math.min(14, st.vx * 0.9)));
			st.sc += (1.045 - st.sc) * 0.25;
			apply(el, st);
		} else if (st.mode === "fly") {
			st.x += st.vx;
			st.y += st.vy;
			st.vx *= 0.94;
			st.vy *= 0.94;
			const hit = keepInside(el, st, docHeight);
			if (hit.hitX) st.vx *= -0.45;
			if (hit.hitY) st.vy *= -0.45;
			rotSpring(st, Math.max(-10, Math.min(10, st.vx * 0.6)));
			st.sc += (1 - st.sc) * 0.2;
			apply(el, st);
			if (
				Math.abs(st.vx) + Math.abs(st.vy) < 0.3 &&
				Math.abs(st.rot) < 0.25 &&
				Math.abs(st.rv) < 0.25
			) {
				st.vx = 0;
				st.vy = 0;
				st.rot = 0;
				st.rv = 0;
				st.sc = 1;
				st.mode = "rest";
				el.classList.remove("is-lifted");
				apply(el, st);
				active.delete(el);
			}
		} else if (st.mode === "return") {
			st.delay -= dt;
			if (st.delay > 0) return;
			st.vx += (0 - st.x) * 0.085;
			st.vy += (0 - st.y) * 0.085;
			st.vx *= 0.78;
			st.vy *= 0.78;
			st.x += st.vx;
			st.y += st.vy;
			rotSpring(st, 0);
			st.sc += (1.03 - st.sc) * 0.2;
			apply(el, st);
			if (
				Math.abs(st.x) < 0.5 &&
				Math.abs(st.y) < 0.5 &&
				Math.abs(st.vx) < 0.4 &&
				Math.abs(st.vy) < 0.4 &&
				Math.abs(st.rot) < 0.3
			) {
				Object.assign(st, { x: 0, y: 0, vx: 0, vy: 0, rot: 0, rv: 0, sc: 1 });
				st.mode = "rest";
				clearStyles(el);
				active.delete(el);
				moved.delete(el);
				emit();
			}
		} else {
			active.delete(el);
		}
	});

	raf = active.size ? requestAnimationFrame(tick) : null;
};

const wake = () => {
	if (!raf) {
		lastFrame = performance.now();
		raf = requestAnimationFrame(tick);
	}
};

const armIdle = () => {
	clearTimeout(idleTimer);
	if (moved.size > 0) {
		idleTimer = setTimeout(() => reset(true), IDLE_MS);
	}
};

export const reset = (auto = false) => {
	if (drag) endDrag(false);
	const list = [...moved];
	if (!list.length) return;
	if (reduced()) {
		list.forEach((el) => {
			const st = items.get(el);
			if (st) Object.assign(st, { x: 0, y: 0, vx: 0, vy: 0, rot: 0, rv: 0, sc: 1, mode: "rest" });
			clearStyles(el);
			active.delete(el);
		});
		moved.clear();
		emit();
	} else {
		list.forEach((el, i) => {
			const st = stateOf(el);
			st.mode = "return";
			st.delay = i * 45;
			st.vx = 0;
			st.vy = 0;
			st.rv = Math.random() * 18 - 9;
			el.classList.add("is-lifted");
			active.add(el);
		});
		wake();
	}
	clearTimeout(idleTimer);
	resetListeners.forEach((fn) => fn(auto));
};

const beginDrag = () => {
	if (!drag || drag.started) return;
	drag.started = true;
	const { el, st } = drag;
	st.mode = "drag";
	st.vx = 0;
	st.vy = 0;
	zTop = Math.min(zTop + 1, 34);
	el.style.zIndex = String(zTop);
	el.classList.add("is-lifted");
	document.body.classList.add("is-dragging");
	if (window.getSelection) window.getSelection().removeAllRanges();
	if (drag.touch && navigator.vibrate) navigator.vibrate(12);
	if (!moved.has(el)) {
		moved.add(el);
		emit();
	}
	active.add(el);
	wake();
};

function endDrag(allowFling) {
	if (!drag) return;
	const d = drag;
	drag = null;
	clearTimeout(d.timer);
	window.removeEventListener("pointermove", onMove);
	window.removeEventListener("pointerup", onUp);
	window.removeEventListener("pointercancel", onCancel);
	document.body.classList.remove("is-dragging");
	if (!d.started) return;

	justDragged = true;
	setTimeout(() => {
		justDragged = false;
	}, 60);

	const st = d.st;
	const stale = performance.now() - d.lastT > 90;
	if (!allowFling || stale || reduced()) {
		st.vx = 0;
		st.vy = 0;
	}
	if (reduced()) {
		st.rot = 0;
		st.rv = 0;
		st.sc = 1;
	}
	st.mode = "fly";
	active.add(d.el);
	wake();
	armIdle();
}

function onMove(e) {
	if (!drag || e.pointerId !== drag.id) return;
	const dx = e.pageX - drag.startX;
	const dy = e.pageY - drag.startY;

	if (!drag.started) {
		const dist = Math.hypot(dx, dy);
		if (drag.touch) {
			if (dist > 10) {
				endDrag(false);
			}
			return;
		}
		if (dist > 5) beginDrag();
		else return;
	}

	const { st, el } = drag;
	const now = performance.now();
	const dt = Math.max(8, now - drag.lastT);
	const nx = drag.baseX + dx;
	const ny = drag.baseY + dy;
	st.vx = st.vx * 0.5 + ((nx - st.x) / dt) * 16 * 0.5;
	st.vy = st.vy * 0.5 + ((ny - st.y) / dt) * 16 * 0.5;
	st.x = nx;
	st.y = ny;
	drag.lastT = now;
	drag.cx = e.clientX;
	drag.cy = e.clientY;
	apply(el, st);
	keepInside(el, st, drag.docHeight);
	apply(el, st);
	armIdle();
}

function onUp(e) {
	if (drag && e.pointerId === drag.id) endDrag(true);
}

function onCancel(e) {
	if (drag && e.pointerId === drag.id) endDrag(false);
}

const onDown = (e) => {
	if (e.button > 0 || drag) return;
	const el = e.target.closest && e.target.closest(SELECTOR);
	if (!el) return;
	const inner = e.target.closest(IGNORE);
	if (inner && inner !== el && el.contains(inner)) return;

	const st = stateOf(el);
	if (st.mode === "return") return;
	drag = {
		el,
		st,
		id: e.pointerId,
		startX: e.pageX,
		startY: e.pageY,
		baseX: st.x,
		baseY: st.y,
		started: false,
		touch: e.pointerType === "touch" || e.pointerType === "pen",
		lastT: performance.now(),
		cx: e.clientX,
		cy: e.clientY,
		docHeight: document.documentElement.scrollHeight,
		timer: null,
	};
	if (drag.touch) {
		drag.timer = setTimeout(beginDrag, 350);
	}
	window.addEventListener("pointermove", onMove);
	window.addEventListener("pointerup", onUp);
	window.addEventListener("pointercancel", onCancel);
	armIdle();
};

const onTouchMove = (e) => {
	if (drag && drag.started) e.preventDefault();
};

const onClickCapture = (e) => {
	if (justDragged) {
		e.stopPropagation();
		e.preventDefault();
	}
};

const onContextMenu = (e) => {
	if (drag && (drag.started || drag.touch)) e.preventDefault();
};

const onDragStart = (e) => {
	if (e.target.closest && e.target.closest(SELECTOR)) e.preventDefault();
};

export const install = () => {
	document.addEventListener("pointerdown", onDown, { passive: true });
	window.addEventListener("touchmove", onTouchMove, { passive: false });
	document.addEventListener("click", onClickCapture, true);
	document.addEventListener("contextmenu", onContextMenu);
	document.addEventListener("dragstart", onDragStart);
	return () => {
		document.removeEventListener("pointerdown", onDown);
		window.removeEventListener("touchmove", onTouchMove);
		document.removeEventListener("click", onClickCapture, true);
		document.removeEventListener("contextmenu", onContextMenu);
		document.removeEventListener("dragstart", onDragStart);
		endDrag(false);
		clearTimeout(idleTimer);
		if (raf) cancelAnimationFrame(raf);
		raf = null;
		items.forEach((st, el) => clearStyles(el));
		items.clear();
		active.clear();
		moved.clear();
		emit();
	};
};

export const subscribe = (fn) => {
	listeners.add(fn);
	return () => listeners.delete(fn);
};

export const getCount = () => moved.size;

export const onReset = (fn) => {
	resetListeners.add(fn);
	return () => resetListeners.delete(fn);
};
