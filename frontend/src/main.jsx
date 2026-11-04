// ✅ File: frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind + global styles

// ✅ Stripe setup
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ✅ Toast notifications
import { Toaster } from "react-hot-toast";

// Load Stripe public key from environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Toaster position="top-right" />
      <App />
    </Elements>
  </React.StrictMode>
);