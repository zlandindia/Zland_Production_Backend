const express = require("express");
const router = express.Router();
const stripe = require('stripe')('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');

router.get("/razorpay", (req, res) => { //only for razorpay
    res.status(200).json({ ID: "rzp_test_kM6TGFic2ENg3f", "SECRET": "DqzrRqBYxu2b3KW7UMGRTnmL", "AMOUNT": 200 });
});

router.post('/stripeIntent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
        res.status(400).json({
            error: e.message,
        });
    }
});

router.post('/subscription', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();


    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
            price: "price_1Nmy9BSFvdMjEzm57MvKFyJv",
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
    });


    res.json({
        paymentIntent: subscription.latest_invoice.payment_intent.client_secret,
        amount: 199,
        customerId: customer.id
    });
});

module.exports = router;
