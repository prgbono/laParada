import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from './../constants/cartConstants';
import Axios from 'axios';

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    const { name, description, stock, image, category, price } = data;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
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

export const removeFromCart = productId => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = data => dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
};
