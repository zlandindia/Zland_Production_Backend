const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51NnZdkSAPHgQMI2y5z6ZqGHY0VbFWntZzdwOf7wDaxinGqgnEgtOZq9PY7uge8oXBvmDuiDUwbdegUHgRZy0zk6D00Xd0dumHX');
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

    // Getting customer name
    // await User.find({ _id: customer_ID }).then((error, result) => {
    //     res.send(result);
    // });
    // End Getting customer name
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create({ phone });

    const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2023-08-16' })

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
            price: "price_1NxXhZSAPHgQMI2yv0dl9DNX",
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
    });



    res.json({
        paymentIntent: subscription.latest_invoice.payment_intent.client_secret,
        amount: 499,
        customerId: customer.id,
        ephemeralKey: ephemeralKey.secret
    });
});

module.exports = router;
