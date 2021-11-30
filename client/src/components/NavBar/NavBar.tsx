import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoggedInBar from './AuthBars/LoggedInBar';
import LoggedOutBar from './AuthBars/LoggedOutBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import { useSocket } from '../../context/useSocketContext';

interface Props {
  children?: React.ReactNode;
}

const NavBar = ({ children }: Props): JSX.Element => {
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const history = useHistory();

  const { initSocket } = useSocket();

  useEffect(() => {
    if (history.location.pathname === '/') {
      setIsLandingPage(true);
    } else {
      setIsLandingPage(false);
    }
  }, [setIsLandingPage, history]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (window.location.pathname === '/') {
        setIsLandingPage(true);
      } else {
        setIsLandingPage(false);
      }
    });
    return function cleanup() {
      unlisten();
    };
  }, [history]);

  if (loggedInUser === undefined) return <CircularProgress />;

  return (
    <Box>
      <Grid>
        <AppBar
          elevation={history.location.pathname === '/' ? 0 : 6}
          className={isLandingPage ? classes.landingPageBar : classes.appbar}
          position="absolute"
        >
          <ToolBar className={classes.toolbar}>
            <Link to="/dashboard">
              <img src={logo} alt="logo" />
            </Link>
            {loggedInUser ? <LoggedInBar /> : <LoggedOutBar isLandingPage={isLandingPage} />}
          </ToolBar>
        </AppBar>
        {children}
      </Grid>
    </Box>
  );
};

export default NavBar;
