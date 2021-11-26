import { Box, Typography, Avatar } from '@material-ui/core';
import useStyles from './useStyles';
import { Notification } from '../../../interface/Notification';

interface Props {
  notification: Notification;
}

const NotificationListing = ({ notification }: Props): JSX.Element => {
  const classes = useStyles();
  const notificationData =
    notification.type === 'newRequest' || 'requestUpdate'
      ? {
          title: 'Dog Sitting',
          message:
            notification.type == 'newRquest'
              ? `${notification.data.firstName} has requested your service for ${notification.data.duration} ${
                  notification.data.duration === 1 ? 'hour' : 'hours'
                }`
              : `${notification.data.firstName} has updated your request`,
        }
      : { title: 'Messages', message: `${notification.data.firstName} sent you a new message` };

  if (notification) {
    return (
      <Box display="flex" alignItems="center" padding={2}>
        <Avatar
          variant="square"
          className={classes.avatar}
          alt={notification.data.firstName}
          src={notification.data.photo}
        />
        <Box justifyContent="left">
          <Typography className={classes.mainText}>{notificationData.message}</Typography>
          <Typography className={classes.typeText}>{notificationData.title}</Typography>
          <Typography className={classes.mainText}>{notification.data.date}</Typography>
        </Box>
      </Box>
    );
  }
  return <Typography variant="h3">Notification</Typography>;
};

export default NotificationListing;
