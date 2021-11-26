import { Button, Typography, Menu, Badge, Box, MenuItem } from '@material-ui/core';
import React from 'react';
import { useNotification } from '../../context/useNotificationContext';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import NotificationListing from './NotificationListing/NotifcationListing';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Notification } from '../../interface/Notification';

const NotificationLink = (): JSX.Element => {
  const classes = useStyles();
  const { notifications, markNotificationsAsRead } = useNotification();
  const [notificationDisplay, SetNotificationDisplay] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    SetNotificationDisplay(event.currentTarget);
  };
  const handleClose = () => {
    markNotificationsAsRead();
    SetNotificationDisplay(null);
  };
  return (
    <Box display="flex">
      <Button color="secondary" size="large" variant="text" onClick={handleClick}>
        <Badge variant="dot" className={classes.badge} invisible={!notifications?.length}>
          <Typography variant="h3">Notifications</Typography>
        </Badge>
      </Button>
      <Box className={notificationDisplay ? classes.point : classes.pointClosed}>
        <ArrowDropUpIcon />
      </Box>
      <Menu
        getContentAnchorEl={null}
        className={classes.menu}
        id="simple-menu"
        anchorEl={notificationDisplay}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        keepMounted
        open={Boolean(notificationDisplay)}
        onClose={handleClose}
      >
        {!notifications?.length ? (
          <Box padding={2}>
            <Typography variant="h3">You have no new notifications</Typography>
          </Box>
        ) : (
          notifications?.map((notification: Notification) => {
            return (
              <MenuItem
                key={notification._id}
                component={Link}
                onClick={handleClose}
                className={classes.link}
                to={
                  notification.type === 'message'
                    ? '/messages'
                    : notification.type === 'newRequest'
                    ? '/my-jobs'
                    : '/my-sitters'
                }
              >
                <NotificationListing notification={notification} />
              </MenuItem>
            );
          })
        )}
      </Menu>
    </Box>
  );
};

export default NotificationLink;
