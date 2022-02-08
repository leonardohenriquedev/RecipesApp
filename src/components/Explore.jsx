import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFoods, fetchDrinks } from '../services/fetchAPI';

export default function Explore({ drinks, foods }) {
  const { push } = useHistory();
  async function redirectTo(route) {
    if (route === 'surprise') {
      if (foods) {
        const random = await fetchFoods('random.php');
        const id = random[0].idMeal;
        push(`/foods/${id}`);
      } else {
        const random = await fetchDrinks('random.php');
        const id = random[0].idDrink;
        push(`/drinks/${id}`);
      }
    } else if (foods) {
      push(`/explore/foods${route}`);
    } else push(`/explore/drinks${route}`);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => redirectTo('/ingredients') }
      >
        By Ingredient
      </button>
      {!drinks && (
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => redirectTo('/nationalities') }
        >
          By Nationality
        </button>
      )}

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => redirectTo('surprise') }
      >
        Surprise me!
      </button>
    </div>
  );
}

Explore.propTypes = {
  drinks: PropTypes.any,
  foods: PropTypes.any,
}.isRequired;
