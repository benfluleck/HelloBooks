import React from 'react'
import css from '../css/style.scss'
import {Row, Col} from 'react-materialize'

import {Header} from './Header';
import {Bottom} from './Footer';
import Welcome from './Welcome';

/*
eslint-disable
 */

export class Root extends React.Component
{
    render() {

        return (

            <div className='root'>

                <Header/>
                <main>
                    <Row>
                        <div className="container">
                            <Welcome/>
                              {this.props.children}
                        </div>
                    </Row>
                </main>
                <Bottom/>
            </div>

        )
    }
}

