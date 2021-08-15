import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './../components/CheckoutSteps';
import { saveShippingAddress } from './../actions/cartActions';

export default function ShippingAddressScreen(props) {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = event => {
    event.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country }),
    );
    props.history.push('/payment');
  };
  return (
    <>
      <CheckoutSteps step1></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Dirección de envío</h1>
        </div>
        <div>
          <label htmlFor="fullName">Nombre completo</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName.replace(/(<([^>]+)>)/gi, '')}
            onChange={e => setFullName(e.target.value)}
            placeholder="nombre completo"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address.replace(/(<([^>]+)>)/gi, '')}
            onChange={e => setAddress(e.target.value)}
            placeholder="dirección"
            required
          />
        </div>
        <div>
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city.replace(/(<([^>]+)>)/gi, '')}
            onChange={e => setCity(e.target.value)}
            placeholder="ciudad"
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Código postal</label>
          <input
            type="number"
            id="postalCode"
            name="postalCode"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            placeholder="cód postal"
            required
          />
        </div>
        <div>
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country.replace(/(<([^>]+)>)/gi, '')}
            onChange={e => setCountry(e.target.value)}
            placeholder="país"
            required
          />
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
