import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './../components/Product.js';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        // TODO: env variable BASE_URL
        // Wrap async-await for using it into useEffect
        const { data } = await axios.get('/api/products');
        setLoading(false);
        setProducts(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      //TODO: finally and remove one setLoading(false)
    };
    getProducts();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map(product => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </>
  );
}
