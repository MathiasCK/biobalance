const CONTAINER_ID = 'popperContainer';
function createElement(type = 'div', props = {}) {
	const elm = document.createElement(type);
	Object.entries(props).forEach(([key, val]) => {
		if (key === 'style') return;
		elm[key] = val;
	});
	return elm;
}

function getContainer() {
	const prevContainer = document.querySelector(CONTAINER_ID);
	if (prevContainer) return prevContainer;
	const elm = createElement('div', { id: CONTAINER_ID });
	document.body.appendChild(elm);
	return elm;
}

let popperCount = 0;
function popperFactory(target, content, options = {}) {
	const { placement } = options;
	const container = getContainer();
	const cssText = /*css*/ `
	background-color: var(--light);
	box-shadow: var(--shadow-dark);
	border-radius: 16px;
	padding: 16px;
    width: 300px;
	height: 300px;
	position: absolute;
	top: ${target.offsetTop + 30}px;
	left: ${target.offsetLeft}px;
	visibility: hidden;
`;
	const elm = createElement('div', {
		id: `popper_${popperCount}`,
	});
	elm.innerHTML = content;
	elm.style.cssText = cssText;
	container.appendChild(elm);
	popperCount++;
	const show = () => {
		elm.style.visibility = 'visible';
		if (placement === 'top') {
			const p = `${
				-30 - elm.getBoundingClientRect().height + target.offsetTop
			}px`;
			console.log('🚀 ~ file: popup.js ~ line 46 ~ show ~ placement', p);

			elm.style.top = p;
		}
	};
	const hide = () => {
		elm.style.visibility = 'hidden';
	};
	return { target: elm, show, hide };
}

// Init
document.addEventListener('DOMContentLoaded', () => {
	const popperElms = document.querySelectorAll('.popper');
	popperElms.forEach((node) => {
		const popper = popperFactory(node, 'Hello world', {
			placement: 'top',
		});

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
		if (node.classList.contains('popper:click'))
			node.addEventListener('mouseover', (e) => {
				console.log('Clicking on', e.target);
			});
	});
});
