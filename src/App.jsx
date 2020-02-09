import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSessions } from './redux/user/user.action';

import './App.scss';
import { default as Header } from './components/header/header.container';
import HomePage from './pages/homepage/homepage.page';
import ShopPage from './pages/shop/shop.page';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.page';
import NoMatchPage from './pages/no-match/no-match.page';
import { default as CheckoutPage } from './pages/checkout/checkout.page.container';

const App = ({ checkUserSessions, currentUser }) => {
  useEffect(() => {
    checkUserSessions();
  }, [checkUserSessions]);

  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage />} />
        <Route component={NoMatchPage} />
      </Switch>
    </div>
  )

};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSessions: () => dispatch(checkUserSessions())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);