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
	console.log(amount);
}, true);

/**
 * Stripe card element
 */
const stripe = Stripe('pk_test_KPhR9OlBPdYaEOv9bZ1j4AZy00hdygCni7');
const style = {
	base: {
		color: '#32325d',
		fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
		fontSmoothing: 'antialiased',
		fontSize: '16px',
		'::placeholder': {
			color: '#aab7c4',
		},
	},
	invalid: {
		color: '#fa755a',
		iconColor: '#fa755a',
	},
};
const elements = stripe.elements();
const card = elements.create('card', { style: style });
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.on('change', (e) => {
	const displayError = document.getElementById('card-errors');
	if (e.error) {
		displayError.textContent = e.error.message;
	} else {
		displayError.textContent = '';
	}
});

// Handle form submission.
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const errorElement = document.getElementById('card-errors');
	const result = await stripe.createToken(card);
	if (result.error) {
		// Inform the user if there was an error.
		errorElement.textContent = result.error.message;
		return;
	}
	try {
		// const donationRequest = await fetch(
		// 	'http://localhost:3000/api/donate',
		// 	{
		// 		method: 'POST',
		// 		body: JSON.stringify({
		// 			stripeToken: result.token.id,
		// 			currency: form.getAttribute('data-currency') || 'USD',
		// 			amount: donationAmount.state,
		// 		}),
		// 	}
		// );

		// const response = await donationRequest.json();
		// if (!donationRequest.ok) {
		// 	console.log('ERROR');
		// 	throw new Error('Failed to donate.');
		// }

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
