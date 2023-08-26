//Import all the functions that you run in scripts
import { expect } from 'chai';
import recipeData from '../src/data/recipes';
import { recipes } from '../src/recipes-to-cook.js';

//import all functions from scripts files

describe('Recipe', () => {
  it('Should be a function', () => {
    expect(recipes).to.be.a('function');
  });
});
