import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import MessageBox from '../components/MessageBox.js';
import LoadingBox from '../components/LoadingBox.js';
import { ORDER_PAY_RESET } from './../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [paypalSdkReady, setPaypalSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const orderPay = useSelector(state => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await Axios.get(`/api/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=EUR`;
      script.async = true;
      script.onload = () => setPaypalSdkReady(true);
      document.body.appendChild(script);
    };
    // Paypal. Get clientID and create script for loading Paypal when its SDK is ready
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setPaypalSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, paypalSdkReady, successPay]);

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <h1>Pedido número {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Dirección de envío:</h2>
                <p>
                  {order.shippingAddress.fullName}
                  <br />
                  {`${order.shippingAddress.address}. ${order.shippingAddress.city}, CP ${order.shippingAddress.postalCode}. ${order.shippingAddress.country}`}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Entregado el {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">No entregado</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pago:</h2>
                <p>
                  <strong>Forma de pago: {order.paymentMethod}</strong>
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Pagado el {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">No pagado</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Productos:</h2>
                <ul>
                  {order.orderItems.map(item => (
                    <li key={item.product}>
                      <div className="row">
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {`${item.quantity}Kg x ${item.price}€ = ${(
                            item.price * item.quantity
                          ).toFixed(2)}€`}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
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
                  <div>{order.itemsPrice.toFixed(2)}€</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Envío</div>
                  <div>{order.shippingPrice.toFixed(2)}€</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>IVA (21%)</div>
                  <div>{order.taxPrice.toFixed(2)}€</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice.toFixed(2)}€</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!paypalSdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox />}
                      <PayPalButton
                        amount={order.totalPrice.toFixed(2)}
                        options={{ currency: 'EUR' }}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
