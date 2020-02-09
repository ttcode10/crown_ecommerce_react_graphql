import { gql } from 'apollo-boost';
import { addItemToCart, decreaseCartItem, getCartItemCount, getCartTotalAmount, removeCartItem } from './cart.utils';

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type DateTime {
    nanoseconds: Int!
    seconds: Int!
  }

  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    DecreaseCartItem(item: Item!): [Item]
    RemoveCartItem(item: Item!): [Item]
    SetCurrentUser(user: User!): User!
    ClearCart: [Item]
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_CART_ITEM_COUNT = gql`
  {
    cartItemCount @client
  }
`;

const GET_CART_TOTAL_AMOUNT = gql`
  {
    cartTotalAmount @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const updateCartItems = (cache, newCartItems) => {
  cache.writeQuery({
    query: GET_CART_ITEM_COUNT,
    data: {cartItemCount: getCartItemCount(newCartItems)}
  });

  cache.writeQuery({
    query: GET_CART_TOTAL_AMOUNT,
    data: {cartTotalAmount: getCartTotalAmount(newCartItems)}
  });

  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: {cartItems: newCartItems}
  });
}

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, {cache}) => {
      const {cartHidden} = cache.readQuery({
        query: GET_CART_HIDDEN
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: {cartHidden: !cartHidden}
      });

      return !cartHidden;
    },

    addItemToCart: (_root, {item}, {cache}) => {
      const {cartItems} = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = addItemToCart(cartItems, item);

      updateCartItems(cache, newCartItems);

      return newCartItems;
    },

    decreaseCartItem: (_root, {item}, {cache}) => {
      const {cartItems} = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = decreaseCartItem(cartItems, item);

      updateCartItems(cache, newCartItems);

      return newCartItems;
    },

    removeCartItem: (_root, {item}, {cache}) => {
      const {cartItems} = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = removeCartItem(cartItems, item);

      updateCartItems(cache, newCartItems);

      return newCartItems;
    },

    setCurrentUser: (_root, {user}, {cache}) => {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {currentUser: user}
      });

      return user;
    },

    clearCart: (_root, _args, {cache}) => {
      cache.writeQuery({
        query: GET_CART_ITEM_COUNT,
        data: {cartItemCount: 0}
      });

      cache.writeQuery({
        query: GET_CART_TOTAL_AMOUNT,
        data: {cartTotalAmount: 0}
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {cartItems: []}
      });

      return [];
    }
  }
};