import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Request from '../../../interface/Request';
import useStyles from './useStyles';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRequest } from '../../../context/useRequestContext';

interface Props {
  request: Request | null | undefined;
}

const RequestMenu = ({ request }: Props): JSX.Element => {
  const { sendResponse } = useRequest();
  const classes = useStyles();
  const [menuToggle, setmenuToggle] = React.useState<null | HTMLElement>(null);
  if (request) {
    const accepted = request.accepted === true;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setmenuToggle(event.currentTarget);
    };

    const handleClose = () => {
      setmenuToggle(null);
    };
    const handleSubmit = (bookingStatus: string) => {
      sendResponse(bookingStatus, request._id, request.owner._id);
      setmenuToggle(null);
    };
    return (
      <Box>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.button}>
          <SettingsIcon />
        </IconButton>
        <Menu id="request-menu" anchorEl={menuToggle} keepMounted open={Boolean(menuToggle)} onClose={handleClose}>
          <MenuItem className={classes.menuText} disabled={accepted} onClick={() => handleSubmit('accept')}>
            Accept
          </MenuItem>
          <MenuItem className={classes.menuText} disabled={!accepted} onClick={() => handleSubmit('decline')}>
            Decline
          </MenuItem>
        </Menu>
      </Box>
    );
  }
  return <Box component="main"></Box>;
};

export default RequestMenu;
