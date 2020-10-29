// Navbar

const sections = document.querySelectorAll('section');
const navBar = document.querySelector('.nav-bar');
navBar.classList.remove("white")

window.addEventListener('scroll',() => {
    const currentIndex = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - 57) - 1;

    if (currentIndex === sections.lengh) return;

    const currentSection = sections[currentIndex];

    navBar.className = `nav-bar ${currentSection.dataset.background}`;

    
})