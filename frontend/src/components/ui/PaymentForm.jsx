import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: clientSecret } = await axios.post('/api/payments/create-payment-intent', { amount });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
    } else {
      alert('Payment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay ${amount}</button>
    </form>
  );
};

export default PaymentForm;