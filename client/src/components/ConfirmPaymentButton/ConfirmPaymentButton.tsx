import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { confirmPayments } from '../../helpers/APICalls/confirmPayments';
import { useHistory } from 'react-router-dom';

interface Props {
  totalCost: number;
}

export default function AddCard({ totalCost }: Props): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser, loggedInUserProfile, fetchProfileAndUpdateContext } = useAuth();
  const history = useHistory();

  const handleSubmit = async () => {
    if (loggedInUserProfile && loggedInUserProfile.defaultPaymentMethod != '' && loggedInUser) {
      confirmPayments({
        totalCost: totalCost,
        paymentMethod: loggedInUserProfile.defaultPaymentMethod,
        userId: loggedInUser?.id,
      }).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.paymentIntent) {
          history.push('/dashboard');
          updateSnackBarMessage('Confirm payment successfully');
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    } else {
      updateSnackBarMessage('Please update your payment profile before checkout');
      history.push('/payment-profile');
    }
  };

  return (
    <Box>
      <Button onClick={handleSubmit}>Confirm payment</Button>
    </Box>
  );
}
