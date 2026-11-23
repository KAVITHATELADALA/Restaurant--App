import React from 'react'
import './index.css'

const CategoryTabs = ({
  tableMenuList = [],
  activeCategoryIndex,
  changeCategory,
}) => (
  <ul className="tabs-container">
    {tableMenuList.map((category, index) => (
      <li key={category.menu_category_id || index} className="tab-item">
        <button
          type="button"
          className={
            activeCategoryIndex === index ? 'active-tab-btn' : 'tab-btn'
          }
          onClick={() => changeCategory(index)}
        >
          {category.menu_category}
        </button>
      </li>
    ))}
  </ul>
)

export default CategoryTabs
