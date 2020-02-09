import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { default as App } from './app/App.container';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { resolvers, typeDefs } from './graphql/resolvers';
import INITIAL_DATA from './graphql/initial-data';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

client.writeData({
  data: INITIAL_DATA
})

ReactDOM.render(
  <ApolloProvider client={client}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
