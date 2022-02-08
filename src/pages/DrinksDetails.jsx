import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../services/fetchAPI';

import Context from '../context/Context';
import '../styles/DrinksDetails.css';
import SubCard from '../components/SubCard';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import linkCopied from '../images/link-copied.png';

import { shareLink, favoriteButton } from '../services/usefulFunctions';

export default function DrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const { push } = useHistory();

  const { dataDrinksDetails, setDataDrinksDetails } = useContext(Context);
  const [disable, setDisable] = useState(true);
  const [favorite, setFavorite] = useState(false);

  let arrIngredients = [];
  let arrMeasure = [];

  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
    idDrink,
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

  const LINK = `lookup.php?i=${id}`;

  useEffect(() => {
    async function fetchDataDrinks() {
      const details = await fetchDrinks(LINK);
      setDataDrinksDetails(details[0]);
    }
    fetchDataDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (dataDrinksDetails) {
    arrIngredients = Object.entries(dataDrinksDetails).filter(
      (ingredient) => ingredient[0].includes('strIngredient')
        && ingredient[1] !== null
        && ingredient[1] !== '',
    );

    arrMeasure = Object.entries(dataDrinksDetails).filter(
      (measure) => measure[0].includes('strMeasure')
        && measure[1] !== null
        && measure[1] !== '',
    );
  }

  function redirectTo() {
    push(`/drinks/${idDrink}/in-progress`);
  }

  return (
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
            type="image/svg+xml"
            alt="Heart Icon"
            data-testid="favorite-btn"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
          />
        </div>
        <div role="presentation" onClick={ () => shareLink(idDrink, setDisable) }>
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

      <h4 data-testid="recipe-category">
        {`${strCategory} - ${strAlcoholic}`}
      </h4>

      <div>
        <h2>Ingredients</h2>
        <ul>
          {arrIngredients.length > 0
            && arrMeasure.length > 0
            && arrIngredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {' - '}
                {ingredient[1]}
                {arrMeasure[index] && ` - ${arrMeasure[index][1]}`}
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </div>

      <div>
        <h2 className="h3">Recommended</h2>
        <div className="details-recommended">
          <SubCard type="foods" />
        </div>
      </div>

      <button
        className="btn-start"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ redirectTo }
      >
        Start Recipe
      </button>
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
