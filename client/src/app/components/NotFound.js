import React from 'react'
import css from '../css/style.scss'
import { Row,Col } from 'react-materialize'
import image from '../img/404.jpg'

/*
eslint-disable
 */
export const NotFound =(props)=>{
   
            
        return(
                <div>
                <h1> 404 - Page Not Found </h1>
                <div className='notfound'>
                    <img  className="responsive-img" src={image}/>

                </div>
                </div>
            );
        
    }
  
