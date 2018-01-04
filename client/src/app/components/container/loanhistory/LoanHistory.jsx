import React from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import PropTypes from 'prop-types';
import { loanHistoryAction } from '../../../actions/loanHistory';
import PaginationWrapper from '../common/Pagination';
import LoanHistoryTable
  from '../../presentation/loanhistory/LoanHistoryTable';

/**
 * handles the state of the Loan history table
 *
 * @class LoanHistory
 *
 * @extends {React.Component}
 */
class LoanHistory extends React.Component {
  /**
   * @description dispatch actions that help populated
   *
   * the dashboard with loan history
   *
   * @method componentDidMount
   *
   * @memberof DisplayLandingBooks
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props
      .loanHistoryAction(this.props.offset, this.props.limit);
  }
  /**
   * render Loan History component
   *
   * @method render
   *
   * @member loanHistory
   *
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
          fetch={this.props.loanHistoryAction}
          numberOfRecords={this.props.limit}
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
      description: PropTypes.string,
    }))
  }),
  loanHistoryAction: PropTypes.func.isRequired,
  limit: PropTypes.number,
  offset: PropTypes.number

};


LoanHistory.defaultProps = {
  bookOperations: null,
  limit: 5,
  offset: 0
};


const mapStateToProps = state => ({
  bookOperations: state.bookReducer.bookOperations
});

export default connect(mapStateToProps, { loanHistoryAction })(LoanHistory);

