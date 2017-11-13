import React, {Component} from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Root} from './components/Root.jsx';
import LandingPage  from './components/container/LandingPage.jsx';
import Login from './components/container/authentication/SignInPage.jsx';
import SignUp from './components/container/authentication/SignUpPage.jsx'
import Dashboard from './components/container/dashboard/Dashboard.jsx'
import Logout from './components/container/authentication/Logout.jsx'
// import Register from './containers/Register'
// import Profile from './components/Profile'
// import Books from './components/Books'
// import Forgetpass from './containers/ForgetPasswordForm'
// import {Admin} from './components/admin/Admin'
// import {NotFound} from './components/NotFound'
// import {Adminroot} from './components/admin/Adminroot'
// import {CreateBook} from './components/admin/CreateBook'
// import {EditBook} from './components/admin/EditBook'
// import {ViewBooks} from './components/admin/ViewBooks'
// import {Userlist} from './components/admin/Userlist'
// import {EditUser} from './components/admin/EditUser'
// import Dashboard from './components/Dashboard'
import UserRoutes from './components/hoc/UserRoutes'
import css from '../app/css/style.scss';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import 'redux-notifications/lib/styles.css';




/*
eslint-disable
 */
export default class MainRoot extends Component {
  render() {
    return (
      <Router>
        <Root>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/signup' component={SignUp}/>
            <UserRoutes exact path='/dashboard' component={Dashboard}/>

            {/* <Route exact path={'/register'} component={Register}/>
            <Route exact path={'/forgetpass'} component={Forgetpass}/>
            <UserRoute path={'/dashboard'} exact component={Dashboard}/>
            <UserRoute exact path={'/profile'} component={Profile}/>
            <UserRoute exact path={'/books'} component={Books}/>

            <UserRoute exact path={'/admin'} component={Admin}/>
            <UserRoute path={'/admin/createbook'} component={CreateBook}/>
            <UserRoute path={'/admin/editbook'} component={EditBook}/>
            <UserRoute exact path={'/admin/viewbook'} component={ViewBooks}/>
            <UserRoute exact path={'/admin/edituser'} component={EditUser}/>
            <UserRoute exact path={'/admin/userlist'} component={Userlist}/> */}
            {/* <Route exact path={'/admin'} component={Adminroot}/> */}

            {/* <Route component={NotFound}/> */}

          </Switch>
        </Root>
      </Router>

    )
  }
}
