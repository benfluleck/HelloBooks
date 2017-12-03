import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, NavItem, Button } from 'react-materialize';


const CategoriesDropdown = (props) => {
  /**
 *
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
        {[...categoryNames]}
      </Dropdown>
    </div>
  );
};

CategoriesDropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.object,
  })).isRequired
};

export default CategoriesDropdown;
