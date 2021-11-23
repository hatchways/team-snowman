import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import EditMenu from './components/EditProfile/EditMenu';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { NotificationProvider } from './context/useNotificationContext';

import EditPhoto from './components/EditProfile/EditPhoto/EditPhoto';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>

              <NotificationProvider>
                <NavBar />
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route exact path="/my-jobs">
                    <Dashboard />
                  </Route>
                  <Route exact path="/messages">
                    <Dashboard />
                  </Route>
                  <Route exact path="/my-sitters">
                    <Dashboard />
                  </Route>
                  <Route exact path="/edit-profile" component={EditMenu} />

              <NavBar />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/my-jobs">
                  <Dashboard />
                </Route>
                <Route exact path="/messages">
                  <Dashboard />
                </Route>
                <Route exact path="/my-sitters">
                  <Dashboard />
                </Route>
                <Route exact path="/edit-profile" component={EditMenu} />
                <Route exact path="/edit-image" component={EditPhoto} />


                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </NotificationProvider>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
