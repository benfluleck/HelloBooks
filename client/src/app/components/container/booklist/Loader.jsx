import React from 'react';
import PropTypes from 'prop-types';
import { Preloader } from 'react-materialize';

const Loader = ({ records, callback }) => {
  if (!records) {
    return (<Preloader size="big" />);
  }
  callback();
};

Loader.defaultProps = {
};

Loader.propTypes = {
  callback: PropTypes.oneOfType([
    PropTypes.object
  ]).isRequired
};

export default (Loader);
