import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './../components/Product.js';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      // TODO: env variable BASE_URL
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div>
      <div className="row center">
        {products.map(product => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
}
