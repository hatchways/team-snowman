import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Request from '../../../interface/Request';
import useStyles from './useStyles';
import Avatar from '@material-ui/core/Avatar';
import RequestMenu from '../RequestMenu/RequestMenu';

interface Props {
  request: Request | null | undefined;
  component: string;
}

const RequestListing = ({ request, component }: Props): JSX.Element => {
  const classes = useStyles();

  if (request) {
    const status =
      request.accepted === true ? 'accepted' : request.accepted === false ? 'declined' : 'response required';

    const startTime = new Date(request.duration.start)
      .toLocaleString('en-CA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        hour12: true,
      })
      .slice(0, -5)
      .replace(',', '');
    const endTime = new Date(request.duration.end).toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
      timeZone: 'America/Toronto',
    });
    return (
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.date}>{`${startTime}-${endTime}`}</Typography>
          <Box marginTop={-2} className={component == 'nextBooking' ? classes.menuNext : classes.menuList}>
            <RequestMenu request={request} />
          </Box>
        </Box>
        <Box className={classes.ownerInfo} display="flex" alignItems="center">
          <Avatar alt="Requesters avatar" src={request.owner.profile?.photo} />
          <Typography className={classes.ownerName}>{request.sitter.username}</Typography>
          <Typography
            className={
              component == 'nextBooking'
                ? classes.menuNext
                : status === 'response required'
                ? classes.respondStatus
                : classes.status
            }
          >
            {status}
          </Typography>
        </Box>
      </Box>
    );
  }
  return <Box component="main"></Box>;
};

export default RequestListing;
