import React from 'react'
import { Footer, Row } from 'react-materialize'


/**
 * @description Component for Footer, named Bottom so as not to conflict with materialize footer
 * @class Bottom
 * @extends {Component}
 */
export const Bottom = ()=>{
    return(
      <Footer className='transparent' copyrights="&copy; 2017 Copyright Benny Ogidan and Andela"
        moreLinks={
      <a className="grey-text text-lighten-4 right" href="www.andela.com">Partners</a>}>
      </Footer>
    );
};
