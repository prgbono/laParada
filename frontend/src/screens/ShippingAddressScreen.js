import React, { useState } from 'react';
import CheckoutSteps from './../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    // TODO: dispatch ADD_BUYER_ADDRESS
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
            value={fullName}
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
            value={address}
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
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="ciudad"
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Código postal</label>
          <input
            type="text"
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
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder="país"
            required
          />
        </div>
        <div>
          <label />
          <button type="submit">Continuar</button>
        </div>
      </form>
    </>
  );
}
