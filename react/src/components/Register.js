import React from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export function Register({
  onSetEmail,
  onSetPassword,
  onRegister,
  message,
  email,
  password,
}) {
  return (
    <>
      <Header headerlogout='header__container_log-out'>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              paddingLeft: 24,
            }}
            to='/login'
          >
            Log In
          </Link>
        </div>
      </Header>
      <div className={"sign-in__container"}>
        <div className='modal__container'>
          
          <form
            onSubmit={onRegister}
            action='#'
            className={`form form_sign_up }`}
            name='register'
            noValidate
          >
            <h2 className='form__title form__title_sign_up'>Sign Up</h2>
            <span style={{color:"red"}}>{message}</span>
            <input
              id='email-input'
              minLength='2'
              maxLength='40'
              name='email'
              type='text'
              className='form__input form__input_sign_up form__input_type_email'
              placeholder='Email'
              required
              value={email}
              onChange={onSetEmail}
            />

            <input
              id='password-input'
              minLength='2'
              maxLength='200'
              name='password'
              type='password'
              className='form__input form__input_sign_up form__input_type_password'
              placeholder='Password'
              required
              value={password}
              onChange={onSetPassword}
            />

            <button
              type='submit'
              className={`form__button form__button_sign_up register-submit `}
            >
              Sign up
            </button>

            <Link
              style={{
                textDecoration: "none",
                margin: 20,
                textAlign: "center",
              }}
              to='/login'
              type='submit'
              className={`form__button form__button_member_log_in form__button_sign_up `}
            >
              Already a member? Log in here!
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
