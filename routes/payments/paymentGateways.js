const express = require("express");
const router = express.Router();
const stripe = require('stripe')('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');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey";

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
    let token = req.headers["authorizatrion"];
    const phone = await jwt.decode(token).mobile;
    const customer_ID = await jwt.decode(token).id;

    const customer = await stripe.customers.create({ phone });

    const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2023-08-16' })

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
            price: "price_1O6xaXSAPHgQMI2ypDWYi9Uo",
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
    });



    res.json({
        paymentIntent: subscription.latest_invoice.payment_intent.client_secret,
        amount: 3999,
        customerId: customer.id,
        ephemeralKey: ephemeralKey.secret
    });
});

module.exports = router;
