import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CheckoutItem from './checkout-item.component';

const DECREASE_CART_ITEM = gql`
  mutation DecreaseCartItem($item: Item!) {
    decreaseCartItem(item: $item) @client
  }
`;

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;


const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($item: Item!) {
    removeCartItem(item: $item) @client
  }
`;

const CheckoutItemContainer = ({addItemToCart, decreaseCartItem, removeCartItem, ...otherProps}) => (
  <CheckoutItem
    decreaseCartItem={ item => decreaseCartItem({variables : {item}}) }
    addItem={ item => addItemToCart({variables: {item}}) }
    removeCartItem={ item => removeCartItem({variables : {item}}) }
    {...otherProps}
  />
);

export default flowRight(
  graphql(ADD_ITEM_TO_CART, {name: 'addItemToCart'}),
  graphql(DECREASE_CART_ITEM, {name: 'decreaseCartItem'}),
  graphql(REMOVE_CART_ITEM, {name: 'removeCartItem'})
)(CheckoutItemContainer);