// Control Slideshow
const controlSlides = (n) => {
	const slides = document.getElementsByClassName('slides');
	for (const slide of slides) {
		slide.style.visibility = 'hidden';
		slide.style.opacity = 0;
	}
	startImg++;
	if (startImg > slides.length) {
		startImg = 1;
	}

	const currentSlide = slides[startImg - 1];
	currentSlide.style.visibility = 'visible';
	currentSlide.style.opacity = 1;
	setTimeout(controlSlides, 2000);
};

// StartImg
let startImg = 0;
controlSlides();
