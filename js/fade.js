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
		console.log(entry);
		if (isIntersecting(entry)) {
			entry.target.classList.replace('fadeOut', 'fadeIn');
		} else {
			if (
				entry.target.classList.contains('fadeIn') &&
				entry.intersectionRatio !== 1
			) {
				entry.target.classList.replace('fadeIn', 'fadeOut');
				if (!scrollingUp) {
					entry.target.classList.add('up');
				}
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const fadeElms = document.querySelectorAll('.fade');
	fadeElms.forEach((elm) => elm.classList.add('fadeOut'));
	const observer = new IntersectionObserver(
		observerCallback,
		observerOptions
	);
	fadeElms.forEach((el) => observer.observe(el));
});
