import React from 'react'
import css from '../css/style.scss'
import {Row, Col} from 'react-materialize'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button} from 'react-materialize'
import {Link} from 'react-router-dom'
import {logout} from '../actions/auth'

// const name='Guest'

const Welcome = ({isAuthenticated, logout}) => {
    if (!isAuthenticated) {
        return (
            <div className='welcome'>
                <Col s={12} m={6} l={4}>
                    <div className='head'>
                        <h1>Welcome {name}</h1>
                        <h3>Hello Books</h3>
                        <p>by Benny Ogidan</p>

                    </div>
                </Col>
            </div>
        );
    } else {
        return (
            <div className='welcome'>
                <Col s={8} m={10} l={4}>
                    <h4>Hello {name}</h4>
                    <Button
                        style={{
                        'marginBottom': '3em'
                    }}
                        onClick={() => logout()}>Logout</Button>
                </Col>
            </div>
        );
    }

}
Welcome.propTypes = {
    name: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func

};

Welcome.defaultProps = {
    name: 'Guest'
}

const mapStateToProps = (state) => {
    // if (!state.user.user.token || state.user.user.token === "" ) { //if there is
    // no token, dont bother     return state.user.user.token = ''; } else {
    console.log(state)
    return {
        isAuthenticated: !!state.token
    };
    // }
}

export default connect(mapStateToProps, {logout})(Welcome);
