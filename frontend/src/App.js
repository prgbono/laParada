import React from 'react';
import data from './data.js';
import Product from './components/Product.js';

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a href="/" className="brand">
            La Parada
          </a>
        </div>
        <div>
          <a href="/cart">Carrito</a>
          <a href="/signin">Sign In</a>
        </div>
      </header>
      <main>
        <div>
          <div className="row center">
            {data.products.map(product => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </div>
      </main>
      <footer className="row center">
        Mariscos La Parada SL / All right reserved
      </footer>
    </div>
  );
}

export default App;
