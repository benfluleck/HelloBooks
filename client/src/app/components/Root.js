import React from 'react'
import {Row, Col} from 'react-materialize'
import Header from '../components/presentation/common/header/Header'
import { Bottom } from '../components/presentation/common/Footer'


/*
eslint-disable
 */

export class Root extends React.Component
{
  render() {

    return (
      <div className='root-wrapper'>
        <div className ='header-wrapper'>
          <Header/>
            <Row>
              <div className= 'header-text'><h1> Welcome!.</h1>
                 <h4>to Hello Books</h4>
            </div>
            </Row>
        </div>
        {/* <div className='body-wrapper'>
          <Row> */}
            {this.props.children}

          {/* </Row>
          </div> */}
          <Bottom/>
      </div>
    )
  }
}
