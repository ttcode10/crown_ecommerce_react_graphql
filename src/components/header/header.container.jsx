import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './header.component';

const GET_USER_PROPERTIES = gql`
  {
    cartHidden @client
    currentUser @client
  }
`;

const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart @client
  }
`;

const HeaderContainer = () => (
  <Query query={GET_USER_PROPERTIES}>
    {
      ({data: {cartHidden, currentUser}}) => (
        <Mutation mutation={CLEAR_CART}>
          {
            clearCart => <Header hidden={cartHidden} currentUser={currentUser} clearCart={clearCart}/>
          }
        </Mutation>
      )
    }
  </Query>
);

export default HeaderContainer