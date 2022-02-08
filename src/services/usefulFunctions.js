export function shareLink(id, setDisable) {
  navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
  const TIME = 3000;

  setDisable(false);

  setInterval(() => {
    setDisable(true);
  }, TIME);
}

export function favoriteButton(id, favorite, setFavorite, favoriteRecipes) {
  const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  let testItems = '';

  if (getLocalStorage) {
    testItems = getLocalStorage.some((item) => item.id === id);
  }

  if (!getLocalStorage) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipes]));
    setFavorite(!favorite);
  } else if (getLocalStorage && !testItems) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...getLocalStorage, favoriteRecipes]),
    );
    setFavorite(!favorite);
  } else if (testItems) {
    const removeItemStorage = getLocalStorage.filter((item) => item.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(removeItemStorage));

    setFavorite(!favorite);
  }
}

const inProgressRecipes = {
  cocktails: {},
  meals: {},
};

// export function handleChecked(setChecked, index, type) {
//   const recipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

//   let test = false;

//   if (recipeProgress) {
//     test = recipeProgress
//       ? recipeProgress[type][id].some((recipe) => recipe === index)
//       : false;
//     setChecked(test);
//   }
// }

export function handleCheckBox(
  id,
  index,
  checkedIngredients,
  setCheckedIngredients,
) {
  const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const checkbox = document.getElementById(`${index}-ingredient-step`);

  if (getLocalStorage && checkbox.checked) {
    checkedIngredients.push(index);
    setCheckedIngredients(checkedIngredients);

    Object.assign(getLocalStorage.cocktails, { [id]: checkedIngredients });
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
  } else if (!checkbox.checked) {
    // NOTE - Caso o checkbox tenha sido desmarcado, realiza o filtro para remover a marcação setando o novo array sem o index selecionado no localStorage
    const removeChecked = checkedIngredients.filter((item) => item !== index);
    setCheckedIngredients(removeChecked);

    Object.assign(getLocalStorage.cocktails, { [id]: removeChecked });
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
  } else if (!getLocalStorage) {
    // NOTE - OK - Caso ainda não exista a chave inProgressRecipe, é setado na chave inProgressRecipes os valores recebidos por parâmetro, id e o array com o index já inserido é setado no localStorage o objeto completo, já com alteração.

    checkedIngredients.push(index);
    setCheckedIngredients(checkedIngredients);

    Object.assign(inProgressRecipes.cocktails, {
      [id]: checkedIngredients,
    });

    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }
}
