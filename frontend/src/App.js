import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from './actions/userActions.js';
import CartScreen from './screens/CartScreen.js';
import ShippingAddressScreen from './screens/ShippingAddressScreen.js';
import PaymentMethodScreen from './screens/PaymentMethodScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import OrderHistoryScreen from './screens/OrderHistoryScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import PrivateRoute from './components/PrivateRoute.js';

function App() {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  return (
    <Router>
      <div className="grid-container">
        <header className="header-fixed">
          <nav className="row">
            <ul>
              <Link className="brand" to="/">
                La Parada
              </Link>
            </ul>
            <ul>
              <Link to="/cart">
                Carrito
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Mi cuenta</Link>
                    </li>
                    <li>
                      <Link to="/order-history">Mis pedidos</Link>
                    </li>
                    <li>
                      <Link to="/login" onClick={signoutHandler}>
                        Salir
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">Entrar</Link>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/order-history" component={OrderHistoryScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">Mariscos La Parada SL</footer>
      </div>
    </Router>
  );
}

export default App;
