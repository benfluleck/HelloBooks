import {connect} from 'react-redux';
import LandingPage from '../presentation/LandingPage.jsx';
import {PropTypes} from 'prop-types'


LandingPage.PropTypes = {
  isAuthenticated: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.userReducer.isAuthenticated
  };
};

export default connect (mapStateToProps)(LandingPage);
