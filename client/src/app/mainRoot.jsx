import React, { Component } from 'react';
import 'redux-notifications/lib/styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  Root  from './components/Root.jsx';
import LandingPage from './components/container/LandingPage.jsx';
import Login from './components/container/authentication/SignInPage.jsx';
import SignUp from './components/container/authentication/SignUpPage.jsx';
import Dashboard from './components/container/Dashboard.jsx';
import Logout from './components/container/authentication/Logout.jsx';
import UserRoutes from './components/hoc/UserRoutes.jsx';
import '../app/css/style.scss';
 

/**
 * 
 * @export
 * @class MainRoot
 * @extends {Component}
 */
export default class MainRoot extends Component {
	render() {
		return (
			<Router>
				<Root>
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/logout" component={Logout} />
						<Route exact path="/signup" component={SignUp} />
						<UserRoutes exact path="/dashboard" component={Dashboard} />

		

						{/* <Route component={NotFound}/> */}
					</Switch>
				</Root>
			</Router>
		);
	}
}
