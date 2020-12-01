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
