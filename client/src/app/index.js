import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import { createStore,applyMiddleware} from 'redux'
import {Provider} from  'react-redux'
import thunk from 'redux-thunk'



import {Root} from './components/Root'
import {Login} from './containers/Login'
import {Register} from './containers/Register'
import {Profile} from './components/Profile'
import {Books} from './components/Books'
import {Forgetpass} from './containers/Forgetpass'
import {Admin} from './components/admin/Admin'
import {NotFound} from './components/NotFound'
import {Adminroot} from './components/admin/Adminroot'
import {CreateBook} from './components/admin/CreateBook'
import {EditBook} from './components/admin/EditBook'
import {ViewBooks} from './components/admin/ViewBooks'
import {Userlist} from './components/admin/Userlist'
import {EditUser} from './components/admin/EditUser'
import {store} from './store/store'

class App extends React.Component {
  
 render() {
  return (
    <Router>
      <div>
      <Root >
          <Switch>
            <Route exact path={'/'} component={Login}/>
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/profile'} component={Profile}/>
            <Route exact path={'/books'} component={Books}/>
            <Route exact path={'/forgetpass'} component={Forgetpass}/>
            
            
            <Route path={'/admin'} component={Admin}/>
            <Route exact path={'/admin'} component={Adminroot}/>
            <Route exact path={'/admin/createbook'} component={CreateBook}/>
            <Route exact path={'/admin/editbook'} component={EditBook}/>
            <Route exact path={'/admin/viewbook'} component={ViewBooks}/>
            <Route exact path={'/admin/edituser'} component={EditUser}/>
            <Route exact path={'/admin/userlist'} component={Userlist}/>

            <Route component={NotFound}/>

           
          </Switch>
      </Root>
      </div>
   </Router>
  )
 }
}

render(<Provider store={store}>
  <App/>
  </Provider>,
  window.document.getElementById('app'))