/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import BurgerMenu from './burger-menu';

it('Меню рендерится без ошибок', () => {
  const tree = renderer
    .create(<BurgerMenu isMenuOpen />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
