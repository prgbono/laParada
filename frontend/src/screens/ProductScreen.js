import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions.js';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Volver a resultados</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>Precio: {product.price}</li>
                <li>Categoría: {product.category}</li>
                <li>Descripción: {product.description}</li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div className="price">{product.price}€</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        {product.stock <= 0 ? (
                          <span className="danger">No disponible</span>
                        ) : product.stock <= product.stockLimit ? (
                          <span className="warning">
                            Quedan pocas existencias de este producto
                          </span>
                        ) : (
                          <span className="success">Disponible</span>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <button className="primary block">Añadir al carrito</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
