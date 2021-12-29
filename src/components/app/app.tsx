import React, { useState } from 'react';
import {data} from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import Main from '../main/main';

function App() {
const [ingredients, setIngredients] = useState(data);
const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className={appStyles.app}>
      <AppHeader isMenuOpen={isMenuOpen} />
      <Main>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </Main>
    </div>
  );
}

export default App;
