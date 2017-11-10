import React from 'react'
import {Row, Col} from 'react-materialize'
import Header from '../components/container/header/Header.jsx'
import { Bottom } from '../components/presentation/common/Footer.jsx'


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
            <Bottom/>
      </div>
    )
  }
}
