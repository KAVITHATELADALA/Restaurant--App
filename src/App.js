import {Component} from 'react'
import RestaurantHeader from './components/RestaurantHeader'
import CategoryTabs from './components/CategoryTabs'
import CategoryItem from './components/CategoryItem'
import './App.css'

class App extends Component {
  state = {
    restaurantData: {},
    activeCategoryIndex: 0,
    cartItems: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error('Failed to fetch restaurant data')
      }

      const data = await response.json()
      console.log(data)
      const formattedData = Array.isArray(data) ? data[0] : data

      this.setState({
        restaurantData: formattedData || {},
        activeCategoryIndex: 0,
        isLoading: false,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({isLoading: false})
    }
  }

  changeCategory = index => {
    this.setState({activeCategoryIndex: index})
  }

  incrementCartItem = dishId => {
    this.setState(prevState => ({
      cartItems: {
        ...prevState.cartItems,
        [dishId]: (prevState.cartItems[dishId] || 0) + 1,
      },
    }))
  }

  decrementCartItem = dishId => {
    this.setState(prevState => {
      const cart = prevState.cartItems

      if (cart[dishId] > 0) {
        return {
          cartItems: {
            ...cart,
            [dishId]: cart[dishId] - 1,
          },
        }
      }

      return null
    })
  }

  getTotalCartCount = () => {
    const {cartItems} = this.state

    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0,
    )
  }

  render() {
    const {
      restaurantData,
      activeCategoryIndex,
      cartItems,
      isLoading,
    } = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <p>Loading...</p>
        </div>
      )
    }

    // Get categories directly from API response
    const tableMenuList = Array.isArray(restaurantData.table_menu_list)
      ? restaurantData.table_menu_list
      : []

    const activeCategoryMenu = tableMenuList[activeCategoryIndex] || {}

    const categoryDishes = activeCategoryMenu.category_dishes || []

    return (
      <div className="restaurant-app-container">
        <RestaurantHeader
          restaurantName={restaurantData.restaurant_name}
          cartCount={this.getTotalCartCount()}
        />

        {/* Generate tabs dynamically from API */}
        <CategoryTabs
          tableMenuList={tableMenuList}
          activeCategoryIndex={activeCategoryIndex}
          changeCategory={this.changeCategory}
        />

        <ul className="dishes-list">
          {categoryDishes.map(dish => (
            <CategoryItem
              key={dish.dish_id}
              dishDetails={dish}
              cartItemQuantity={cartItems[dish.dish_id] || 0}
              incrementCartItem={this.incrementCartItem}
              decrementCartItem={this.decrementCartItem}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
