import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Icon, Autocomplete } from 'react-materialize';
import { searchAllBooks } from '../../../../actions/searchBooks';
import { fetchAllBooks } from '../../../../actions/fetchBooks';

/**
 *
 *
 * @class SearchBooks
 * @extends {React.Component}
 */
class SearchBooks extends React.Component {
  /**
   * Creates an instance of SearchBooks.
   *
   * @param {object} props
   *
   * @memberOf SearchBooks
   */
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      limit: 8,
      dataSource: {}
    };
    this.onChange = this.onChange.bind(this);
  }
  /**
   *
   * @param {object} event
   * @param {string} value
   * @returns {function} fetchBooks
   *
   * @memberOf SearchBooks
   */
  onChange(event, value) {
    if (value.length > 1) {
      this.props.searchAllBooks(value);
    } else {
      this.props.fetchAllBooks(this.state.offset, this.state.limit);
    }
  }
  /**
   * render Search page component
   * @method render
   * @member SearchBooks
   * @returns {object} component
   */
  render() {
    return (
      <Col s={12} m={8} l={4}>
        <div className="autocomplete">
          <Col s={2}>
            <div className="autocomplete-icon">
              <Icon medium>search
              </Icon>
            </div>
          </Col>
          <Col s={10}>
            <Autocomplete
              placeholder="Search....."
              data={this.state.dataSource}
              onChange={this.onChange}
            />
          </Col>
        </div>
      </Col>

    );
  }
}


export { SearchBooks };

SearchBooks.propTypes = {
  searchAllBooks: PropTypes.func,
  fetchAllBooks: PropTypes.func
};


export default connect(null, { fetchAllBooks, searchAllBooks })(SearchBooks);
