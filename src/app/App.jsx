import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './../firebase/firebase.utils';

import './App.scss';
import { default as Header } from './../components/header/header.container';
import HomePage from './../pages/homepage/homepage.page';
import ShopPage from './../pages/shop/shop.page';
import SignInAndSignUpPage from './../pages/sign-in-and-sign-up/sign-in-and-sign-up.page';
import NoMatchPage from './../pages/no-match/no-match.page';
import { default as CheckoutPage } from './../pages/checkout/checkout.page.container';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage />} />
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    )
  }

}

export default App;