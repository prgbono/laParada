import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';

function App() {
  return (
    <div className="grid-container">
      <Router>
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
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          Mariscos La Parada SL / All right reserved
        </footer>
      </Router>
    </div>
  );
}

export default App;
