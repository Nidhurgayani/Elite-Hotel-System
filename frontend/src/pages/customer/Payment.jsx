import { useEffect, useState } from "react";
import { useCustomerStore } from "../../store/customerStore";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

export default function Payment() {
  const { paymentDetails, completePayment } = useCustomerStore();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  // Defensive check
  if (!paymentDetails) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-700">No payment info found.</p>
        <button
          onClick={() => navigate("/customer")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { title, type, total } = paymentDetails;

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/payments/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total * 100, currency: "usd" }),
        });

        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast.error("Failed to initialize payment");
        }
      } catch (err) {
        toast.error("Error creating payment intent");
      }
    };

    createPaymentIntent();
  }, [total]);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/customer/history",
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      completePayment();
      toast.success("Payment successful!");
      navigate("/customer/history");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">✓ Pay Invoice</h2>
        <p className="text-lg font-semibold mb-2">
          {type}: {title}
        </p>
        <p className="text-gray-700 mb-4">Payment Amount: ${total}</p>

        {clientSecret ? (
          <form onSubmit={handlePay}>
            <PaymentElement />
            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full bg-green-600 text-white py-2 mt-4 rounded flex items-center justify-center gap-2"
            >
              🔒 {loading ? "Processing..." : `Pay $${total}`}
            </button>
          </form>
        ) : (
          <p>Loading payment form...</p>
        )}
      </div>
    </div>
  );
}
