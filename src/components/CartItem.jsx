import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/CartSlice';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="product-listing-page" style={{ padding: '30px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>Shopping Cart</h2>
        <h3 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>
          Total Cart Amount: ${calculateTotalAmount()}
        </h3>
        
        <div className="cart-items-list" style={{ margin: '30px 0' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item-card" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '15px 0', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} className="cart-item-thumb" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', marginRight: '20px' }} />
                <div className="cart-item-details" style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                  <p style={{ margin: '5px 0', color: '#555' }}>Unit Price: ${item.cost}</p>
                  <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#2e7d32' }}>Subtotal: ${item.cost * item.quantity}</p>
                  
                  <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <button style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleDecrement(item)}>-</button>
                    <span className="quantity-value" style={{ margin: '0 15px', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  
                  <button className="delete-btn" style={{ backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => dispatch(removeItem(item.id))}>
                    Delete Item
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button className="continue-shopping-btn" style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-btn" style={{ backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} onClick={handleCheckout}>
            Checkout (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
