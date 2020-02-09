import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from './../../firebase/firebase.utils';

import './header.styles.scss';
import { ReactComponent as Logo } from './../../assets/crown.svg';
import { default as CartIcon } from './../cart-icon/cart-icon.container';
import { default as CartDropdown} from './../cart-dropdown/cart-dropdown.container';

const Header = ({currentUser, hidden, clearCart}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>SHOP</Link>
      {currentUser ? (
        <div className='option' onClick={() => {auth.signOut(); clearCart()}}>SIGN OUT ({currentUser.email})</div>
      ) : (<Link className='option' to='/signin'>SIGN IN</Link>)}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

export default Header;
