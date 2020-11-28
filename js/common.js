class Observable {
	listeners = [];
	internal = null;
	constructor(initState) {
		this.internal = initState;
	}
	set(newState) {
		if (typeof newState === 'function') {
			this.internal = newState(this.internal);
		} else {
			this.internal = newState;
		}
		this.listeners.forEach((listener) => listener(this.internal));
	}
	get state() {
		return this.state;
	}
	subscribe(fn, onMount = false) {
		this.listeners.push(fn);
		if (onMount) fn(this.internal);
		return this.listeners.filter((listener) => listener !== fn);
	}
}

// Exporting Observable class.
window.observable = Observable;

function initDrawer() {
	// const navbar = document.querySelector('.nav-bar');
	const menuTrigger = document.querySelector('.menu-trigger');
	const drawerBackdrop = document.querySelector('.drawer-backdrop');
	// Creating observable state to track drawers's open state.
	const navState = new Observable({ open: menuTrigger?.checked });

	drawerBackdrop?.addEventListener('click', () => {
		menuTrigger.click();
	});

	menuTrigger?.addEventListener('change', (e) => {
		navState.set({ open: e.target.checked });
	});

	// Subscribing to the drawers's open state and toggles scrolling the body on or off.
	navState.subscribe(({ open }) => {
		if (open) document.body.classList.add('no-scroll');
		else document.body.classList.remove('no-scroll');
	}, true);
}

function handleLoad() {
	// init drawer
	initDrawer();
}
document.addEventListener('DOMContentLoaded', handleLoad);
