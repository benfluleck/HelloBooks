import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'




import {Root} from './components/Root'
import {Login} from './containers/Login'
import {Register} from './containers/Register'
import {Profile} from './components/Profile'
import {Books} from './components/Books'
import {Forgetpass} from './components/Forgetpass'
import {Admin} from './components/admin/Admin'
import {NotFound} from './components/NotFound'

class App extends React.Component {
  submit = data =>{
    console.log(data);
  }
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

            <Route component={NotFound}/>

           
          </Switch>
      </Root>
      </div>
   </Router>
  )
 }
}

render(<App/>,window.document.getElementById('app'))