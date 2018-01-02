import { connect } from 'react-redux';
import Header from '../../presentation/common/header/Header';


const mapStateToProps = state => ({

  isAuthenticated: !!state.userReducer.isAuthenticated,
  tokenExists: !!localStorage.getItem('token')

});

export default connect(mapStateToProps)(Header);
