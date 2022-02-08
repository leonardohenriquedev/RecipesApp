import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { fetchDrinks } from '../services/fetchAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/recipeProgress.css';
import Context from '../context/Context';

import {
  shareLink,
  favoriteButton,
  handleCheckBox,
  // handleChecked,
} from '../services/usefulFunctions';

export default function DrinksProgress() {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const { dataDrinksDetails, setDataDrinksDetails } = useContext(Context);

  const [favorite, setFavorite] = useState(false);
  const [disable, setDisable] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  // const [checked, setChecked] = useState(false);

  let drinksIngredients = [];
  let ingredientsMeasure = [];

  const {
    strDrinkThumb,
    idDrink,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = dataDrinksDetails;

  const favoriteRecipes = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  // const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  // const getStorage = (key) => JSON.parse(localStorage.getItem(key));

  const ID = pathname.split('/')[2];

  useEffect(() => {
    async function fetchDrinkstate() {
      const details = await fetchDrinks(`lookup.php?i=${ID}`);
      setDataDrinksDetails(details[0]);
    }
    fetchDrinkstate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (getLocalStorage) {
      const verifyFavorite = getLocalStorage.some(
        (item) => item.id === idDrink,
      );

      if (verifyFavorite) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  });

  // useEffect(() => {
  //   const storage = getStorage('inProgressRecipes');
  //   if (!storage) {
  //     setStorage('inProgressRecipes', {
  //       ...storage,
  //       meals: {},
  //       cocktails: {},
  //     });
  //   }
  //   setChecked(storage.cocktails[idDrink]);
  // }, []);

  if (dataDrinksDetails) {
    drinksIngredients = Object.entries(dataDrinksDetails).filter(
      (ingredient) => ingredient[0].includes('strIngredient')
        && ingredient[1] !== null
        && ingredient[1] !== '',
    );

    ingredientsMeasure = Object.entries(dataDrinksDetails).filter(
      (measure) => measure[0].includes('strMeasure')
        && measure[1] !== null
        && measure[1] !== '',
    );
  }

  function handleClick() {
    push('/done-recipes');
  }

  return (
    <div>
      {dataDrinksDetails && (
        <div>
          <div className="div-thumbnail">
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid="recipe-photo"
              className="thumbnail"
            />
          </div>
          <div className="group-title">
            <h1 data-testid="recipe-title">{strDrink}</h1>
            <div
              role="presentation"
              onClick={ () => favoriteButton(
                idDrink,
                favorite,
                setFavorite,
                favoriteRecipes,
              ) }
            >
              <img
                className="serchIcon"
                type="image/svg+xml"
                alt="Favorite"
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
              />
            </div>
            <div
              role="presentation"
              onClick={ () => shareLink(idDrink, setDisable) }
            >
              <img
                className="shareIcon"
                type="image/svg+xml"
                alt="Share Icon"
                data-testid="share-btn"
                src={ shareIcon }
                hidden={ !disable }
              />
            </div>
            <span hidden={ disable }>
              {/* <img src={ linkCopied } alt="Link copied!" /> */}
              Link copied!
            </span>
          </div>

          <p data-testid="recipe-category">{strCategory}</p>

          <p data-testid="instructions">{strInstructions}</p>

          <h2>Ingredients</h2>
          <ul>
            {drinksIngredients.length > 0
              && drinksIngredients.map((ingredient, index) => (
                <div key={ index }>
                  <label
                    htmlFor={ `${index}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `${index}-ingredient-step` }
                      className="strikethrough"
                      onChange={ () => handleCheckBox(
                        idDrink,
                        index,
                        checkedIngredients,
                        setCheckedIngredients,
                      ) }
                      checked={
                        localStorage.getItem('inProgressRecipes')
                        && JSON.parse(
                          localStorage.getItem('inProgressRecipes'),
                        ).cocktails[idDrink].includes(index)
                      }
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
