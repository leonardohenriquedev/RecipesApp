import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function Login() {
  const { setEmail, setPassword, email } = useContext(Context);
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();

  function handleEmail(value) {
    if (value.includes('@') && value.includes('.com')) {
      setEmailIsValid(true);
      setEmail(value);
    } else setEmailIsValid(false);
  }

  function handlePassword(value) {
    const passwordValidation = 6;
    if (value.length > passwordValidation) {
      setPasswordIsValid(true);
      setPassword(value);
    } else setPasswordIsValid(false);
  }

  const { push } = useHistory();
  function handleClick() {
    push('/foods');

    const emailObject = {
      email,
    };

    const myJSON = JSON.stringify(emailObject);

    localStorage.setItem('user', myJSON);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  }

  return (
    <div className="login-box">
      <h1>Login</h1>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          placeholder="email"
          autoComplete="off"
          onChange={ (e) => handleEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          placeholder="password"
          autoComplete="off"
          onChange={ (e) => handlePassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !(emailIsValid && passwordIsValid) }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.any,
}.isRequired;
