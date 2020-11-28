function observe(
	selector = '.observable',
	cssPrefix = 'animated',
	{ once = false, rootMargin = '0px', threshhold = 0.5, root = null } = {}
) {
	const intersectedElems = [];
	const options = {
		rootMargin,
		threshhold,
		root,
	};
	const intersectionObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				const animationIn = entry.target.getAttribute(
					'data-observer-in'
				);
				const animationOut = entry.target.getAttribute(
					'data-observer-out'
				);
				if (entry.intersectionRatio > 0) {
					entry.target.classList.remove(cssPrefix, animationOut);
					entry.target.classList.add(cssPrefix, animationIn);
					intersectedElems.push(entry.target);
				} else if (entry.intersectionRatio !== 1) {
					entry.target.classList.remove(cssPrefix, animationIn);
					entry.target.classList.add(cssPrefix, animationOut);
				}

				if (once && intersectedElems.includes(entry.target)) {
					observer.unobserve(entry.target);
				}
			});
		},
		options
	);

	const elements = [...document.querySelectorAll(selector)];

	elements.forEach((element) => intersectionObserver.observe(element));
}

window.observe = observe;
