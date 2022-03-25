describe('constructor page', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });

  it('check if ingredients are loaded', () => {
    cy.contains('Краторная булка N-200i');
  });

  it('should handle modal', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента');
    cy.get('#close').click();
    cy.get('#modal').should('not.exist');
  });

  it('should handle order', () => {
    cy.contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('#dropContainer').trigger('drop');
    cy.get('#dropContainer').contains('Краторная булка N-200i');
    // Check if bun replace another bun
    cy.contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    cy.get('#dropContainer').trigger('drop');
    cy.get('#dropContainer').should('not.contain', 'Краторная булка N-200i');
    cy.get('#dropContainer').contains('Флюоресцентная булка R2-D3');

    cy.contains('Плоды Фалленианского дерева').trigger('dragstart');
    cy.get('#dropContainer').trigger('drop');
    cy.contains('Оформить заказ').click();

    // login before order
    cy.get('input[type=email]').click().type('die-chimaere@yandex.ru');
    cy.get('input[type=password]').click().type('burger-shmurger');
    cy.contains('Войти').click();

    cy.contains('Оформить заказ').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(15000);
    cy.contains('идентификатор заказа');

    // save order number and check if it exists in the feed
    cy.get('#orderNumber').invoke('text').then((text) => {
      cy.visit('http://localhost:3000/feed');

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      cy.contains(text);
    });
  });
});
