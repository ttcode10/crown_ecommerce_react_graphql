import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CheckoutPage from './checkout.page'

const GET_CART_ITEMS_AND_TOTAL = gql`
  {
    cartItems @client
    cartTotalAmount @client
  }
`;

const CheckoutPageContainer = props => (
  <Query query={GET_CART_ITEMS_AND_TOTAL}>
    {
      ({ data: {cartItems, cartTotalAmount}}) => <CheckoutPage {...props} cartItems={cartItems} cartTotals={cartTotalAmount}/>
    }
  </Query>
);

export default CheckoutPageContainer;