import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from '../presentation/Dashboard.jsx';

Dashboard.propTypes = {
  username: PropTypes.string,
  firstname: PropTypes.string,
  email: PropTypes.string,

};

Dashboard.defaultProps = {
  username: '',
  firstname: '',
  email: '',

};

const mapStateToProps = state => ({
  username: state.userReducer.user.username,
  firstname: state.userReducer.user.firstname,
  email: state.userReducer.user.email,
  profilePic: state.userReducer.user.profilePic
});

export default connect(mapStateToProps)(Dashboard);
