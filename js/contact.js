const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
	e.preventDefault();
	// Faking submit success
	const messageElContainer = document.createElement('div');
	messageElContainer.className = 'text-center';
	const messageEl = document.createElement('span');
	messageEl.className = 'text-center green';
	messageEl.textContent = 'Your message has been sent!';
	messageElContainer.appendChild(messageEl);
	contactForm.appendChild(messageElContainer);
	contactForm.reset();
});
