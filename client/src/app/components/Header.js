import React from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, NavItem} from 'react-materialize'
import css from '../css/style.scss'




export  class Header extends React.Component{
    render(){
    return(
        <header>
            <Navbar right className='transparent'>
                <NavItem><NavLink to='/'>Log In</NavLink></NavItem>
                
                <NavItem><NavLink to='/books'>Books</NavLink></NavItem>
                <NavItem ><NavLink to='/profile'>My Profile</NavLink></NavItem>
            </Navbar>
           
            
        </header>             
        
    );
    }

};
