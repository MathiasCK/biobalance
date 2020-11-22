const CONTAINER_ID = 'popperContainer';
function createElement(type = 'div', props = {}) {
	const elm = document.createElement(type);
	Object.entries(props).forEach(([key, val]) => (elm[key] = val));
	return elm;
}

function getContainer() {
	const popperContainer =
		document.getElementById(CONTAINER_ID) ||
		createElement('div', {
			id: CONTAINER_ID,
		});
	return popperContainer;
}

function popperElementFactory({ x, y }, content) {
	const cssText = /*css*/ `
    background-color: red;
    width: 300px;
    height: 300px;
`;
	const elm = createElement('div', { style: { cssText } });
	elm.innerHTML = content;
	return elm;
}

function createPopper(target, content) {
	const container = getContainer();
	console.log(
		'🚀 ~ file: popup.js ~ line 29 ~ createPopper ~ content',
		content
	);

	console.log(
		'🚀 ~ file: popup.js ~ line 30 ~ createPopper ~ container',
		container
	);
	console.log(
		'🚀 ~ file: popup.js ~ line 29 ~ createPopper ~ target',
		target
	);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
	const popperElms = document.querySelectorAll('.popper');
	popperElms.forEach((node) => {
		// Hover
		if (node.classList.contains('popper:hover'))
			node.addEventListener('mouseover', (e) => {
				console.log('Hovering', e.target);
			});

		// Click
		if (node.classList.contains('popper:click'))
			node.addEventListener('mouseover', (e) => {
				console.log('Clicking on', e.target);
			});
	});
});
