import React from 'react'
import {NavLink} from 'react-router-dom'



export const Header = (props)=>{

    return(
        <nav className='#039be5 light-blue darken-1'>
            <div className='nav-wrapper'>
                <NavLink to='#' className ='brand-logo left'> Logo </NavLink>
                <ul className='right hide-on-small-and-down'>
                    <li><NavLink to="sass.html">Sass</NavLink></li>
                    <li><NavLink to="badges.html">Components</NavLink></li>
                    <li><NavLink to="#">JavaScript</NavLink></li>
                </ul>
            </div>
        </nav>
        
    );


};
