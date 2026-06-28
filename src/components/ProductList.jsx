import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      { id: 1, name: "Snake Plant", cost: 15, image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939186_1280.jpg", description: "Produces oxygen at night." },
      { id: 2, name: "Spider Plant", cost: 12, image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde from the air." },
      { id: 3, name: "Peace Lily", cost: 18, image: "https://cdn.pixabay.com/photo/2019/06/25/11/59/flower-4298075_1280.jpg", description: "Cleanses air from harmful pollutants." },
      { id: 4, name: "Boston Fern", cost: 14, image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/fern-5114414_1280.jpg", description: "Adds natural humidity indoors." },
      { id: 5, name: "Aloe Vera", cost: 10, image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283204_1280.jpg", description: "Purifies air and heals skin." },
      { id: 6, name: "English Ivy", cost: 16, image: "https://cdn.pixabay.com/photo/2020/02/26/18/10/ivy-4882436_1280.jpg", description: "Reduces airborne mold particles." }
    ]
  },
  {
    category: "Aromatic Houseplants",
    plants: [
      { id: 7, name: "Lavender", cost: 22, image: "https://cdn.pixabay.com/photo/2015/07/02/10/40/lavender-828956_1280.jpg", description: "Calming scent that reduces stress." },
      { id: 8, name: "Mint", cost: 8, image: "https://cdn.pixabay.com/photo/2016/01/26/17/55/mint-1162875_1280.jpg", description: "Fresh aroma, great for tea." },
      { id: 9, name: "Rosemary", cost: 15, image: "https://cdn.pixabay.com/photo/2014/10/22/17/25/rosemary-498512_1280.jpg", description: "Invigorating herb fragrance." },
      { id: 10, name: "Jasmine", cost: 20, image: "https://cdn.pixabay.com/photo/2017/08/11/09/16/jasmine-2629705_1280.jpg", description: "Sweet scent that blooms at night." },
      { id: 11, name: "Sweet Basil", cost: 9, image: "https://cdn.pixabay.com/photo/2016/08/11/08/57/basil-1585095_1280.jpg", description: "Pleasant herbal fragrance." },
      { id: 12, name: "Lemon Balm", cost: 11, image: "https://cdn.pixabay.com/photo/2017/05/16/16/41/lemon-balm-2318285_1280.jpg", description: "Mild citrus scent for relaxation." }
    ]
  },
  {
    category: "Low Maintenance Plants",
    plants: [
      { id: 13, name: "Cast Iron Plant", cost: 25, image: "https://cdn.pixabay.com/photo/2014/12/21/23/34/cherry-576403_1280.jpg", description: "Extremely tough, survives dark corners." },
      { id: 14, name: "ZZ Plant", cost: 19, image: "https://cdn.pixabay.com/photo/2020/03/12/13/28/flowerpot-4925078_1280.jpg", description: "Thrives on neglect and low light." },
      { id: 15, name: "Pothos", cost: 12, image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816915_1280.jpg", description: "Fast growing trailing vine." },
      { id: 16, name: "Succulents", cost: 8, image: "https://cdn.pixabay.com/photo/2016/11/22/22/02/cactus-1850819_1280.jpg", description: "Stores water in leaves, needs minimal watering." },
      { id: 17, name: "Rubber Plant", cost: 21, image: "https://cdn.pixabay.com/photo/2020/02/13/05/53/indoor-plant-4844577_1280.jpg", description: "Glossy leaves, very drought tolerant." },
      { id: 18, name: "Chinese Evergreen", cost: 17, image: "https://cdn.pixabay.com/photo/2019/12/16/12/35/flower-4699313_1280.jpg", description: "Tolerates air conditioning and low light well." }
    ]
  }
];

function ProductList({ onHomeClick }) {
  const [view, setView] = useState('plants');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <div className="nav-logo" onClick={onHomeClick}>Paradise Nursery</div>
        <div className="nav-links">
          <span className="nav-link" onClick={onHomeClick}>Home</span>
          <span className="nav-link" onClick={() => setView('plants')}>Plants</span>
          <div className="nav-cart" onClick={() => setView('cart')}>
            <span className="cart-icon">🛒 Cart</span>
            {totalCartCount > 0 && <span className="cart-badge">{totalCartCount}</span>}
          </div>
        </div>
      </nav>

      {view === 'plants' ? (
        <div className="product-listing-page">
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="products-grid">
                {categoryObj.plants.map(plant => {
                  const isAlreadyInCart = cartItems.some(item => item.id === plant.id);
                  return (
                    <div key={plant.id} className="product-card">
                      <img src={plant.image} alt={plant.name} className="product-thumb" />
                      <h3 style={{ margin: '10px 0' }}>{plant.name}</h3>
                      <p className="product-desc">{plant.description}</p>
                      <p className="product-cost">${plant.cost}</p>
                      <button 
                        disabled={isAlreadyInCart} 
                        onClick={() => dispatch(addItem(plant))}
                        className="add-to-cart-btn"
                      >
                        {isAlreadyInCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setView('plants')} />
      )}
    </div>
  );
}

export default ProductList;
