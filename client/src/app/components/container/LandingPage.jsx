import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from '../presentation/LandingPage.jsx';

LandingPage.PropTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated
});

export default connect(mapStateToProps)(LandingPage);
