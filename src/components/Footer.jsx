import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const { push } = useHistory();

  function redirectTo(route) {
    push(route);
  }

  return (
    <div data-testid="footer" className="footer">
      <img
        className="footerIcon"
        role="presentation"
        src={drinkIcon}
        data-testid="drinks-bottom-btn"
        alt="Drink"
        onClick={() => redirectTo('/drinks')}
        onKeyDown={() => redirectTo('/drinks')}
      />

      <img
        className="footerIcon"
        role="presentation"
        src={exploreIcon}
        data-testid="explore-bottom-btn"
        alt="Explore"
        onClick={() => redirectTo('/explore')}
        onKeyDown={() => redirectTo('/explore')}
      />

      <img
        className="footerIcon"
        role="presentation"
        src={mealIcon}
        data-testid="food-bottom-btn"
        alt="Foods"
        onClick={() => redirectTo('/foods')}
        onKeyDown={() => redirectTo('/foods')}
      />
    </div>
  );
}
