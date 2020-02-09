export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => (cartItem.id === cartItemToAdd.id)
  );

  if(existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
  }
  return [...cartItems, {...cartItemToAdd, quantity: 1}];
};


export const decreaseCartItem = (cartItems, cartItemToDecrease) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToDecrease.id
  );

  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToDecrease.id);
  }

  return cartItems.map(cartItem => 
    cartItem.id === cartItemToDecrease.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
  );
};

export const getCartTotalAmount = (cartItems) => {
  return cartItems.reduce((totals, cartItem) => totals + cartItem.quantity * cartItem.price, 0);
}

export const getCartItemCount = (cartItems) => {
  return cartItems.reduce((totals, cartItem) => totals + cartItem.quantity, 0);
}

export const removeCartItem = (cartItems, itemToRemove) => {
  return cartItems.filter(cartItem => (cartItem.id !== itemToRemove.id))
}
