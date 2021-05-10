import React from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export function LogIn({
  message,
  email,
  onSetEmail,
  password,
  onSetPassword,
  onLogin,
  onInfoToolTip,
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
            to='/register'
          >
            Sign Up
          </Link>
        </div>
      </Header>
      <div className={"sign-in__container"}>
        <div className='modal__container'>
          <p>{message}</p>
          <form
            onSubmit={onLogin}
            action='#'
            className={`form form_sign_up
           }`}
            name='login'
            noValidate
          >
            <h2 className='form__title form__title_sign_up'>Log In</h2>
            <input
              value={email}
              onChange={onSetEmail}
              id='email-input'
              minLength='2'
              maxLength='200'
              type='text'
              name='email'
              className='form__input form__input_sign_up form__input_type_email'
              placeholder='Email'
              required
            />
            <input
              value={password}
              onChange={onSetPassword}
              id='password-input'
              minLength='2'
              maxLength='200'
              type='password'
              name='password'
              className='form__input form__input_sign_up form__input_type_job'
              placeholder='Password'
              required
              typeof='password'
            />
            <button
              type='submit'
              className={`form__button form__button_sign_up `}
            >
              Log in
            </button>
            <Link
              style={{
                textDecoration: "none",
                margin: 20,
                textAlign: "center",
              }}
              to='/register'
              type='submit'
              className={`form__button form__button_member_log_in form__button_sign_up `}
            >
              Not a member yet? Sign up here!
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
