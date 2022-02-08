import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Context from '../context/Context';
import { fetchFoods, fetchDrinks } from '../services/fetchAPI';

export default function SearchBar() {
  const { setSearchData } = useContext(Context);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ingredient');

  const { pathname } = useLocation();

  const { push } = useHistory();

  function detailsFoods(foods) {
    if (foods.length === 1) {
      const id = foods[0].idMeal;
      push(`/foods/${id}`);
    }
  }

  function detailsDrinks(drinks) {
    if (drinks.length === 1) {
      const id = drinks[0].idDrink;
      push(`/drinks/${id}`);
    }
  }

  function noRecipe(param) {
    if (!param) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }

  async function filterFoods() {
    const firstLetter = 'first letter';
    if (filter === 'ingredient') {
      const foods = await fetchFoods(`filter.php?i=${search}`);
      if (foods) {
        setSearchData(foods);
        detailsFoods(foods);
      }
      noRecipe(foods);
    } else if (filter === 'name') {
      const foods = await fetchFoods(`search.php?s=${search}`);
      if (foods) {
        setSearchData(foods);
        detailsFoods(foods);
      }
      noRecipe(foods);
    } else if (filter === firstLetter) {
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const foods = await fetchFoods(`search.php?f=${search}`);
      if (foods) {
        setSearchData(foods);
        detailsFoods(foods);
      }
      noRecipe(foods);
    }
  }

  async function filterDrinks() {
    const firstLetter = 'first letter';
    if (filter === 'ingredient') {
      const drinks = await fetchDrinks(`filter.php?i=${search}`);
      if (drinks) {
        setSearchData(drinks);
        detailsDrinks(drinks);
      }
      noRecipe(drinks);
    } else if (filter === 'name') {
      const drinks = await fetchDrinks(`search.php?s=${search}`);
      if (drinks) {
        setSearchData(drinks);
        detailsDrinks(drinks);
      }
      noRecipe(drinks);
    } else if (filter === firstLetter) {
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const drinks = await fetchDrinks(`search.php?f=${search}`);
      if (drinks) {
        setSearchData(drinks);
        detailsDrinks(drinks);
      }
      noRecipe(drinks);
    }
  }

  function handleSearch() {
    if (pathname.includes('foods')) {
      filterFoods();
    } else {
      filterDrinks();
    }
  }

  return (
    <div className="search-bar">
      <label htmlFor="search">
        <input
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
          placeholder={ `Search by ${filter}...` }
          autoComplete="off"
          onChange={ (e) => setSearch(e.target.value) }
        />
      </label>
      <label htmlFor="ingredient">
        <input
          type="radio"
          value="ingredient"
          name="filter"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ (e) => setFilter(e.target.value) }
          defaultChecked
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          value="name"
          name="filter"
          id="name"
          data-testid="name-search-radio"
          onChange={ (e) => setFilter(e.target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          value="first letter"
          name="filter"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ (e) => setFilter(e.target.value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => { handleSearch(); } }
      >
        Search
      </button>
    </div>
  );
}
