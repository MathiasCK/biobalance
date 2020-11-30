const PRODUCT_NAME = 'BioBalance™';
// Variables
const sections = document.querySelectorAll('section');
const navBar = document.querySelector('.nav-bar');
const navItems = document.querySelectorAll('.nav-item');
const sideNavItems = document.querySelectorAll('.side-nav-item');

// addEventListener when scrolling
window.addEventListener('scroll', () => {
	// Change navbar color
	const currentIndex =
		sections.length -
		[...sections]
			.reverse()
			.findIndex((section) => window.scrollY >= section.offsetTop - 57) -
		1;
	if (currentIndex === sections.lengh) return;

	const currentSection = sections[currentIndex];
	navBar.className = `nav-bar ${currentSection.dataset.background}`;
});

navBar.classList.remove('white');
navBar.classList.add('transparent');

// Animations for intro section
// Check if user is in current session, show animation if user has animated to the page for the first time
const isMounted = sessionStorage.getItem('isMounted');
if (!isMounted) showStartAnimation();

// Set session mounted status
sessionStorage.setItem('isMounted', JSON.parse(true));

function showStartAnimation() {
	const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
	const introContainer = document.querySelector('.intro-container');
	const introHTML = /*html*/ `
	<div class="intro">
		<div class="intro-text">
			<h1 class="hide">
				<span class="fade-text">Saving the rainforest</span>
			</h1>
			<h1 class="hide">
				<span class="fade-text">Has never been <span>easier</span>.</span>
			</h1>
		</div>
	</div>
	`;

	introContainer.innerHTML = introHTML;

	tl.set('.content', { css: { opacity: 0 } });
	tl.set('.nav-bar', { css: { opacity: 0 } });

	tl.to('.fade-text', { y: '0%', duration: 1, stagger: 0.33 });
	tl.to('.intro', { y: '-100%', duration: 1, delay: 1 }, '-=1');
	tl.to(['.content', '.nav-bar'], { opacity: 1, duration: 1 }, '-=0.5');
}
