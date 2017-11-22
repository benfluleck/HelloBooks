import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loanhistory } from '../../../actions/loanhistory';
import { connect } from 'react-redux';
import { Pagination, Row ,Preloader } from 'react-materialize';
import PaginationWrapper from '../common/Pagination.jsx'
import LoanHistoryTable from '../../presentation/loanhistory/LoanHistoryTable.jsx';

/**
 * handles the state of the Loan history table
 * @class LoanHistory
 * @extends {React.Component}
 */
class LoanHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 3,
      offset: 0,
      isLoading: false
    };

  }

  componentDidMount(){
      this.props
      .loanhistory(this.state.offset, this.state.limit)
  }
  
  render(){
    if (!this.props.bookOperations) {
			return <Preloader size="big" className="center-align" />;
		}
    const { pagination } = this.props.bookOperations;
    const config = { items: pagination.pageCount, 
                    activePage: pagination.page
                  };
    return(
      <div>
        <LoanHistoryTable  books={ this.props.bookOperations.books }/> 
        <PaginationWrapper config={ config } 
                            numberOfRecords={ this.state.limit }
                            fetch={ this.props.loanhistory }/>
       </div>
    );
  }

}


LoanHistory.PropTypes = {
  bookOperations: PropTypes.array
 
};


LoanHistory.defaultProps = {
   bookOperations: null
};

const mapStateToProps = state => ({ 
  bookOperations : state.bookReducer.bookOperations 
});

export default connect(mapStateToProps, { loanhistory })(LoanHistory);

