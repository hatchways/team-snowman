import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { CircularProgress } from '@material-ui/core';
import { addCard } from '../../../helpers/APICalls/addCard';
import { getAllPaymentMethods } from '../../../helpers/APICalls/getAllPaymentMethods';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useHistory } from 'react-router-dom';
import CreditCard from './CreditCard/CreditCard';

interface Props {
  handleSubmit: (
    {
      paymentMethod,
    }: {
      paymentMethod: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      paymentMethod: string;
    }>,
  ) => void;
}

export default function AddCard({ handleSubmit }: Props): JSX.Element {
  const [paymentMethods, setPaymentMethods] = useState<any>([]);
  const { loggedInUser, loggedInUserProfile } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (loggedInUser) {
      getAllPaymentMethods({ userId: loggedInUser.id }).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.allPaymentMethods) {
          setPaymentMethods(data.allPaymentMethods);
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  }, [loggedInUser, updateSnackBarMessage]);

  const handleAddCard = () => {
    if (loggedInUser) {
      addCard({ userId: loggedInUser.id }).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.customer) {
          history.push({
            pathname: '/add-card-info',
            state: {
              clientSecret: data.intent.client_secret,
            },
          });
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  };

  if (process.env.REACT_APP_PRICE_ID) {
    return (
      <Formik
        initialValues={{
          paymentMethod: loggedInUserProfile ? loggedInUserProfile.defaultPaymentMethod : '',
        }}
        validationSchema={Yup.object().shape({
          paymentMethod: Yup.string().required('PaymentMethod is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setValues, values, touched, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
              <Box width="95" maxWidth="95%">
                <Typography component="h4" variant="h6" className={classes.smallTitle}>
                  saved payment profiles:
                </Typography>
                <Grid container>
                  {paymentMethods.map((card: any, index: number) => (
                    <CreditCard
                      key={card}
                      card={card}
                      setValues={setValues}
                      handleSubmit={handleSubmit}
                      values={values}
                    />
                  ))}
                </Grid>
                <Box textAlign="flex-start">
                  <Button
                    onClick={handleAddCard}
                    size="large"
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                  >
                    {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Add new payment profile'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    );
  } else {
    return <Typography>No valid Price Id</Typography>;
  }
}
