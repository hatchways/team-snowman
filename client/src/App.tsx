import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import EditMenu from './components/EditProfile/EditMenu';
import Checkout from './components/Checkout/Checkout';
import Landing from './pages/Landing/Landing';
import AddCard from './components/AddCard/AddCard';
import AddCardInfo from './components/AddCard/AddCardInfo/AddCardInfo';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Requests from './components/Requests/Requests';
import { RequestProvider } from './context/useRequestContext';
import { SitterListingProvider } from './context/useSitterContext';
import SitterProfile from './components/SitterProfile/SitterProfile';

import { NotificationProvider } from './context/useNotificationContext';
import { FindSitterFormProvider } from './context/useFindSitterFormContext';
import EditPhoto from './components/EditProfile/EditPhoto/EditPhoto';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TourProvider } from '@reactour/tour';
import { steps } from './steps';
import { styles } from './tour';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <TourProvider
        steps={steps}
        styles={styles}
        afterOpen={(e: Element | null) => {
          if (e) disableBodyScroll(e);
        }}
        beforeClose={(e: Element | null) => {
          if (e) enableBodyScroll(e);
        }}
        badgeContent={({ totalSteps, currentStep }) => `${currentStep + 1}/${totalSteps}`}
        scrollSmooth
      >
        <BrowserRouter>
          <SnackBarProvider>
            <AuthProvider>
              <NotificationProvider>
                <SocketProvider>
                  <NavBar />
                  <Switch>
                    <Route exact path="/">
                      <FindSitterFormProvider>
                        <Landing />
                      </FindSitterFormProvider>
                    </Route>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <ProtectedRoute exact path="/edit-profile" component={EditMenu} />
                    <ProtectedRoute exact path="/checkout" component={Checkout} />
                    <ProtectedRoute exact path="/edit-image" component={EditPhoto} />
                    <ProtectedRoute exact path="/payment-profile" component={AddCard} />
                    <ProtectedRoute exact path="/add-card-info" component={AddCardInfo} />
                    <SitterListingProvider>
                      <RequestProvider>
                        <ProtectedRoute exact path="/my-jobs" component={Requests} />

                        <Route exact path="/sitter-profile" component={SitterProfile} />
                        <Route exact path="/dashboard" component={Dashboard} />
                      </RequestProvider>
                    </SitterListingProvider>

                    <ProtectedRoute exact path="/messages">
                      <Dashboard />
                    </ProtectedRoute>

                    <ProtectedRoute exact path="/my-sitters">
                      <RequestProvider>
                        <Dashboard />
                      </RequestProvider>
                    </ProtectedRoute>

                    <Route path="*">
                      <Redirect to="/login" />
                    </Route>
                  </Switch>
                </SocketProvider>
              </NotificationProvider>
            </AuthProvider>
          </SnackBarProvider>
        </BrowserRouter>
      </TourProvider>
    </MuiThemeProvider>
  );
}

export default App;
