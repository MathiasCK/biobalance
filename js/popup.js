// Closure to avoid namespace pollution
(function () {
	/**
	 * UTILS
	 */
	const getRect = (elm) => elm.getBoundingClientRect();
	const getTotalHeight = (t, margin = 0) => margin + t.offsetHeight;
	const getTopPlacement = (target, popperElm) =>
		-getTotalHeight(popperElm) + target.offsetTop;
	const getBottomPlacement = (target) =>
		target.offsetTop + target.offsetHeight;
	const getLeftPlacement = (target, popperElm) =>
		target.offsetLeft - popperElm.offsetLeft;
	const getNormalPlacement = (target) => target.offsetLeft;
	const getRightPlacement = (target) =>
		target.offsetLeft + getRect(target).width;

	/**
	 * Creators
	 */
	const CONTAINER_ID = 'popperContainer';
	function getContainer() {
		const prevContainer = document.querySelector(CONTAINER_ID);
		if (prevContainer) return prevContainer;
		const elm = createElement('div', { id: CONTAINER_ID });
		document.body.appendChild(elm);
		return elm;
	}

	const checkPlacement = (target, popperTarget, rootMargin = 0) => {
		// Get total height of popup
		const targetRect = target.getBoundingClientRect();
		const popperHeight = getTotalHeight(popperTarget) + rootMargin;
		const popperWidth = popperTarget.offsetWidth;
		const windowWidth = window.innerWidth;
		const windowHeigth = window.innerHeight;
		return {
			top: targetRect.top > popperHeight,
			bottom: targetRect.bottom + popperHeight < windowHeigth,
			left: targetRect.left > popperWidth,
			center: true,
			right:
				targetRect.left + targetRect.width + popperWidth < windowWidth,
		};
	};

	// Creating a new popper element
	let popperCount = 0;
	function createPopper(target, content, options = {}) {
		let isVisible = false;
		// Create popper element
		const { placement = '', marginY = 10, marginX = 0 } = options;
		const container = getContainer();
		const cssText = /*css*/ `
		position: absolute;
		top: ${target.offsetTop}px;
		left: ${target.offsetLeft}px;
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
		else popperElm.appendChild(content);

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
			if (hasTop && !hasBottom && placements.top)
				top = getTopPlacement(target, popperElm) - marginY + 'px';
			if (hasLeft && !hasRight && placements.left)
				left = getLeftPlacement(target, popperElm) + marginX + 'px';
			if (hasBottom && !hasTop && placements.bottom)
				top = getBottomPlacement(target) + marginY + 'px';
			if (hasRight && !hasLeft && placements.right) {
				left = getRightPlacement(target, popperElm) + marginX + 'px';
			}

			// Overwrite with possible positions
			if (!placements.top && placements.bottom) {
				top = getBottomPlacement(target) + marginY + 'px';
			}
			if (!placements.left && !placements.right) {
				left = getNormalPlacement(target, popperElm) + 'px';
			}
			popperElm.style.top = top;
			popperElm.style.left = left;
		};
		const scrollPositionHandler = (e) => {
			setPopperPlacement();
		};
		const show = () => {
			setPopperPlacement();
			popperElm.style.visibility = 'visible';
			popperElm.style.opacity = 1;

			window.addEventListener('scroll', scrollPositionHandler);
			popperElm.ontransitionend = () => {
				isVisible = true;
			};
		};
		const hide = () => {
			popperElm.style.visibility = 'hidden';
			popperElm.style.opacity = 0;
			window.removeEventListener('scroll', scrollPositionHandler);
			popperElm.ontransitionend = () => {
				isVisible = false;
			};
		};

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
	document.addEventListener('DOMContentLoaded', () => {
		const popperElms = document.querySelectorAll('.popper');
		popperElms.forEach((node) => {
			const nodeContent =
				node.getAttribute('data-content') ||
				'Use data-content="[SELECTOR] or [string]"';
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
		});
	});

	function createElement(type = 'div', props = {}) {
		const elm = document.createElement(type);
		Object.entries(props).forEach(([key, val]) => {
			if (key === 'style') return;
			elm.setAttribute(key, val);
		});
		return elm;
	}

	function isSelectorValid(selector) {
		try {
			document.createDocumentFragment().querySelector(selector);
		} catch (error) {
			return false;
		}
		return true;
	}
})();
