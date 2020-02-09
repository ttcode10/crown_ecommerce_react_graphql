import React from 'react';
import { withRouter } from 'react-router-dom';

import './cart-dropdown.styles.scss';
import CartItem from './../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

const CartDropdown = ({cartItems, history, toggleCartHidden}) => (
  <div className='cart-dropdown'>
    {(cartItems.length > 0) ? (
        <div className='cart-items-container'>
          <div className='cart-items'>
            { cartItems.map(cartItem => (<CartItem key={cartItem.id} cartItem={cartItem} />)) }
          </div>
          <CustomButton
            onClick={() => {
              history.push('/checkout');
              toggleCartHidden();
            }}
          >
            GO TO CHECKOUT
          </CustomButton>
        </div>
      ) : (
        <span className='error-message'> Your cart is empty </span>
      )
    }
  </div>
);

export default withRouter(CartDropdown);