import { CART_ADD_ITEM } from './../constants/cartConstants';
import Axios from 'axios';

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    const { name, description, stock, image, category, price } = data;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        //TODO: named as product instead of productId because is going to be saved in DB
        product: data._id,
        name,
        description,
        stock,
        image,
        category,
        price,
        quantity,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems),
    );
  };
