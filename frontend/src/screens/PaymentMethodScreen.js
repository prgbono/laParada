import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from './../actions/cartActions';

export default function PaymentMethodScreen(props) {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  // No shipping address then go back to fill it before payment details
  if (!shippingAddress.address) {
    props.history.push('/checkout/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Forma de Pago</h1>
        </div>
        <div>
          {/* // TODO: Card payment method! */}
          <div>
            <input
              type="radio"
              id="paypal"
              value="Paypal"
              name="paymentMethod"
              checked
              required
              onChange={e => {
                setPaymentMethod(e.target.value);
              }}
            ></input>
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={e => {
                setPaymentMethod(e.target.value);
              }}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continuar
          </button>
        </div>
      </form>
    </>
  );
}
