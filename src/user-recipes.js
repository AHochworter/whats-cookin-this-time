export let savedRecipes = [];

export const saveRecipe = (recipeList, recipeName) => {
  const recipeFullInfo = recipeList.find(recipe => recipe.name === recipeName);

  if (!savedRecipes.some(currentRecipe => recipeFullInfo.id === currentRecipe.id)) {
    savedRecipes.push(recipeFullInfo);
  }

  return savedRecipes;
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

