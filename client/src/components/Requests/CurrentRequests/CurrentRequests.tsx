import { Paper, Typography, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';
import RequestListing from '../RequestListing/RequestListing';
import RequestData from '../../../interface/Request';

interface Props {
  requests: RequestData;
}

const CurrentRequests = ({ requests }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} component={Paper} elevation={2}>
      <Box>
        <Typography className={classes.heading}>current requests:</Typography>
        <Grid item className={classes.listing}>
          {requests?.after?.map((afterRequest) => {
            return (
              <Box
                key={afterRequest._id}
                width={'440px'}
                paddingTop={2}
                marginBottom={1}
                border="solid 1px rgb(0,0,0,0.2)"
                borderRadius={10}
              >
                <RequestListing request={afterRequest} component={'listBooking'}></RequestListing>
              </Box>
            );
          })}
        </Grid>
        <Typography className={classes.heading}>past requests:</Typography>
        <Grid item className={classes.listing}>
          {requests?.before?.map((pastRequest) => {
            return (
              <Box
                key={pastRequest._id}
                width={'440px'}
                paddingTop={2}
                marginBottom={1}
                border="solid 1px rgb(0,0,0,0.2)"
                borderRadius={10}
              >
                <RequestListing request={pastRequest} component={'listBooking'}></RequestListing>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default CurrentRequests;
