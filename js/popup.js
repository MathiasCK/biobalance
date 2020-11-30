// Utilities
const getRect = (elm) => elm.getBoundingClientRect();
const getTotalHeight = (t, margin = 0) => margin + getRect(t).height;
const getTopPlacement = (target, popperElm) => {
	const cords = getRelativeCords(target);
	return -getTotalHeight(popperElm) + cords.top;
};

const getBottomPlacement = (target) =>
	getRelativeCords(target).top + getRect(target).height;
const getLeftPlacement = (target, popperElm) => {
	const targetRect = getRect(target);
	const popperRect = getRect(popperElm);
	return targetRect.left - popperRect.width;
};

const getNormalPlacement = (target) => getRect(target).left;
const getRightPlacement = (target) =>
	getRect(target).left + getRect(target).width;

function getRelativeCords(elem) {
	const box = elem.getBoundingClientRect();

	const body = document.body;
	const docEl = document.documentElement;

	const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	const scrollLeft =
		window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	const clientTop = docEl.clientTop || body.clientTop || 0;
	const clientLeft = docEl.clientLeft || body.clientLeft || 0;

	const top = box.top + scrollTop - clientTop;
	const left = box.left + scrollLeft - clientLeft;

	return { top: Math.round(top), left: Math.round(left) };
}

/**
 * Creators
 */
const CONTAINER_ID = 'popperContainer';
function getContainer() {
	// Avoid creating multiple containers if one exists.
	const prevContainer = document.querySelector(`#${CONTAINER_ID}`);
	if (prevContainer) return prevContainer;
	const elm = createElement('div', { id: CONTAINER_ID });
	document.body.appendChild(elm);
	return elm;
}

const checkPlacement = (target, popperTarget, rootMargin = 0) => {
	// Get total height of popup
	const targetRect = target.getBoundingClientRect();
	const popperRect = getRect(popperTarget);
	const popperHeight = getTotalHeight(popperTarget, rootMargin);
	const popperWidth = popperRect.width;
	const windowWidth = window.innerWidth;
	const windowHeigth = window.innerHeight;
	return {
		top: targetRect.top > popperHeight,
		bottom: targetRect.bottom + popperHeight < windowHeigth,
		left: targetRect.left > popperWidth,
		center: true,
		right: targetRect.left + targetRect.width + popperWidth < windowWidth,
	};
};

// Creating a new popper element
let popperCount = 0;
function createPopper(target, content, options = {}) {
	let isVisible = false;
	const { placement = '', marginY = 10, marginX = 0 } = options;
	// Get container instance to avoid appending.
	const container = getContainer();
	const cssText = /*css*/ `
		position: absolute;
		top: 0px;
		left: 0px;
		visibility: hidden;
		opacity: 0;
		transition: all 0.3s ease;
		transition-property: opacity, visibility;
		z-index: 9999;
`;
	const popperElm = createElement('div', {
		id: `popper_${popperCount}`,
		class: 'popper-popup',
		'aria-hidden': true,
	});

	if (typeof content === 'string') popperElm.innerHTML = content;
	else {
		const node = content.cloneNode(true);
		node.id = `popper_content_${node.id || popperCount}`;
		popperElm.appendChild(node);
	}

	popperElm.style.cssText = cssText;
	container.appendChild(popperElm);
	popperCount++;

	// Define show and hide methods
	const setPopperPlacement = () => {
		// Set default props
		popperElm.style.top = `${target.offsetTop}px`;
		popperElm.style.left = `${target.offsetLeft}px`;
		let top = getTopPlacement(target, popperElm) - marginY + 'px';
		let left = getNormalPlacement(target) + marginX + 'px';
		const hasTop = placement.includes('top');
		const hasLeft = placement.includes('left');
		const hasBottom = placement.includes('bottom');
		const hasRight = placement.includes('right');

		// Check possible placement
		const placements = checkPlacement(target, popperElm, 0);

		// Set predefined placements where possible
		if (hasTop && !hasBottom && placements.top) {
			top = getTopPlacement(target, popperElm) - marginY + 'px';
		}

		if (hasLeft && !hasRight && placements.left) {
			left = getLeftPlacement(target, popperElm) + marginX + 'px';
		}
		if (hasBottom && !hasTop && placements.bottom) {
			top = getBottomPlacement(target) + marginY + 'px';
		}
		if (hasRight && !hasLeft && placements.right) {
			left = getRightPlacement(target, popperElm) + marginX + 'px';
		}

		// Overwrite with possible positions
		if (!placements.top && placements.bottom) {
			top = getBottomPlacement(target) + marginY + 'px';
		}
		if (!placements.left && !placements.right) {
			left = 0 + 'px';
		}
		popperElm.style.top = top;
		popperElm.style.left = left;
	};
	const positionHandler = (e) => {
		setPopperPlacement();
	};
	const show = () => {
		popperElm.style.visibility = 'visible';
		// popperElm.style.display = 'block';
		popperElm.style.opacity = 1;
		setPopperPlacement();

		window.addEventListener('scroll', positionHandler);
		window.addEventListener('resize', positionHandler);
		setTimeout(() => {
			isVisible = true;
		}, 1);

		// popperElm.ontransitionend = () => {
		// 	isVisible = true;
		// };
	};
	const hide = () => {
		popperElm.style.visibility = 'hidden';
		// popperElm.style.display = 'none';
		popperElm.style.opacity = 0;
		window.removeEventListener('scroll', positionHandler);
		window.removeEventListener('resize', positionHandler);
		setTimeout(() => {
			isVisible = false;
		}, 1);
	};
	// Set initial positions;
	setPopperPlacement();
	return {
		target: popperElm,
		hide,
		show,
		get visible() {
			return isVisible;
		},
	};
}

// Init popper
function Popper(elms = '.popper') {
	const popperElms =
		typeof elms === 'string' && isSelectorValid(elms)
			? document.querySelectorAll(elms)
			: elms;
	const poppers = [...popperElms].map((node) => {
		// Check data attribute for content
		const nodeContent =
			node.getAttribute('data-content') ||
			'Use data-content="[SELECTOR] or [string]"';
		// Create a popper element with the appropriate content.
		const popper = createPopper(
			node,
			isSelectorValid(nodeContent)
				? document.querySelector(nodeContent) || nodeContent
				: nodeContent,
			{
				placement: node.getAttribute('data-placement') || '',
			}
		);

		// Hover
		if (node.classList.contains('popper:hover')) {
			node.addEventListener('mouseover', (e) => {
				popper.show();
			});
			node.addEventListener('mouseout', (e) => {
				popper.hide();
			});
		}

		// Click
		if (node.classList.contains('popper:click')) {
			node.addEventListener('click', (e) => {
				popper.show();
			});
			document.addEventListener('click', (e) => {
				if (!popper.target.contains(e.target) && popper.visible) {
					popper.hide();
				}
			});
		}
		return popper;
	});
	return poppers;
}

window.Popper = Popper;

// Utility
function createElement(type = 'div', props = {}) {
	const elm = document.createElement(type);
	Object.entries(props).forEach(([key, val]) => {
		if (key === 'style') return;
		elm.setAttribute(key, val);
	});
	return elm;
}
function isDOM(elm) {
	return elm instanceof Element;
}

function isSelectorValid(selector) {
	try {
		document.createDocumentFragment().querySelector(selector);
	} catch (error) {
		return false;
	}
	return true;
}
