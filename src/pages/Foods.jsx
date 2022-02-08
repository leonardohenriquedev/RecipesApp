import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { fetchFoods } from '../services/fetchAPI';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

import '../styles/Foods.css';

export default function Foods() {
  const { searchData, dataFoods, categoriesFoods, recipesByIngredients } =
    useContext(Context);

  const max = 12;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredFoods, setFilteredFoods] = useState('');

  async function changeCategory({ target: { value } }) {
    let currentCategory = selectedCategory;
    const limit = 12;

    if (currentCategory === value || value === 'all') {
      currentCategory = '';
      setSelectedCategory(currentCategory);
      setFilteredFoods(dataFoods);
    } else {
      setSelectedCategory(value);
      let filtered = await fetchFoods(`filter.php?c=${value}`);
      filtered = filtered.slice(0, limit);
      setFilteredFoods(filtered);
    }
  }

  function renderDefault() {
    return (
      <div className="recipesContainer">
        {filteredFoods.length > 0 ? (
          <div className="recipesBox">
            {filteredFoods.map(({ idMeal, strMeal, strMealThumb }, index) => (
              <Card
                key={idMeal}
                name={strMeal}
                img={strMealThumb}
                index={index}
                id={idMeal}
              />
            ))}
          </div>
        ) : (
          <div className="recipesBox">
            {dataFoods.length > 0 &&
              dataFoods.map(({ idMeal, strMeal, strMealThumb }, index) => (
                <Card
                  data
                  key={idMeal}
                  name={strMeal}
                  img={strMealThumb}
                  index={index}
                  id={idMeal}
                />
              ))}
          </div>
        )}
      </div>
    );
  }

  function renderSearch() {
    return searchData.length > 0
      ? searchData
          .slice(0, max)
          .map(({ idMeal, strMeal, strMealThumb }, index) => (
            <Card
              search
              key={idMeal}
              name={strMeal}
              img={strMealThumb}
              index={index}
              id={idMeal}
            />
          ))
      : renderDefault();
  }

  return (
    <div className="mainBackGround">
      <div className="mainPage">
        <Header title="Foods" />
        <div className="mainButtons">
          <button
            className="mainButton"
            data-testid="All-category-filter"
            type="button"
            value="all"
            onClick={changeCategory}
          >
            All
          </button>
          {categoriesFoods.length > 0 &&
            categoriesFoods.map(({ strCategory }) => (
              <button
                className="mainButton"
                key={strCategory}
                type="button"
                value={strCategory}
                data-testid={`${strCategory}-category-filter`}
                onClick={changeCategory}
              >
                {strCategory}
              </button>
            ))}
        </div>
        {recipesByIngredients.length > 0 ? (
          <div className="recipesBox">
            {recipesByIngredients.map(
              ({ idMeal, strMeal, strMealThumb }, index) => (
                <Card
                  byIngredients
                  key={idMeal}
                  name={strMeal}
                  img={strMealThumb}
                  index={index}
                  id={idMeal}
                />
              )
            )}
          </div>
        ) : (
          renderSearch()
        )}

        <Footer />
      </div>
    </div>
  );
}
