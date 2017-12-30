import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import { fetchBooksForCategories } from '../../../actions/fetchCategories';


/**
 * @class getCategoriesWrapper
 *
 * @extends {React.Component}
 */
export class GetCategories extends React.Component {
  /**
   * Creates an instance of GetCategories.
   *
   * @param {object} props
   *
   * @memberOf Categories
   */
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '',
      limit: 8,
      offset: 0
    };
    this.handleClick = this
      .handleClick
      .bind(this);
  }

  /**
   * @param {object} id
   *
   * @returns {object} state
   *
   * @memberOf GetCategories
   */
  handleClick(id) {
    this.setState({
      categoryId: id
    }, () => {
      this
        .props
        .fetchBooksForCategories(
          this.state.categoryId,
          this.state.offset,
          this.state.limit
        );
    });
  }
  /**
   * render getCategories Wrapper
   *
   * @method render
   *
   * @returns {Component} Collapsible
   *
   * @memberOf GetCategories
   */
  render() {
    if (!this.props.categoryList) {
      return <Preloader size="big" className="center-align" />;
    }
    const WrappedComponent = this.props.wrappedComponent;
    return (<WrappedComponent
      onChange={this.props.onChange}
      onClick={this.handleClick}
      categories={this.props.categoryList}
    />);
  }
}

GetCategories.propTypes = {
  categoryList: PropTypes
    .arrayOf(PropTypes.shape({ key: PropTypes.number })),
  fetchBooksForCategories: PropTypes.func,
  onChange: PropTypes.func,
  wrappedComponent: PropTypes.func,
};

GetCategories.defaultProps = {
  fetchBooksForCategories: null,
  onChange: null,
  categoryList: []
};

const GetCategoriesWrapper = (WrappedComponent) => {
  const mapStateToProps = ({
    categoryReducer
  }) => ({
    categoryList: categoryReducer.categoryList,
    wrappedComponent: WrappedComponent
  });

  return connect(
    mapStateToProps,
    { fetchBooksForCategories }
  )(GetCategories);
};

export default GetCategoriesWrapper;
