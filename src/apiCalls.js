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
  // console.log(recipeID)
  // console.log(userID)
  const postObject = { userID: userID, recipeID: recipeID };
  //put the postObject into the body. This was from the spec

  return (
    fetch(`http://localhost:3001/api/v1/usersRecipes`, {
      method: 'POST',
      body: JSON.stringify(postObject),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      // .then((data) =>  {
      //   console.log(data) // iterate over recipe data match ID of recipe user has clicked on
      // })
      .catch(error => console.log(error))
  );
};

export const updateUsers = (currentUser, savedRecipe) => {
  const currentRecipe = currentUser['recipesToCook'].find(
    item => item === savedRecipe
  );
  if (currentRecipe) {
    console.log('Duplicate recipeID found. Cannot add the same recipe again.');
    return Promise.reject('Duplicate recipeID');
  }
  const promise = fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: currentUser['id'],
      recipeID: savedRecipe['id'],
    }),
  })
    .then(response => response.json())
    .catch(err => console.error(`You got an ${err}`));
  return promise;
};
