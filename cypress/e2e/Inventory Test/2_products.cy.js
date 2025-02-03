import { users, url } from './Mock';
import { doSignIn } from './Utils';

describe('Inventory - Products', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

    it('Should see the product details and add to cart', () =>{
      cy.get('.inventory_item').first().find('.inventory_item_name').click();
      cy.get('.inventory_details_container').should('be.visible');
      cy.get('button[id^="add-to-cart"]').should('be.visible').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
      cy.get('[data-test="back-to-products"]').click();
      cy.url().should('include', '/inventory');
    });

    it('Should sort products by price properly (high to low)', () => {
      cy.get('[data-test="product-sort-container"]').select('hilo');
      cy.wait(1000);
    
      cy.get('.inventory_item_price').then(($prices) => {
        const prices = $prices.toArray().map(el => parseFloat(el.innerText.replace('$', '')));
    
        cy.wrap(prices).should('deep.equal', [...prices].sort((a, b) => b - a));
      });
    });
    
    
      
    it('Should sort products by price properly (low to high)', () => {
      cy.get('[data-test="product-sort-container"]').select('lohi');
      cy.wait(1000);
    
      cy.get('.inventory_item_price').then(($prices) => {
        const prices = $prices.toArray().map(el => parseFloat(el.innerText.replace('$', '')));
    
        cy.wrap(prices).should('deep.equal', [...prices].sort((a, b) => a - b));
      });
    });
    
});
