//Import all the functions that you run in scripts
import { expect } from 'chai';
import recipeData from '../sample-data/sample-recipes';
import { filterByTag, filterByName} from '../src/filter-recipes.js';

//import all functions from scripts files


describe('filter recipes', () => {
 
  it('Should be a function', () => {
    expect(filterByTag).to.be.a('function');
  });

  it('Should filter recipes data based on a tag', ()=> {
    const filtered1 = filterByTag(recipeData, 'lunch')
    const filtered2 = filterByTag(recipeData, 'snack')
    expect(filtered1.length).to.equal(1)
    expect(filtered2.length).to.equal(2)
    // console.log(filtered1)
    // console.log(filtered2)
    expect(filtered1).to.deep.equal([1])
    // expect(filtered2[0]).to.equal(recipeData[2])
    });

    it('Should be a function', () => {
    expect(filterByName).to.be.a('function');
  });

  it('should filter recipes based on a name', () => {
    const recipeName1 = filterByName(recipeData, 'Loaded Chocolate Chip Pudding Cookie Cups')
    const  recipeName2 = filterByName(recipeData, 'Maple Dijon Apple Cider Grilled Pork Chops')
    expect(recipeName1[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups')
    expect(recipeName2[0].name).to.equal('Maple Dijon Apple Cider Grilled Pork Chops')
    })
  })
