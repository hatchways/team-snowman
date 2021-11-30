import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AddCardInfoForm from './AddCardInfoForm/AddCardInfoForm';

const AddCardInfo = (props: any): JSX.Element => {
  const options = {
    clientSecret: props.location.state.clientSecret,
  };

  if (process.env.REACT_APP_SECRET_KEY === undefined) {
    return <Typography>No secret key</Typography>;
  } else {
    const stripePromise = loadStripe(process.env.REACT_APP_SECRET_KEY);
    return (
      <Box margin="150px 30px 100px 30px">
        <Elements stripe={stripePromise} options={options}>
          <AddCardInfoForm />
        </Elements>
      </Box>
    );
  }
};

export default AddCardInfo;
