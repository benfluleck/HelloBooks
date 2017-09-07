import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'




import {Root} from './components/Root'


class App extends React.Component {
 render() {
  return (
    <Router>
      <div>
         <Route component={Root}/>
            
              
            

      </div>
   </Router>
  )
 }
}

render(<App/>,window.document.getElementById('app'))