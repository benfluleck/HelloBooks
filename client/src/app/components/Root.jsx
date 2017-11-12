import React from 'react'
import {Row, Col} from 'react-materialize'
import Header from '../components/container/header/Header.jsx'



/*
eslint-disable
 */

export class Root extends React.Component
{
  render() {

    return (
      <div className='root-wrapper'>

          <Header/>

            {this.props.children}

      </div>
    )
  }
}
