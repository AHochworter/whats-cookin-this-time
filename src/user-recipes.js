import usersData from './data/users';
export let currentUser = getRandomUser(usersData)
currentUser.savedRecipes = [];
// console.log("currentUser:=====", currentUser.name);

function getRandomUser(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

// const getRandomUser = (data) => {
//   const randomIndex = Math.floor(Math.random() * data.length);
//   return data[randomIndex];
// };


export const saveRecipe = (recipeList, recipeName) => {
  const recipeFullInfo = recipeList.find(recipe => recipe.name === recipeName);

  if (!currentUser.savedRecipes.some(currentRecipe => recipeFullInfo.id === currentRecipe.id)) {
    currentUser.savedRecipes.push(recipeFullInfo);
  }

  return currentUser.savedRecipes;
};

export const deleteRecipe = (savedRecipes, recipeName) => {
  const recipeToDelete = savedRecipes.findIndex(recipe => recipe.name === recipeName);
  savedRecipes.splice(recipeToDelete , 1)
  return savedRecipes
}


// export const saveRecipe = (recipeList, recipeName) => {

//   let recipeFullInfo = recipeList.find(recipe => {
//    recipe.name === recipeName[0].name
//     return true
//   });
//   console.log("recipeName:=====", recipeName);

//   let isRecipeSaved = false;
//     savedRecipes.forEach(currentRecipe => {
//       if (currentRecipe.id === recipeFullInfo.id) {
//         isRecipeSaved = true; 
//       }
//     });

//     if (!isRecipeSaved) {
//       savedRecipes.push(recipeFullInfo)
//     } 
//     return savedRecipes
//   };



//click on saved button
//need full recipe object, push into the empty saved recipes array
//need to iterate through
//find method? push method?




// generateRandomUser
// const generateRandomUser = users => {
//   currentUser = users[0];
//   return currentUser
// }

// shuffleData:
// const shuffleData = (recipes) => {
//   recipes.sort(() => Math.random() - 0.5)
//   return
// }

