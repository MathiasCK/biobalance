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
form.addEventListener('submit', (e) => {
	e.preventDefault();

	stripe.createToken(card).then(function (result) {
		if (result.error) {
			// Inform the user if there was an error.
			const errorElement = document.getElementById('card-errors');
			errorElement.textContent = result.error.message;
		} else {
			// Send the token to your server.
			stripeTokenHandler(result.token);
		}
	});
});

// Submit the form with the token ID.
function stripeTokenHandler(token) {
	// Insert the token ID into the form so it gets submitted to the server
	const form = document.getElementById('payment-form');
	const hiddenInput = document.createElement('input');
	hiddenInput.setAttribute('type', 'hidden');
	hiddenInput.setAttribute('name', 'stripeToken');
	hiddenInput.setAttribute('value', token.id);
	form.appendChild(hiddenInput);

	// Submit the form
	form.submit();
}
