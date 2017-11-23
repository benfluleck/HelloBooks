import React from 'react';
import { PropTypes } from 'prop-types';
import { Pagination, Row } from 'react-materialize';

class PaginationWrapper extends React.Component {
  pageLimit = (pagenumber, numberOfRecords) => {
    let pageOffset;
    pageOffset = (pagenumber === 1)
      ? 0
      : pagenumber - 1;
    return pageOffset * numberOfRecords;
  }

  onSelect = (number) => {
    const {numberOfRecords} = this.props;
    this
      .props
      .fetch(this.pageLimit(number, numberOfRecords), numberOfRecords);
  }

  render() {
    return (
      <Row>
        <Pagination onSelect={this.onSelect} {...this.props.config}  maxButtons= {5}/>
      </Row>
    )
  }
}

export default PaginationWrapper;

PaginationWrapper.defaultProps = {
  items: 0,
  activePage: 1
}

PaginationWrapper.proptypes = {
  items: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  maxButtons: PropTypes.number.isRequired
}
