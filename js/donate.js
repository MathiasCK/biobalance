const stripe = Stripe('pk_test_KPhR9OlBPdYaEOv9bZ1j4AZy00hdygCni7');

const elements = stripe.elements();

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

const card = elements.create('card', { style: style });
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.on('change', function (event) {
	const displayError = document.getElementById('card-errors');
	if (event.error) {
		displayError.textContent = event.error.message;
	} else {
		displayError.textContent = '';
	}
});

// Handle form submission.
const form = document.getElementById('payment-form');
form.addEventListener('submit', function (event) {
	event.preventDefault();

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
