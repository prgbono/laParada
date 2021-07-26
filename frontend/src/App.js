import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function App() {
  const { userInfo } = useSelector(state => state.userLogin);

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <a href="/" className="brand">
              La Parada
            </a>
          </div>
          <div>
            <Link to="/cart">Carrito</Link>
            {userInfo ? (
              <Link to="#">{userInfo.name}</Link>
            ) : (
              <Link to="/login">Entrar</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">Mariscos La Parada SL</footer>
      </div>
    </Router>
  );
}

export default App;
