// ✅ File: backend/controllers/paymentController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const sendEmail = require("../utils/sendEmail");

// @desc    Process Stripe payment and optionally send confirmation email
// @route   POST /api/pay
// @access  Public
exports.processPayment = async (req, res) => {
  const { paymentMethodId, amount, email } = req.body;

  // Basic validation
  if (!paymentMethodId || !amount) {
    return res.status(400).json({
      success: false,
      error: "Missing payment method or amount.",
    });
  }

  try {
    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert dollars to cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Send confirmation email (non-blocking)
    if (email) {
      sendEmail({
        to: email,
        subject: "Booking Confirmation - Elite Hotel",
        html: `
          <h2>Thank you for your booking!</h2>
          <p>Your payment of <strong>$${amount}</strong> was successful.</p>
          <p>We look forward to hosting you!</p>
        `,
      }).catch((emailErr) => {
        console.warn("Email sending failed:", emailErr.message);
      });
    }

    res.status(200).json({
      success: true,
      paymentIntent,
    });
  } catch (error) {
    console.error("Stripe payment error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};