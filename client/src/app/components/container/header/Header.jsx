import { connect } from 'react-redux';
import Header from '../../presentation/common/header/Header.jsx';


const mapStateToProps = state => ({

  isAuthenticated: !!state.userReducer.isAuthenticated,
  tokenExists: !!localStorage.getItem('token')

});

export default connect(mapStateToProps)(Header);
