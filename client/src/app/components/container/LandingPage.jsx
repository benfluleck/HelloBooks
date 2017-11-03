import {connect} from 'react-redux';
import { fetchBooksforDashboard }  from '../../actions/fetchbooks';
import LandingPage from '../presentation/LandingPage.jsx';

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books.books
  };
};

export default connect (mapStateToProps,{ fetchBooksforDashboard })(LandingPage);
