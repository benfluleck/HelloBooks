import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/**
 *
 * @description Displays Category option list
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

      <div className="col s6 push-s4">
        <label>Category Name</label>
        <br/>
        <select className="browser-default"
          onChange={this.props.onChange}
          value={this.props.categoryId}>
          <option
            value=""
            label="Choose Category"
            defaultValue
          >
          Choose a Category
          </option>
          {[...categoryNames]}
        </select>

      </div>
    );
  }
}


CategoriesOptions.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.object
  })),
  onChange: PropTypes.func,
  categoryId: PropTypes.number
};

export { CategoriesOptions };

const mapStateToProps = ({ categoryReducer }) => (
  {
    categories: categoryReducer.categoryList
  });


export default connect(mapStateToProps, null)(CategoriesOptions);
