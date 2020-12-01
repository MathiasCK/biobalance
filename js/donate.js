const amountInput = document.getElementById('donationAmount');
const amountHidden = document.getElementById('amount');
const donationButtons = document.querySelectorAll(
	'[data-js="donation-button"]'
);

const donationAmount = new Observable(5);

// Listen to events
donationButtons.forEach((button) =>
	button.addEventListener('click', () => {
		donationAmount.set(Number(button.getAttribute('data-amount')));
	})
);
amountInput.addEventListener('input', (e) => {
	const amount = Number(e.target.value);
	if (!isNaN(amount)) donationAmount.set(amount);
});

// Listen to amount changes
donationAmount.subscribe((amount) => {
	donationButtons.forEach((button) => {
		const btnAmount = Number(button.getAttribute('data-amount'));
		if (btnAmount === amount) button.classList.add('active');
		else button.classList.remove('active');
	});
	amountHidden.value = String(amount);
}, true);

// Handle form submission.
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const errorElement = document.getElementById('card-errors');
	try {
		// Future processing goes here
		const submitBtn = form.querySelector('button[type="submit"]');
		submitBtn.textContent = 'Donation Success!';
		submitBtn.classList.add('green');
		alert('Due to this being a school project you have not been charged');
		setTimeout(() => {
			submitBtn.textContent = 'Submit donation';
			submitBtn.classList.remove('green');
		}, 3000);
	} catch (error) {
		errorElement.textContent = error.message || 'Donation failed';
	} finally {
		form.reset();
		card.clear();
	}
});
