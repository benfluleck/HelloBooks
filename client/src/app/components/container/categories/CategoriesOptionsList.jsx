import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';


/**
 *
 *
 *
 * @class CategoriesOptions
 *
 * @extends {React.Component}
 */
class CategoriesOptions extends React.PureComponent {
  /**
   *
   *
   * @returns {component} CategoryName
   *
   * @memberof CategoriesOptions
   *
   *
   * @memberOf CategoriesOptions
   */
  render() {
    const categoryNames = this.props.categories
      .map(category => (
        <option
          key={category.id}
          value={category.id}
          className="black-text"

        >
          {category.categoryName}
        </option>
      ));
    return (
      <Input
        s={6}
        type="select"
        name="categoryId"
        value={this.props.categoryId}
        onChange={this.props.onChange}
        className="black-text"
      >
        <option
          value=""
          label="Choose Category"
        >
      Choose a Category
        </option>
        {[...categoryNames]}
      </Input>
    );
  }
}

CategoriesOptions.defaultProps = {
  categoryId: ''
};

CategoriesOptions.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.object,
  })).isRequired,
  categoryId: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const mapStateToProps = ({ categoryReducer }) => (
  {
    categories: categoryReducer.categoryList
  });


export default connect(mapStateToProps, null)(CategoriesOptions);
