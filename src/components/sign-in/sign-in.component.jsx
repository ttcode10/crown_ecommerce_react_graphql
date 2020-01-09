import React from 'react';

import './sign-in.styles.scss';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';
import { signInWithGoogle, auth } from './../../firebase/firebase.utils';

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  handelSubmit = async event => {
    event.preventDefault();
    const {email, password} = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email: '', password: ''});
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handelSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            required
            handleChange={this.handleChange}
            label='Email'
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            required
            handleChange={this.handleChange}
            label='Password'
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} google>Sign in with Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;