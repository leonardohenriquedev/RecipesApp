export async function fetchFoods(query) {
  const result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${query}`,
  ).then((response) => response.json());
  return result.meals;
}

export async function fetchDrinks(query) {
  const result = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/${query}`,
  ).then((response) => response.json());
  return result.drinks;
}

// filter.php?i={ingredient}
// search.php?s={name}
// search.php?f={first-letter}
