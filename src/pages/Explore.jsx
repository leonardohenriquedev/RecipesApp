import React from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  const { push } = useHistory();
  function redirectTo(route) {
    push(route);
  }

  return (
    <div>
      <Header title="Explore" searchBar={ false } />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => redirectTo('explore/foods') }
      >
        Explore Foods
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => redirectTo('explore/drinks') }
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}
