import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
export default function Card({ name, img, index, id, drink }) {
  const history = useHistory();

  function redirectTo(route) {
    if (drink) {
      history.push(`/drinks/${route}`);
    } else history.push(`/foods/${route}`);
  }

  return (
    <div
      className="recipe"
      role="presentation"
      data-testid={`${index}-recipe-card`}
      onClick={() => redirectTo(id)}
      onKeyDown={() => redirectTo(id)}
    >
      <div className="recipeDetail">
        <p className="recipeName" data-testid={`${index}-card-name`}>
          {name}
        </p>
      </div>

      <img
        className="recipeImage"
        src={img}
        alt={name}
        data-testid={`${index}-card-img`}
      />
    </div>
  );
}

Card.propTypes = {
  drink: PropTypes.any,
  id: PropTypes.any,
  img: PropTypes.any,
  index: PropTypes.any,
  name: PropTypes.any,
}.isRequired;
