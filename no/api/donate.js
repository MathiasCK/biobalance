import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET);
export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const currency = req.body.currency || 'USD';
			const amount =
				(Number(req.body.amount) * 100) / currency === 'NOK' ? 8.86 : 1;
			const token = req.body.stripeToken;
			if (!token || amount) throw new Error('Bad request');

			const charge = await stripe.charges.create({
				amount,
				currency: 'USD',
				description: 'Donation',
				source: token,
			});

			if (charge.status === 'succeeded') {
				return res.status(200).send('Donation received! Thank you');
			}
		} catch (error) {
			res.status(400).send(error.message);
		}
	}
	return res.status(400).send('Bad Request');
};
