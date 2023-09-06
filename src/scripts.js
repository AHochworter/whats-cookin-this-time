//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css';
import apiCalls from './apiCalls';

import tagData from './data/tags';
import {
  renderRecipeCards,
  welcomeNewUser,
  renderRecipeCardsByTag,
  selectButton,
  dropDownMenu,
  renderSelectTagOptions,
} from '../src/domUpdates';
