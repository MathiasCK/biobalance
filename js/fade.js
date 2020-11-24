// This concept is ispired by make-it-responsive
let scrollingUp;
let oldScroll = 0;

window.addEventListener('scroll', () => {
	const newScroll = oldScroll > window.scrollY;
	if (scrollingUp !== newScroll) {
		scrollingUp = newScroll;
	}
	oldScroll = window.scrollY;
});

const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.2,
};

const isIntersecting = (entry) => {
	return entry.isIntersecting;
};

function observerCallback(entries) {
	entries.forEach((entry) => {
		entry.target.classList.remove('up');
		if (isIntersecting(entry)) {
			entry.target.classList.replace('fade-out', 'fade-in');
		} else {
			if (
				entry.target.classList.contains('fade-in') &&
				entry.intersectionRatio !== 1
			) {
				entry.target.classList.replace('fade-in', 'fade-out');
				if (!scrollingUp) {
					entry.target.classList.add('up');
				}
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const fadeElms = document.querySelectorAll('.fade');
	fadeElms.forEach((elm) => {
		elm.style.opacity = 0;
		elm.classList.add('fade-transition');
		elm.classList.add('fade-out');
	});

	const observer = new IntersectionObserver(
		observerCallback,
		observerOptions
	);

	// const run = async () => {
	// 	await Promise.all(
	// 		[...fadeElms].map(
	// 			(elm) =>
	// 				new Promise((res) => {
	// 					elm.ontransitionend = () => {
	// 						res();
	// 					};
	// 				})
	// 		)
	// 	);

	// 	fadeElms.forEach((el) => observer.observe(el));
	// };
	// run();
	fadeElms.forEach((el) => observer.observe(el));
});
