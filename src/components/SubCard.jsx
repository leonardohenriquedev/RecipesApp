import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinks, fetchFoods } from '../services/fetchAPI';

import '../styles/SubCard.css';

const LIMIT = 6;
const LINK = 'search.php?s=';

export default function SubCard({ type }) {
  const history = useHistory();

  // const { dataFoods, dataDrinks } = useContext(Context);
  const [dataFoods, setDataFoods] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);

  async function fetchDataFoods() {
    let foods = await fetchFoods(LINK);
    foods = foods.slice(0, LIMIT);
    setDataFoods(foods);
  }

  async function fetchDataDrinks() {
    let drinks = await fetchDrinks(LINK);
    drinks = drinks.slice(0, LIMIT);
    setDataDrinks(drinks);
  }

  useEffect(() => {
    fetchDataFoods();
    fetchDataDrinks();
  }, []);

  function redirectTo(route) {
    if (type === 'foods') {
      history.push(`/foods/${route}`);
    } else history.push(`/drinks/${route}`);
  }

  return (
    <div className="div-recommended">
      {type === 'foods'
        ? dataFoods.map((food, index) => (
          <div
            key={ food.idMeal }
            role="presentation"
            className="recommended"
            data-testid={ `${index}-recomendation-card` }
            onClick={ () => redirectTo(food.idMeal) }
            onKeyDown={ () => redirectTo(food.idMeal) }
          >
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
              className="img-recommended"
            />
            <h5>{food.strCategory}</h5>
            <h4 data-testid={ `${index}-recomendation-title` }>{food.strMeal}</h4>
          </div>
        ))
        : dataDrinks.map((drink, index) => (
          <div
            key={ drink.idDrink }
            role="presentation"
            className="recommended"
            data-testid={ `${index}-recomendation-card` }
            onClick={ () => redirectTo(drink.idDrink) }
            onKeyDown={ () => redirectTo(drink.idDrink) }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              className="img-recommended"
            />
            <h5>{drink.strCategory}</h5>
            <h4 data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</h4>
          </div>
        ))}
    </div>
  );
}

SubCard.propTypes = {
  type: PropTypes.string,
}.isRequired;
