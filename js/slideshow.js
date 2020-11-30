// Control Slideshow
const controlSlides = (n) => {
	let i;
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
	setTimeout(controlSlides, 3000);
};

// StartImg
let startImg = 0;
controlSlides();

/* Next / Prev
const addSlide = (n) => {
	controlSlides((startImg += n));
};

// Thumbnail img
const currentSlide = (n) => {
	controlSlides(startImg + n);
};*/

/*const slides = document.getElementsByClassName('slides');
if (n > slides.length) {
	startImg = 1;
}
if (n < 1) {
	startImg = slides.length;
}
for (const slide of slides) {
	slide.style.visibility = 'hidden';
	slide.style.opacity = 0;
}*/
