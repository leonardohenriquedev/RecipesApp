import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const BUTTON_LOGIN = 'login-submit-btn';

describe('Verifica inputs da pagina de Login', () => {
  test('Verifica a existencia do input de email', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const emailInput = getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
  });

  test('Verifica a existencia do input de senha', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const passwordInput = getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  test('Verifica a existencia do botão', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const btnLogin = getByTestId(BUTTON_LOGIN);
    expect(btnLogin).toBeInTheDocument();
  });

  test(
    'Verifica se o botão só é habilitado depois de digitar um email e senha valida',
    () => {
      const { getByTestId } = renderWithRouter(<App />);

      const emailInput = getByTestId(EMAIL_INPUT);
      const passwordInput = getByTestId(PASSWORD_INPUT);
      const btnLogin = getByTestId(BUTTON_LOGIN);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(btnLogin).toBeInTheDocument();

      expect(btnLogin).toBeDisabled();
      userEvent.type(emailInput, 'tester@gmail.com');
      userEvent.type(passwordInput, '1234567');
      expect(btnLogin).toBeEnabled();
    },
  );

  test(
    'Verifica se ao clicar no botão o usuario é redirecionado para pagina de comidas',
    () => {
      const { history, getByTestId } = renderWithRouter(<App />);

      const emailInput = getByTestId(EMAIL_INPUT);
      const passwordInput = getByTestId(PASSWORD_INPUT);
      const btnLogin = getByTestId(BUTTON_LOGIN);

      expect(btnLogin).toBeDisabled();
      userEvent.type(emailInput, 'tester@gmail.com');
      userEvent.type(passwordInput, '1234567');
      expect(btnLogin).toBeEnabled();
      userEvent.click(btnLogin);

      const {
        location: { pathname },
      } = history;

      expect(pathname).toBe('/foods');
    },
  );
});
