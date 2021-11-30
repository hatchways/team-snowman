import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import AuthMenu from '../../AuthMenu/AuthMenu';
import NotificationLink from '../../NotificationDisplay/NotificationDisplay';
import TextTransition, { presets } from 'react-text-transition';
import { useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';

const LoggedInBar = (): JSX.Element => {
  const classes = useStyles();
  const [showText1, setShowText1] = useState<boolean>(true);
  const [showText2, setShowText2] = useState<boolean>(true);
  const { isOpen, setIsOpen, currentStep, setCurrentStep } = useTour();

  useEffect(() => {
    setInterval(() => {
      setShowText1(false);
      setTimeout(() => {
        setShowText2(false);
      }, 3000);
    }, 6000);
  }, [setShowText1, setShowText2]);

  useEffect(() => {
    if (!showText1) {
      setShowText1(true);
    }
  }, [showText1]);

  useEffect(() => {
    if (!showText2) {
      setShowText2(true);
    }
  }, [showText2]);

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep, isOpen]);

  useEffect(() => {
    if (currentStep < 7 || currentStep > 11) {
      setIsOpen(false);
    }
  }, [currentStep, setIsOpen]);

  return (
    <Grid container className={classes.navButtons}>
      <Button variant="outlined" color="primary" onClick={() => setIsOpen(true)}>
        Try our tour
      </Button>
      <Grid data-tour="narbar-notifications" item>
        <NotificationLink>
          <Typography variant="h3">
            <TextTransition text={showText2 ? 'Notifications' : ''} springConfig={presets.default} />
          </Typography>
        </NotificationLink>
      </Grid>
      <Grid item>
        <Button component={Link} to="/my-jobs" color="secondary" size="large" variant="text">
          <Typography data-tour="narbar-my-jobs" variant="h3">
            <TextTransition text={showText1 ? 'My Jobs' : ''} springConfig={presets.default} />
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/messages" color="secondary" size="large" variant="text">
          <Typography data-tour="narbar-messages" variant="h3">
            <TextTransition text={showText2 ? 'Messages' : ''} springConfig={presets.slow} />
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/my-sitters" color="secondary" size="large" variant="text">
          <Typography data-tour="narbar-my-sitters" variant="h3">
            <TextTransition text={showText1 ? 'My Sitters' : ''} springConfig={presets.slow} />
          </Typography>
        </Button>
      </Grid>
      <Grid data-tour="narbar-avatar" item>
        <AuthMenu />
      </Grid>
    </Grid>
  );
};

export default LoggedInBar;
