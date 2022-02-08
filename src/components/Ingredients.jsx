import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { fetchDrinks, fetchFoods } from '../services/fetchAPI';

export default function Ingredients({ foods }) {
  const [dataFoods, setFoods] = useState([]);
  const [dataDrinks, setDrinks] = useState([]);
  const { setRecipesByIngredients } = useContext(Context);

  async function fetchDataFoods() {
    const limit = 12;
    let newFoods = await fetchFoods('list.php?i=list');
    newFoods = newFoods.slice(0, limit);
    setFoods(newFoods);
  }

  async function fetchDataDrinks() {
    const limit = 12;
    let newDrinks = await fetchDrinks('list.php?i=list');
    newDrinks = newDrinks.slice(0, limit);
    setDrinks(newDrinks);
  }

  const { push } = useHistory();
  async function redirectTo(type, ingredient) {
    const limit = 12;

    if (type === 'food') {
      let byIngredients = await fetchFoods(`filter.php?i=${ingredient}`);
      byIngredients = byIngredients.slice(0, limit);
      setRecipesByIngredients(byIngredients);
      push('/foods');
    } else {
      let byIngredients = await fetchDrinks(`filter.php?i=${ingredient}`);
      byIngredients = byIngredients.slice(0, limit);
      setRecipesByIngredients(byIngredients);
      push('/drinks');
    }
  }

  useEffect(() => {
    if (foods) {
      fetchDataFoods();
    } else fetchDataDrinks();
  }, [foods]);

  return (
    <div>
      {dataFoods.length > 0
        && dataFoods.map((food, index) => (
          <div
            role="presentation"
            key={ food.strIngredient }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => redirectTo('food', food.strIngredient) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png` }
              alt={ food.strIngredient }
            />
            <p data-testid={ `${index}-card-name` }>{food.strIngredient}</p>
          </div>
        ))}
      {dataDrinks.length > 0
        && dataDrinks.map((drink, index) => (
          <div
            role="presentation"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => redirectTo('drink', drink.strIngredient1) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
              alt={ drink.strIngredient1 }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strIngredient1}</p>
          </div>
        ))}
    </div>
  );
}

Ingredients.propTypes = {
  drinks: PropTypes.any,
  foods: PropTypes.any,
}.isRequired;
