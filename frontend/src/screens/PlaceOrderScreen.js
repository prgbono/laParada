import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import MessageBox from './../components/MessageBox.js';
import LoadingBox from './../components/LoadingBox.js';

export default function PlaceOrderScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  if (!cart.paymentMethod) props.history.push('/payment');

  const toPrice = num => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, error, success, order } = orderCreate;

  // TODO: calculate shippingPrice based on weight of the order (kgs)!
  cart.shippingPrice = cart.itemsPrice > 60 ? 0 : 10;
  cart.taxPrice = (cart.itemsPrice * 0.21).toFixed(2);
  cart.totalPrice = parseFloat(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice,
  ).toFixed(2);

  const placeOrderHandler = () => {
    // Add user to the order if loggedIn
    const user = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems, user }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Dirección de envío:</h2>
                <p>
                  {cart.shippingAddress.fullName}
                  <br />
                  {`${cart.shippingAddress.address}. ${cart.shippingAddress.city}, CP ${cart.shippingAddress.postalCode}. ${cart.shippingAddress.country}`}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Productos:</h2>
                <ul>
                  {cart.cartItems.map(item => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <Link to={`/product/${item.product}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                          </Link>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {`${item.quantity}Kg x ${item.price}€ = ${toPrice(
                            item.price * item.quantity,
                          )}€`}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Forma de pago:</h2>
                {cart.paymentMethod}
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Totales</h2>
              </li>
              <li>
                <div className="row">
                  <div>Subtotal</div>
                  <div>{cart.itemsPrice.toFixed(2)}€</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Envío</div>
                  <div>{cart.shippingPrice.toFixed(2)}€</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>IVA (21%)</div>
                  <div>{cart.taxPrice}€</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>{cart.totalPrice}€</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Pago
                </button>
              </li>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger"></MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
