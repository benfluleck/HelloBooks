import React from 'react'
import css from '../css/style.scss'
import { Row,Col } from 'react-materialize'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import { logout } from '../actions/auth'

// const name='Guest'

const Welcome = ({isAuthenticated, logout}) => {
        if (!{isAuthenticated}){
            return(
                <div className='welcome'>
                    <Col s={12} m={6} l={4}>
                        <div className='head'>
                        <h2>Welcome {name}</h2> 
                        <h4>Hello Books</h4>
                        <p>by Benny Ogidan</p>
                        <Link to='/login'><Button>Login</Button>
                        </Link>  
                        </div>
                    </Col>
                </div>
            );
        }
        else{
            return(
                <div className='welcome'>
                    <Col s={8} m={10} l={12}>
                        <p>Hello {name}</p>
                        <Button onClick={()=> logout()}>Logout</Button> 
                    </Col>
                </div>
                 );
    }
     
}
Welcome.propTypes = {
    name: PropTypes.string,
    isAuthenticated : PropTypes.bool.isRequired,
    logout :PropTypes.func.isRequired


};

Welcome.defaultProps= {
    name:'Guest',
    
}

const mapStateToProps =(state)=> {
    return{
        isAuthenticated : !!state.user.user
    };
}

export default connect(mapStateToProps, {logout})(Welcome);
