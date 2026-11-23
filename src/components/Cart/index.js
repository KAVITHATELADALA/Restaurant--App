import './index.css'

const Cart = props => {
  const {cartCount} = props

  return (
    <div className="cart">
      <span className="cart-icon" role="img" aria-label="shopping cart">
        🛒
      </span>

      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </div>
  )
}

export default Cart
