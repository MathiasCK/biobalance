class Observer {
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
	subscribe(fn) {
		this.listeners.push(fn);
		return this.listeners.filter((listener) => listener !== fn);
	}
}

function Drawer() {
	// const navbar = document.querySelector('.nav-bar');
	const menuTrigger = document.querySelector('.menuTrigger');
	const drawerBackdrop = document.querySelector('.drawer-backdrop');
	const navState = new Observer({ open: menuTrigger.checked });

	drawerBackdrop.addEventListener('click', () => {
		menuTrigger.click();
	});

	menuTrigger.addEventListener('change', (e) => {
		navState.set({ open: e.target.checked });
	});

	navState.subscribe(({ open }) => {
		console.log(
			'🚀 ~ file: common.js ~ line 39 ~ navState.subscribe ~ open',
			open
		);
		if (open) document.body.classList.add('no-scroll');
		else document.body.classList.remove('no-scroll');
	});
}

function handleLoad() {
	// init drawer
	Drawer();
}
document.addEventListener('DOMContentLoaded', handleLoad);
