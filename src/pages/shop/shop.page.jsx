import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { default as CollectionOverview } from '../../components/collection-overview/collection-overview.container';
import { default as CollectionPage } from './../collection/collection.page.container';
import NoMatchPage from './../no-match/no-match.page';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Switch>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverview}
      />
      <Route
        path={`${match.path}/:collectionId`} 
        component={CollectionPage}
        />
      <Route component={NoMatchPage} />
    </Switch>
  </div>
);

export default ShopPage;
