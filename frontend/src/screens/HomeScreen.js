import React, { useEffect } from 'react';
import Product from './../components/Product.js';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions.js';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  
  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map(product => (
            <Product key={product.id} product={product}></Product>
          ))}
        </div>
      )}
    </>
  );
}
