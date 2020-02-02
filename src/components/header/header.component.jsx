import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from './../../redux/cart/cart.selector';
import { selectCurrentUser } from './../../redux/user/user.selector';
import { signOutStart } from './../../redux/user/user.action';

import './header.styles.scss';
import { ReactComponent as Logo } from './../../assets/crown.svg';
import CartIcon from './../cart-icon/cart-icon.component';
import CartDropdown from './../cart-dropdown/cart-dropdown.component';

const Header = ({currentUser, hidden, signOutStart}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>SHOP</Link>
      {currentUser ? (
        <div className='option' onClick={signOutStart}>SIGN OUT ({currentUser.email})</div>
      ) : (<Link className='option' to='/signin'>SIGN IN</Link>)}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
