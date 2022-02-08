import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { fetchDrinks } from '../services/fetchAPI';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Drinks() {
  const {
    searchData,
    dataDrinks,
    categoriesDrinks,
    recipesByIngredients,
  } = useContext(Context);

  const max = 12;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState('');

  async function changeCategory({ target: { value } }) {
    let currentCategory = selectedCategory;
    const limit = 12;

    if (currentCategory === value || value === 'all') {
      currentCategory = '';
      setSelectedCategory(currentCategory);
      setFilteredDrinks(dataDrinks);
    } else {
      setSelectedCategory(value);
      let filtered = await fetchDrinks(`filter.php?c=${value}`);
      filtered = filtered.slice(0, limit);
      setFilteredDrinks(filtered);
    }
  }

  function renderDefault() {
    return (
      <div>
        <div>
          {filteredDrinks.length > 0 ? (
            filteredDrinks.map(
              ({ idDrink, strDrink, strDrinkThumb }, index) => (
                <Card
                  key={ idDrink }
                  name={ strDrink }
                  img={ strDrinkThumb }
                  index={ index }
                  id={ idDrink }
                  drink
                />
              ),
            )
          ) : (
            <div>
              {dataDrinks.length > 0
                && dataDrinks.map(
                  ({ idDrink, strDrink, strDrinkThumb }, index) => (
                    <Card
                      data
                      key={ idDrink }
                      name={ strDrink }
                      img={ strDrinkThumb }
                      index={ index }
                      id={ idDrink }
                      drink
                    />
                  ),
                )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderSearch() {
    return searchData.length > 0
      ? searchData
        .slice(0, max)
        .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <Card
            search
            key={ idDrink }
            name={ strDrink }
            img={ strDrinkThumb }
            index={ index }
            id={ idDrink }
            drink
          />
        ))
      : renderDefault();
  }

  return (
    <div>
      <Header title="Drinks" />
      <button
        data-testid="All-category-filter"
        type="button"
        value="all"
        onClick={ changeCategory }
      >
        All
      </button>
      {categoriesDrinks.length > 0
        && categoriesDrinks.map(({ strCategory }) => (
          <button
            value={ strCategory }
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ changeCategory }
          >
            {strCategory}
          </button>
        ))}
      {recipesByIngredients.length > 0
        ? recipesByIngredients.map(
          ({ idDrink, strDrink, strDrinkThumb }, index) => (
            <Card
              byIngredients
              key={ idDrink }
              name={ strDrink }
              img={ strDrinkThumb }
              index={ index }
              id={ idDrink }
              drink
            />
          ),
        )
        : renderSearch()}
      <Footer />
    </div>
  );
}
