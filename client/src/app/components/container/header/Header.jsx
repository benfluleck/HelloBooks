import {connect} from 'react-redux';
import Header from '../../presentation/common/header/Header.jsx';


const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.userReducer.isAuthenticated
  };
}

export default connect(mapStateToProps)(Header);
