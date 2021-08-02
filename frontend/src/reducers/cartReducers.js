import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from './../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedItem = action.payload;
      const isItemAlreadyInCart = state.cartItems.find(
        cartItem => cartItem.product === addedItem.product,
      );
      if (isItemAlreadyInCart) {
        //Replace the item in the cart with the new one (maybe other quantity)
        return {
          ...state,
          cartItems: state.cartItems.map(cartItem =>
            cartItem.product === isItemAlreadyInCart.product
              ? addedItem
              : cartItem,
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, addedItem] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product !== action.payload,
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
