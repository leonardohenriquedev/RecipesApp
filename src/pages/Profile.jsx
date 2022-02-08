import React from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const { push } = useHistory();
  function redirectTo(route) {
    if (route === 'logout') {
      localStorage.clear();
      push('/');
    } else {
      push(route);
    }
  }
  return (
    <div>
      <Header title="Profile" searchBar={ false } />
      <p data-testid="profile-email">
        {localStorage.getItem('user')
          && JSON.parse(localStorage.getItem('user')).email}
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => redirectTo('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => redirectTo('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => redirectTo('logout') }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}
