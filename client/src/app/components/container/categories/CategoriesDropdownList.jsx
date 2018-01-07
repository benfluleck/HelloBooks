import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, NavItem, Button } from 'react-materialize';
import GetCategories from './GetCategoriesWrapper';


const CategoriesDropdown = (props) => {
  /**
 * @description CategoriesDropdown list display items for the drop down
 *
 * @returns {Component} Dropdown
 *
 * @memberOf CategoriesDropdown
 */
  const categoryNames = props.categories
    .map(category => (
      <NavItem
        key={category.id}
        href="#"
        onClick={() => props.onClick(category.id)}
      >
        <div className="black-text">
          {category.categoryName}
        </div>
      </NavItem>
    ));
  return (
    <div className="hide-on-large-only">
      <Dropdown trigger={
        <Button icon="arrow_drop_down">Categories</Button>
      }
      >
        <NavItem name="category" to="/dashboard"
          onClick={() => props.handleFetchAllBooks()}
          href="#">
          <div className="black-text">
          All Categories
          </div></NavItem>
        {[...categoryNames]}
      </Dropdown>
    </div>
  );
};

CategoriesDropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.object,
  })).isRequired,
  handleFetchAllBooks: PropTypes.func
};


const CategoriesDropdownList = GetCategories(CategoriesDropdown);

export { CategoriesDropdown };

export default CategoriesDropdownList;
