// Your fetch requests will live here!
export const getUsers = () => {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};

export const getRecipes = () => {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};

export const getIngredients = () => {
  return fetch(
    'https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients'
  )
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};


