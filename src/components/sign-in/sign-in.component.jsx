import React from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from './../../redux/user/user.action';

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
    const { email, password } = this.state;
    const { emailSignInStart } = this.props;
    emailSignInStart(email, password);
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { googleSignInStart } = this.props;
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
            <CustomButton type='button' onClick={googleSignInStart} google>Sign in with Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});
export default connect(null, mapDispatchToProps)(SignIn);