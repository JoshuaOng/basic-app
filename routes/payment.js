const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51QJnma08yS02cjemGFJ27o2K6rNlk2OcuAz17xLA3nlwB5N3d0HL7McwLrFx911KPjD5vvc5F3Hm5X7kAlSWvNcY008DFvVyPR');


// Create a PaymentIntent
router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card', 'applepay'], // Add Apple Pay support if needed
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  