import React from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import PropTypes from 'prop-types';
import { loanhistory } from '../../../actions/loanhistory';
import PaginationWrapper from '../common/Pagination.jsx';
import LoanHistoryTable from '../../presentation/loanhistory/LoanHistoryTable.jsx';

/**
 * handles the state of the Loan history table
 * @class LoanHistory
 * @extends {React.Component}
 */
class LoanHistory extends React.Component {
  /**
   * Creates an instance of DisplayAllBorrowedBooks.
   * @param {any} props
   * @param {object} offset
   * @param {object} limit
   * @memberOf DisplayAllBorrowedBooks
   */
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      offset: 0,
    };
  }

  /**
   * @description dispatch actions that help populate the dashboard with loan history
   * fetch books for the dashboard
   * @method componentDidMount
   * @memberof DisplayLandingBooks
   * @returns {void}
   */
  componentDidMount() {
    $('body').css('background-color', '#ffff');
    this.props
      .loanhistory(this.state.offset, this.state.limit);
  }
  /**
   * render Loan History component
   * @method render
   * @member loanHistory
   * @returns {object} component
   */
  render() {
    if (!this.props.bookOperations) {
      return <Preloader size="big" className="center-align" />;
    }
    const { pagination } = this.props.bookOperations;
    const config = {
      items: pagination.pageCount,
      activePage: pagination.page
    };
    return (
      <div>
        <LoanHistoryTable books={this.props.bookOperations.books} />
        <PaginationWrapper
          config={config}
          fetch={this.props.loanhistory}
        />
      </div>
    );
  }
}

LoanHistory.propTypes = {
  bookOperations: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    map: PropTypes.object,
    pagination: PropTypes.object,
    books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      description: PropTypes.string,
    }))
  }),
  loanhistory: PropTypes.func.isRequired

};


LoanHistory.defaultProps = {
  bookOperations: null
};

const mapStateToProps = state => ({
  bookOperations: state.bookReducer.bookOperations
});

export default connect(mapStateToProps, { loanhistory })(LoanHistory);

