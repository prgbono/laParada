import { CART_ADD_ITEM } from './../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedItem = action.payload;
      const isItemAlreadyInCart = state.cartItems.find(
        cartItem => cartItem.product === addedItem.product,
      );
      if (isItemAlreadyInCart) {
        //Replace the item in the cart with the new one
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
    default:
      return state;
  }
};
