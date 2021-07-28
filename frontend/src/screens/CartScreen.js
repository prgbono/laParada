import React from 'react';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  return (
    <>
      <h1>Mi carrito</h1>
      <p>
        Añadir al carrito : Producto: {productId}, Cantidad: {quantity}
      </p>
    </>
  );
}
