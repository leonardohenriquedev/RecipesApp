import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchDrinks, fetchFoods } from '../services/fetchAPI';

import Context from './Context';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataFoods, setDataFoods] = useState('');
  const [dataDrinks, setDataDrinks] = useState('');
  const [dataFoodsDetails, setDataFoodsDetails] = useState('');
  const [dataDrinksDetails, setDataDrinksDetails] = useState('');
  const [searchData, setSearchData] = useState('');
  const [categoriesFoods, setCategoriesFoods] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [recipesByIngredients, setRecipesByIngredients] = useState([]);

  const LINK_SEARCH = 'search.php?s=';
  const LINK_LIST = 'list.php?c=list';

  async function fetchDataFoods() {
    const limit = 12;
    let foods = await fetchFoods(LINK_SEARCH);
    foods = foods.slice(0, limit);
    setDataFoods(foods);
  }

  async function fetchFoodCategories() {
    const limit = 5;
    let data = await fetchFoods(LINK_LIST);
    data = data.slice(0, limit);
    setCategoriesFoods(data);
  }
  useEffect(() => {
    fetchDataFoods();
    fetchFoodCategories();
  }, []);

  async function fetchDataDrinks() {
    const limit = 12;
    let drinks = await fetchDrinks(LINK_SEARCH);
    drinks = drinks.slice(0, limit);
    setDataDrinks(drinks);
  }

  async function fetchDrinksCategories() {
    const limit = 5;
    let data = await fetchDrinks(LINK_LIST);
    data = data.slice(0, limit);
    setCategoriesDrinks(data);
  }

  useEffect(() => {
    fetchDataDrinks();
    fetchDrinksCategories();
  }, []);

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    searchData,
    setSearchData,
    dataFoods,
    dataDrinks,
    setDataDrinks,
    dataFoodsDetails,
    setDataFoodsDetails,
    dataDrinksDetails,
    setDataDrinksDetails,
    categoriesDrinks,
    categoriesFoods,
    fetchDataDrinks,
    fetchDataFoods,
    recipesByIngredients,
    setRecipesByIngredients,

  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;
