import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { fetchFoods } from '../services/fetchAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/recipeProgress.css';

export default function FoodsProgress() {
  const [foodState, setFoodsState] = useState('');
  const [favorite, setFavorite] = useState(false);
  // const [doneIngredients, setDoneIngredients] = useState([]);
  // const [btnDisabled, setBtnDisabled] = useState(true);
  const { push } = useHistory();

  // const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  // const getStorage = (key) => JSON.parse(localStorage.getItem(key));

  const { pathname } = useLocation();
  const ID = pathname.split('/')[2];

  useEffect(() => {
    async function fetchFoodstate() {
      const details = await fetchFoods(`lookup.php?i=${ID}`);
      setFoodsState(details[0]);
    }
    fetchFoodstate();

    // const storage = getStorage('inProgressRecipes');
    // if (!storage) {
    //   setStorage('inProgressRecipes', {
    //     ...storage,
    //     meals: {},
    //     cocktails: {},
    //   });
    // }
    // setDoneIngredients(storage.meals[ID]);
  }, [ID]);

  let foodsIngredients = [];
  let ingredientsMeasure = [];

  if (foodState) {
    foodsIngredients = Object
      .entries(foodState)
      .filter((ingredient) => (
        ingredient[0].includes('strIngredient')
        && ingredient[1] !== null && ingredient[1] !== ''));

    ingredientsMeasure = Object
      .entries(foodState)
      .filter((measure) => (
        measure[0].includes('strMeasure') && (measure[1] !== null) && measure[1] !== ''));
  }

  const handleFavoriteBtn = () => {
    if (favorite) {
      setFavorite(false);
    }
    setFavorite(true);
  };

  // const handleCheckbox = (index) => {
  //   const prevStorage = getStorage('inProgressRecipes');
  //   const storage = getStorage('inProgressRecipes').meals;
  //   console.log(storage);
  //   if (!storage[ID]) {
  //     storage[ID] = [];
  //   } else if (storage[ID].includes(index)) {
  //     const storageRemove = storage[ID].filter((x) => x !== index);
  //     const remove = { ...prevStorage, meals: { ...storage, [ID]: storageRemove } };
  //     setStorage('inProgressRecipes', remove);
  //     setDoneIngredients(storageRemove);
  //   } else {
  //     const listIds = [...storage[ID], index];
  //     const newStorage = { ...prevStorage, meals: { ...storage, [ID]: listIds } };
  //     setStorage('inProgressRecipes', newStorage);
  //     setDoneIngredients(listIds);
  //   }
  // };

  function handleClick() {
    push('/done-recipes');
  }

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = foodState;

  return (
    <div>
      {foodState && (
        <div>
          <div className="div-thumbnail">
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid="recipe-photo"
              className="thumbnail"
            />
          </div>
          <div className="group-title">
            <h1 data-testid="recipe-title">{strMeal}</h1>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavoriteBtn }
            >
              <img
                className="serchIcon"
                type="image/svg+xml"
                alt="Favorite"
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
              />
            </button>
            <button type="button">
              <img
                className="serchIcon"
                type="image/svg+xml"
                alt="Share"
                data-testid="share-btn"
                src={ shareIcon }
              />
            </button>
          </div>

          <p data-testid="recipe-category">
            {strCategory}
          </p>

          <p data-testid="instructions">
            {strInstructions}
          </p>

          <h2>Ingredients</h2>
          <ul>
            {foodsIngredients.length > 0
              && foodsIngredients.map((ingredient, index) => (
                <div key={ index }>
                  <label
                    htmlFor={ `${index}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `${index}-ingredient-step` }
                      className="strikethrough"
                      // onChange={ () => handleCheckbox(index) }
                      // checked={ doneIngredients && doneIngredients.includes(index) }
                    />
                    <span>
                      {ingredient[1]}
                      {ingredientsMeasure[index]
                        && ` - ${ingredientsMeasure[index][1]}`}
                    </span>
                  </label>
                </div>
              ))}
          </ul>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            // disabled={ btnDisabled }
            onClick={ () => handleClick() }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}
