import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function PaymentTrigger({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const card = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (!error) {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount }),
      });

      const data = await res.json();
      if (data.success) {
        onSuccess();
      }
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold">✓ Pay Invoice</h2>

      <div className="flex gap-2">
        {["visa", "mastercard", "amex", "discover"].map((brand) => (
          <img
            key={brand}
            src={`/assets/cards/${brand}.svg`}
            alt={brand}
            className="h-6"
          />
        ))}
      </div>

      <p className="text-lg font-semibold">Payment Amount: ${amount.toFixed(2)}</p>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Card Number</label>
        <div className="border rounded px-2 py-2">
          <CardNumberElement />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">MM / YY</label>
            <div className="border rounded px-2 py-2">
              <CardExpiryElement />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">CVC</label>
            <div className="border rounded px-2 py-2">
              <CardCvcElement />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
      >
        🔒 Pay ${amount.toFixed(2)}
      </button>
    </form>
  );
}