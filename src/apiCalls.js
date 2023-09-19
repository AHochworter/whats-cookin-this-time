// Your fetch requests will live here!
export const getUsers = () => {
  return fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};

export const getRecipes = () => {
  return fetch('http://localhost:3001/api/v1/recipes')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};

export const getIngredients = () => {
  return fetch('	http://localhost:3001/api/v1/ingredients')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};

export const postRecipe = (recipeID, userID) => {
  const postObject = { userID: userID, recipeID: recipeID };

  return fetch(`http://localhost:3001/api/v1/usersRecipes`, {
    method: 'POST',
    body: JSON.stringify(postObject),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
