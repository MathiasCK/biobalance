// Variables
const sections = document.querySelectorAll('section');
const navBar = document.querySelector('.nav-bar');
const navItems = document.querySelectorAll('.nav-item');
const sideNavItems = document.querySelectorAll('.side-nav-item');
navBar.classList.remove("white");

window.addEventListener('scroll',() => {
    // Change navbar color
    const currentIndex = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - 57) - 1;
    if (currentIndex === sections.lengh) return;

    const currentSection = sections[currentIndex];
    navBar.className = `nav-bar ${currentSection.dataset.background}`;

    // Add class active to nav links 
    navItems.forEach((navItem) => {
        navItem.classList.remove('active');
    });
    const currentItem = navItems[currentIndex];
    if (!currentItem.classList.contains('active')) currentItem.classList.add('active');


    // Change title name on scroll
    if (currentIndex === sections.length) return (document.title = `Treecubator | Saving the rainforest`);
    const title = `Treecubator | ${currentItem.innerHTML}`;
    if (document.title !== title) document.title = title;
    
})

// Responsive Navbar
const navBtn = document.querySelector('.nav-btn');
const wrapper = document.querySelector('.drawer-wrapper');
const backDrop = document.querySelector('.drawer-backdrop');

navBtn.addEventListener('click', (e) => {
    wrapper.classList.toggle('open');
    if (wrapper.classList.contains('open')) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
   
});

backDrop.addEventListener('click', (e) => {
    wrapper.classList.remove('open');
    document.body.classList.remove('no-scroll');
})

sideNavItems.forEach((sideNavItem) => {
    sideNavItem.addEventListener('click',() => {
        wrapper.classList.remove('open');
        document.body.classList.remove('no-scroll');
    })
})

navBar.classList.remove('white');
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

	// Add class active to nav links
	navItems.forEach((navItem) => {
		navItem.classList.remove('active');
	});
	const currentItem = navItems[currentIndex];
	if (!currentItem.classList.contains('active'))
		currentItem.classList.add('active');

	// Change title name on scroll
	if (currentIndex === sections.length)
		return (document.title = `Treecubator | Saving the rainforest`);
	const title = `Treecubator | ${currentItem.innerHTML}`;
	if (document.title !== title) document.title = title;
});
