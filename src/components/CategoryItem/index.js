import React from 'react'
import './index.css'

const CategoryItem = props => {
  const {dishDetails, cartItemQuantity, incrementCartItem, decrementCartItem} =
    props

  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_currency: dishCurrency,
    dish_description: dishDescription,
    dish_image: dishImage,
    dish_calories: dishCalories,
    dish_Availability: dishAvailability,
    addonCat,
  } = dishDetails

  const onIncrement = () => incrementCartItem(dishId)
  const onDecrement = () => decrementCartItem(dishId)

  const hasCustomizations = addonCat && addonCat.length > 0

  return (
    <li className="dish-item">
      <div className="dish-details-column">
        <h1 className="dish-name">{dishName}</h1>

        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>

        <p className="dish-description">{dishDescription}</p>

        <p className="dish-calories">{dishCalories} calories</p>

        {hasCustomizations && (
          <p className="addon-text">Customizations available</p>
        )}

        {dishAvailability ? (
          <div className="controller-container">
            <button type="button" className="button" onClick={onDecrement}>
              -
            </button>

            <p className="quantity">{cartItemQuantity}</p>

            <button type="button" className="button" onClick={onIncrement}>
              +
            </button>
          </div>
        ) : (
          <p className="not-availability-text">Not available</p>
        )}
      </div>

      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default CategoryItem
