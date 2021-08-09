import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    //TODO: Ver dónde redirigir
    props.history.push('/shipping');
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Tu carrito</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            No tienes productos en tu carrito aún<Link to="/">Comprar</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map(item => (
              //TODO: product or id???
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.quantity}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value)),
                        )
                      }
                    >
                      {[...Array(item.stock).keys()].map(item => (
                        //FIXME: What if there are 1K kilos???
                        <option key={item + 1} value={item + 1}>
                          {item + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Total ({cartItems.length}{' '}
                {cartItems.length === 1 ? 'producto' : 'productos'}
                {') = '}
                {cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0,
                )}
                €
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Comprar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
