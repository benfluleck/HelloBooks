import React from 'react';
import 'redux-notifications/lib/styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Root from './components/Root.jsx';
import LandingPage from './components/container/LandingPage.jsx';
import SignInPage from './components/presentation/authentication/SignInPage.jsx';
import SignUp from './components/container/authentication/SignUpPage.jsx';
import UserDashboard from './components/presentation/UserDashboard.jsx';
import AdminDashboard from './components/presentation/admin/AdminDashboard.jsx';
import Logout from './components/container/authentication/Logout.jsx';
import UserRoutes from './components/hoc/UserRoutes.jsx';
import GuestRoutes from './components/hoc/GuestRoutes.jsx';
import AdminRoutes from './components/hoc/AdminRoutes.jsx';
import ChangePassword from './components/container/password/ChangePassword.jsx';


import '../app/css/style.scss';


const MainRoot = () => (
  <Router>
    <Root>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={SignInPage} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/signup" component={SignUp} />
        <UserRoutes exact path="/dashboard" component={UserDashboard} />
        <AdminRoutes exact path="/admin" component={AdminDashboard} />
        <UserRoutes exact path="/changepassword" component={ChangePassword} />
       
        {/* <Route component={NotFound}/> */}
      </Switch>
    </Root>
  </Router>
);
export default MainRoot;

