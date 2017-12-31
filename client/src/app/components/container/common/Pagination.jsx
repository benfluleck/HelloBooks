import React from 'react';
import { PropTypes } from 'prop-types';
import { Pagination, Row } from 'react-materialize';

/**
 *
 *
 * @class PaginationWrapper
 * @extends {React.Component}
 */
class PaginationWrapper extends React.Component {
  /**
  * @param {number} number
  *
  * @memberOf PaginationWrapper
  * @returns {function} Function fetch
  */
  onSelect = (number) => {
    const { numberOfRecords } = this.props;
    this
      .props
      .fetch(this.pageLimit(number, numberOfRecords), numberOfRecords);
  }
  /**
   *
   * @param {number} pagenumber
   * @param {number} numberOfRecords
   * @returns {number} pageOffset * numberOfRecords
   *
   * @memberOf PaginationWrapper
   */
  pageLimit = (pagenumber, numberOfRecords) => {
    let pageOffset;
    pageOffset = (pagenumber === 1) ?
      0 :
      pagenumber - 1;
    return pageOffset * numberOfRecords;
  }
  /**
   * render Pagination Wrapper
   * @method render
   * @member Pagination
   * @returns {object} component
   */
  render() {
    return (
      <Row>
        <Pagination
          onSelect={this.onSelect}
          {...this.props.config}
          maxButtons={5}
        />
      </Row>
    );
  }
}

export default PaginationWrapper;

PaginationWrapper.defaultProps = {
  items: 0,
  activePage: 1,
  maxButtons: 5,
};

PaginationWrapper.propTypes = {
  items: PropTypes.number,
  activePage: PropTypes.number,
  maxButtons: PropTypes.number,
  fetch: PropTypes.func.isRequired,
  numberOfRecords: PropTypes.number.isRequired,
  config: PropTypes.object
};
