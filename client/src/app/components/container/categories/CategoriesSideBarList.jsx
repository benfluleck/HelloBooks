import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import GetCategories from './GetCategoriesWrapper';

/**
 *
 *
 * @param {object} props
 * @returns {component} Collapsible
 */
export const CategoriesSideBar = (props) => {
  const categoryNames = props.categories
    .map(category => (
      <Link
        key={category.id}
        to="#"
        name="category"
        className="category-button"
        onClick={() => props.onClick(category.id)}
      >
        <div className="black-text category-name" tabIndex="-1">
          {category.categoryName}
        </div>
      </Link>
    ));
  return (
    <Collapsible accordion>
      <CollapsibleItem
        header="All Categories"
        icon="arrow_drop_down"
        className="collapsible"
      >
        {[...categoryNames]}
      </CollapsibleItem>
    </Collapsible>
  );
};


CategoriesSideBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.object
  }))
};

const CategoriesSideBarList = GetCategories(CategoriesSideBar);

export default CategoriesSideBarList;
