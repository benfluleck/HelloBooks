import React from 'react';
import 'redux-notifications/lib/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Root from './components/Root';
import LandingPage from './components/container/LandingPage';
import AuthSignIn from
  './components/presentation/authentication/SignInPage';
import AuthSignUp from
  './components/presentation/authentication/SignUpPage';
import UserDashboard from './components/presentation/UserDashboard';
import AdminDashboard from './components/presentation/admin/AdminDashboard';
import Logout from './components/container/authentication/Logout';
import UserRoutes from './components/hoc/UserRoutes';
import GuestRoutes from './components/hoc/GuestRoutes';
import AdminRoutes from './components/hoc/AdminRoutes';
import ChangePassword from './components/container/password/ChangePassword';


import '../app/css/style.scss';


const MainRoot = () => (
  <Router>
    <Root>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <GuestRoutes exact path="/login" component={AuthSignIn} />
        <Route exact path="/logout" component={Logout} />
        <GuestRoutes exact path="/signup" component={AuthSignUp} />
        <UserRoutes exact path="/dashboard" component={UserDashboard} />
        <AdminRoutes exact path="/admin" component={AdminDashboard} />
        <UserRoutes exact path="/changepassword" component={ChangePassword} />

        {/* <Route component={NotFound}/> */}
      </Switch>
    </Root>
  </Router>
);
export default MainRoot;

