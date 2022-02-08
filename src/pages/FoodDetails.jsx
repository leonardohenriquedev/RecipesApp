import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { fetchFoods } from '../services/fetchAPI';

import Context from '../context/Context';
import '../styles/FoodDetails.css';
import SubCard from '../components/SubCard';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
// import linkCopied from '../images/link-copied.png';

import { shareLink, favoriteButton } from '../services/usefulFunctions';

export default function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  const { push } = useHistory();

  const { dataFoodsDetails, setDataFoodsDetails } = useContext(Context);
  const [disable, setDisable] = useState(true);
  const [favorite, setFavorite] = useState(false);

  let foodsIngredients = [];
  let ingredientsMeasure = [];

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    idMeal,
    strArea,
  } = dataFoodsDetails;

  const favoriteRecipes = {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const LINK = `lookup.php?i=${id}`;

  useEffect(() => {
    async function fetchDataFoods() {
      const details = await fetchFoods(LINK);
      setDataFoodsDetails(details[0]);
    }
    fetchDataFoods();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (getLocalStorage) {
      const verifyFavorite = getLocalStorage.some(
        (item) => item.id === idMeal,
      );

      if (verifyFavorite) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  });

  if (dataFoodsDetails) {
    foodsIngredients = Object.entries(dataFoodsDetails).filter(
      (ingredient) => ingredient[0].includes('strIngredient')
        && ingredient[1] !== ''
        && ingredient[1] !== null,
    );

    ingredientsMeasure = Object.entries(dataFoodsDetails).filter(
      (measure) => measure[0].includes('strMeasure')
        && measure[1] !== ''
        && measure[1] !== null,
    );
  }

  const handleVideoLink = (linkVideo) => linkVideo.replace('watch?v=', 'embed/');

  function redirectTo() {
    push(`/foods/${idMeal}/in-progress`);
  }

  return (
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
        <div
          role="presentation"
          onClick={ () => favoriteButton(
            idMeal,
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
        <div role="presentation" onClick={ () => shareLink(idMeal, setDisable) }>
          <img
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

      <h4 data-testid="recipe-category">{strCategory}</h4>

      <div>
        <h2>Ingredients</h2>
        <ul>
          {foodsIngredients.length > 0
            && foodsIngredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient[0] }
              >
                {' - '}
                {ingredient[1]}
                {ingredientsMeasure[index]
                  && ` - ${ingredientsMeasure[index][1]}`}
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </div>

      {strYoutube && strYoutube !== '' && (
        <div>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            title="uniqueTitle"
            width="350"
            height="290"
            src={ handleVideoLink(strYoutube) }
          >
            video
          </iframe>
        </div>
      )}

      <div>
        <h2>Recommended</h2>
        <div className="details-recommended">
          <SubCard type="drinks" />
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

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
