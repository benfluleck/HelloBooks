import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';
import getCategories from './getCategoriesWrapper.jsx';


/**
 *
 * @
 *
 * @class CategoriesOptions
 *
 * @extends {React.Component}
 */
class CategoriesOptions extends React.Component {
  /**
   * Creates an instance of CategoriesOptions.
   *
   * @param {object} props
   *
   * @memberOf CategoriesOptions
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: ''

    };
    // this.onChange = this.onChange.bind(this);
  }


  onChange = (event) => {
 
  }
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
        onChange={(event, value) => this.setState({ selectedCategory: value })}
        id="category"
        className="black-text"
        defaultValue={this.state.selectedCategory}
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

CategoriesOptions.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.object,
  })).isRequired,
  onChange: PropTypes.func
};

const CategoriesOptionsList = getCategories(CategoriesOptions);

export default CategoriesOptionsList;

