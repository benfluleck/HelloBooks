import {connect} from 'react-redux';
import { fetchBooksforDashboard }  from '../../actions/fetchbooks';
import LandingPage from '../presentation/LandingPage.jsx';
import {PropTypes} from 'prop-types'


LandingPage.PropTypes = {
  books: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books.books,
    isAuthenticated: !!state.userReducer.isAuthenticated
  };
};

export default connect (mapStateToProps,{ fetchBooksforDashboard })(LandingPage);
