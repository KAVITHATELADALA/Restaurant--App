import './index.css'

const RestaurantHeader = props => {
  const {restaurantName, cartCount} = props

  return (
    <header className="restaurant-header">
      <div className="header-container">
        <h1 className="restaurant-name">{restaurantName}</h1>

        <div className="header-right">
          <p className="my-orders">My Orders</p>

          <div className="cart-container">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default RestaurantHeader
