import React, {Component} from 'react'
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Root} from './components/Root'
import Login from './containers/Login'
import Register from './containers/Register'
import Profile from './components/Profile'
import Books from './components/Books'
import Forgetpass from './containers/ForgetPasswordForm'
import {Admin} from './components/admin/Admin'
import {NotFound} from './components/NotFound'
import {Adminroot} from './components/admin/Adminroot'
import {CreateBook} from './components/admin/CreateBook'
import {EditBook} from './components/admin/EditBook'
import {ViewBooks} from './components/admin/ViewBooks'
import {Userlist} from './components/admin/Userlist'
import {EditUser} from './components/admin/EditUser'
import Dashboard from './components/Dashboard'
import UserRoute from './components/routes/UserRoute'
import GuestRoute from './components/routes/GuestRoute'


/*
eslint-disable
 */
export default class MainRoot extends Component {
  render() {
    return (
      <Router>
        <Root>
          <Switch>
            <Route exact path='/' component={Login}/>
            <GuestRoute exact path={'/register'} component={Register}/>
            <Route exact path={'/forgetpass'} component={Forgetpass}/>
            <UserRoute path={'/dashboard'} exact component={Dashboard}/>
            <UserRoute exact path={'/profile'} component={Profile}/>
            <UserRoute exact path={'/books'} component={Books}/>

            <UserRoute exact path={'/admin'} component={Admin}/>
            <UserRoute path={'/admin/createbook'} component={CreateBook}/>
            <UserRoute path={'/admin/editbook'} component={EditBook}/>
            <UserRoute exact path={'/admin/viewbook'} component={ViewBooks}/>
            <UserRoute exact path={'/admin/edituser'} component={EditUser}/>
            <UserRoute exact path={'/admin/userlist'} component={Userlist}/> {/* <Route exact path={'/admin'} component={Adminroot}/> */}

            <Route component={NotFound}/>

          </Switch>
        </Root>
      </Router>

    )
  }
}
