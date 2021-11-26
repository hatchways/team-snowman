import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import EditMenu from './components/EditProfile/EditMenu';
import Checkout from './components/Checkout/Checkout';
import AddCard from './components/AddCard/AddCard';
import AddCardInfo from './components/AddCard/AddCardInfo/AddCardInfo';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider, useAuth } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Requests from './components/Requests/Requests';
import { RequestProvider } from './context/useRequestContext';
import { NotificationProvider } from './context/useNotificationContext';
import EditPhoto from './components/EditProfile/EditPhoto/EditPhoto';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <NotificationProvider>
              <SocketProvider>
                <NavBar />
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <ProtectedRoute exact path="/edit-profile" component={EditMenu} />
                  <ProtectedRoute exact path="/checkout" component={Checkout} />
                  <ProtectedRoute exact path="/edit-image" component={EditPhoto} />
                  <ProtectedRoute exact path="/payment-profile" component={AddCard} />
                  <ProtectedRoute exact path="/add-card-info" component={AddCardInfo} />

                  <ProtectedRoute exact path="/dashboard">
                    <Dashboard />
                  </ProtectedRoute>

                  <ProtectedRoute exact path="/my-jobs">
                    <RequestProvider>
                      <Requests />
                    </RequestProvider>
                  </ProtectedRoute>

                  <ProtectedRoute exact path="/messages">
                    <Dashboard />
                  </ProtectedRoute>

                  <ProtectedRoute exact path="/my-sitters">
                    <RequestProvider>
                      <Dashboard />
                    </RequestProvider>
                  </ProtectedRoute>

                  <RequestProvider>
                    <ProtectedRoute exact path="/my-sitters">
                      <Dashboard />
                    </ProtectedRoute>
                  </RequestProvider>

                  <ProtectedRoute exact path="/edit-profile" component={EditMenu} />
                  <ProtectedRoute exact path="/edit-image" component={EditPhoto} />
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </SocketProvider>
            </NotificationProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
