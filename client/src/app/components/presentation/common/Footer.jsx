import React from 'react';
import { Footer } from 'react-materialize';

/**
 * @description Component for Footer,
 * named Bottom so as not to conflict with materialize footer
 * @class Bottom
 */
const SiteFooter = () => (
  <Footer
    className="transparent"
    copyrights="&copy; 2017 Copyright Benny Ogidan and Andela"
    moreLinks={
      <a id="footer-link" className="grey-text text-lighten-4 right" href="www.andela.com">
          Partners
      </a>
}
  />
);

export default SiteFooter;
