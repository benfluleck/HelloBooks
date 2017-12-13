import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';
import getCategories from './getCategoriesWrapper.jsx';


const CategoriesOptions = (props) => {
  const categoryNames = props.categories
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
      onChange={props.onChange}
      id="category"
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
};

CategoriesOptions.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.object,
  })).isRequired,
  onChange: PropTypes.func.isRequired
};

const CategoriesOptionsList = getCategories(CategoriesOptions);

export default CategoriesOptionsList;
