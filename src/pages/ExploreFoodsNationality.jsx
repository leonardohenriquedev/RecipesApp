import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFoods } from '../services/fetchAPI';
import Card from '../components/Card';

export default function ExploreFoodsNationality() {
  const [dataFoods, setFoods] = useState([]);
  const [foodNationalities, setNationalities] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  async function fetchDataFoods() {
    const limit = 12;
    let newFoods = await fetchFoods('search.php?s=');
    newFoods = newFoods.slice(0, limit);
    setFoods(newFoods);
  }

  async function fetchNationalities() {
    // const limit = 12;
    const nationalities = await fetchFoods('list.php?a=list');
    // nationalities = nationalities.slice(0, limit);
    setNationalities(nationalities);
  }

  async function handleNationality({ target: { value } }) {
    const limit = 12;
    if (value === 'All') {
      let nationalities = await fetchFoods('search.php?s=');
      nationalities = nationalities.slice(0, limit);
      setFilteredFoods(nationalities);
    } else {
      let filtered = await fetchFoods(`filter.php?a=${value}`);
      filtered = filtered.slice(0, limit);
      setFilteredFoods(filtered);
    }
  }

  useEffect(() => {
    fetchDataFoods();
    fetchNationalities();
  }, []);

  return (
    <div>
      <Header title="Explore Nationalities" />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleNationality }
      >
        <option key="all" data-testid="All-option">
          All
        </option>
        {foodNationalities.length > 0
          && foodNationalities.map((nationality) => (
            <option
              key={ nationality.strArea }
              data-testid={ `${nationality.strArea}-option` }
            >
              {nationality.strArea}
            </option>
          ))}
      </select>

      {filteredFoods.length > 0
        ? filteredFoods.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Card
            filtered
            key={ idMeal }
            name={ strMeal }
            img={ strMealThumb }
            index={ index }
            id={ idMeal }
          />
        ))
        : dataFoods.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Card
            data
            key={ idMeal }
            name={ strMeal }
            img={ strMealThumb }
            index={ index }
            id={ idMeal }
          />
        ))}
      <Footer />
    </div>
  );
}
