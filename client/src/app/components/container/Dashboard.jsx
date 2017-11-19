import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from '../presentation/Dashboard.jsx';

Dashboard.propTypes = {
  username: PropTypes.string,
  firstname: PropTypes.string,
  email: PropTypes.string,

};

const mapStateToProps = state => ({
  username: state.userReducer.user.data.username,
  firstname: state.userReducer.user.data.firstname,
  email: state.userReducer.user.data.email
});

export default connect(mapStateToProps)(Dashboard);
