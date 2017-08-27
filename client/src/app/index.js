import React from 'react';
import { render } from 'react-dom';


class App extends React.Component {
 render() {
  return (
    <div className='jumbotron'>
       <h1 class="display-3">Hello, world!</h1>
    </div>
  )
 }
}

render(<App/>,window.document.getElementById('app'))