import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!stripe || !elements) {
      setErrorMsg("Stripe is not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onSuccess();
      } else {
        setErrorMsg("Payment failed. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Pay Invoice</h2>

      <div className="flex justify-center items-center gap-3 mb-4">
        <img src="/visa.png" alt="Visa" className="h-6" />
        <img src="/mastercard.png" alt="MasterCard" className="h-6" />
        <img src="/amex.png" alt="AmEx" className="h-6" />
        <img src="/discover.png" alt="Discover" className="h-6" />
      </div>

      <p className="mb-2 text-gray-700 text-center">
        Payment Amount: <strong>${amount}</strong>
      </p>

      <div className="border p-3 rounded mb-4">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      {errorMsg && (
        <p className="text-red-600 text-sm mb-3 text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-2 rounded text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Processing..." : `🔒 Pay $${amount}`}
      </button>
    </form>
  );
};

export default PaymentForm;