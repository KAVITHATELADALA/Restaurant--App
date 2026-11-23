import './index.css'

const FoodItem = props => {
  const {dish, quantity, incrementDish, decrementDish} = props

  const isAvailable = dish.dish_Availability

  const hasCustomizations =
    Array.isArray(dish.addonCat) && dish.addonCat.length > 0

  return (
    <article className="food-item">
      <div className="food-content">
        <div className="dish-title-container">
          <span
            className={`food-type ${dish.dish_Type === 1 ? 'non-veg' : 'veg'}`}
          >
            <span className="food-type-dot" />
          </span>

          <h3 className="dish-name">{dish.dish_name}</h3>
        </div>

        <p className="dish-price">
          {dish.dish_currency} {dish.dish_price}
        </p>

        <p className="dish-description">{dish.dish_description}</p>

        <p className="dish-calories">{dish.dish_calories} calories</p>

        {hasCustomizations && (
          <p className="customization-text">Customizations available</p>
        )}

        {!isAvailable && <p className="not-available">Not available</p>}

        {isAvailable && (
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-button"
              onClick={() => decrementDish(dish.dish_id)}
            >
              -
            </button>

            <p className="quantity">{quantity}</p>

            <button
              type="button"
              className="quantity-button"
              onClick={() => incrementDish(dish.dish_id)}
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="image-container">
        <img
          src={dish.dish_image}
          alt={dish.dish_name}
          className="dish-image"
        />
      </div>
    </article>
  )
}

export default FoodItem
