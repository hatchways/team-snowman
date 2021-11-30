import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const SetupForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_DOMAIN + '/dashboard',
      },
    });

    if (error.message) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button variant="outlined" color="primary" type="submit" disabled={!stripe}>
        Submit
      </Button>
      {errorMessage && <Box>{errorMessage}</Box>}
    </form>
  );
};

export default SetupForm;
