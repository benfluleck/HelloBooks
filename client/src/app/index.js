import React from 'react';
import { render } from 'react-dom';
import image from './img/bg.jpg'
import css from './css/style.scss'


class App extends React.Component {
 render() {
  return (
    
      <div className='jumbotron'>
        <h1 className="display-3">Hello, world!</h1>
      </div>
   
  )
 }
}

render(<App/>,window.document.getElementById('app'))