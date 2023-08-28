//Import all the functions that you run in scripts
import { expect } from 'chai';
import recipeData from '../sample-data/sample-recipes';
import { filterRecipeByTag} from '../src/filter-recipes.js';

//import all functions from scripts files


describe('filterRecipeByTag', () => {
 
  it('Should be a function', () => {
    expect(filterRecipeByTag).to.be.a('function');
  });

  it('Should filter recipes data based on a tag', ()=> {
    const filtered1 = filterRecipeByTag(recipeData, 'lunch')
    // const filtered2 = filterRecipeByTag(recipeData, ['snack'])
    expect(filtered1.length).to.equal(1)
    // expect(filtered2.length).to.equal(2)
    // expect(filtered1[0]).to.deep.equal(recipeData[0])
    // based on multiple tags 
    // recipes with double. return two.
    });
  })
