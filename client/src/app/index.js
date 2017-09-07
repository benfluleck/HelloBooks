import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'




import {Root} from './components/Root'
import {LogIn} from './components/LogIn'


class App extends React.Component {
constructor(props){
  super(props);

  this.state = {
    message: 'Welcome Guest'
  }
}


 render() {
  return (
    <Router>
      <Root>
         
          <Switch>
            <Route exact path={'/'} component={LogIn}/>
          </Switch>

              
            

      </Root>
   </Router>
  )
 }
}

render(<App/>,window.document.getElementById('app'))