import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import AddCardForm from './AddCardForm/AddCardForm';
import { useAuth } from '../../context/useAuthContext';
import editProfile from '../../helpers/APICalls/editProfile';

export default function AddCard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser, loggedInUserProfile, fetchProfileAndUpdateContext } = useAuth();

  const handleSubmit = async (
    { paymentMethod }: { paymentMethod: string },
    { setSubmitting }: FormikHelpers<{ paymentMethod: string }>,
  ) => {
    if (loggedInUserProfile) {
      const profile = Object.create(loggedInUserProfile);
      if (profile) {
        setSubmitting(false);
        profile.defaultPaymentMethod = paymentMethod;
        await editProfile(profile);
        fetchProfileAndUpdateContext();
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Box
        display="flex"
        width="100%"
        alignItems="flex-start"
        justifyContent="space-between"
        flexDirection="column"
        minHeight="100%"
        marginTop="60px"
        marginBottom="80px"
      >
        <Box width="100%" maxWidth={1000} p={0} alignSelf="center">
          <Grid container>
            <Grid item xs>
              <Typography className={classes.welcome} component="h1" variant="h5">
                Payment Methods
              </Typography>
            </Grid>
          </Grid>
          <AddCardForm handleSubmit={handleSubmit} />
        </Box>
      </Box>
    </Grid>
  );
}
