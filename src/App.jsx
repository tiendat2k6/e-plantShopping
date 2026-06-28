import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Greenery Meets Peace</p>
            <button className="get-started-btn" onClick={() => setShowProductList(true)}>
              Get Started
            </button>
          </div>
          <AboutUs />
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;
