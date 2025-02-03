import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);    
  });

    it("Should do checkout with the correct flow", () =>{
      cy.get('.inventory_item').first().find('.inventory_item_name').click();
      cy.get('.inventory_details_container').should('be.visible');
      cy.get('button[id^="add-to-cart"]').should('be.visible').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
      cy.get('[data-test="back-to-products"]').click();
      cy.url().should('include', '/inventory');

      cy.get('.shopping_cart_link').click();
      cy.wait(2000);

      cy.get('[data-test="checkout"]').click();
      cy.wait(2000);

      cy.get('[data-test="firstName"]').type('Elixandre');
      cy.get('[data-test="lastName"]').type('Silva');
      cy.get('[data-test="postalCode"]').type('123456');
      cy.wait(2000);
      cy.get('[data-test="continue"]').click();
      cy.wait(2000);

      cy.get('[data-test="finish"]').click();
      cy.wait(2000);

      cy.get('.complete-header').should('contain', 'Thank you for your order!');
      cy.wait(2000); 
    });

    it("Should select some products, go to cart, and go back to continue shopping", () => {
      cy.get('.inventory_item').eq(0).find('button').click();
      cy.wait(1000);
    
      cy.get('.inventory_item').eq(1).find('button').click();
      cy.wait(1000);
    
      cy.get('.shopping_cart_badge').should('contain', '2');
    
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart');
      cy.wait(1000);
    
      cy.get('.cart_item').should('have.length', 2);
    
      cy.get('[data-test="continue-shopping"]').click();
      cy.url().should('include', '/inventory');
      cy.wait(1000);
    
      cy.contains('Products').should('be.visible');
      cy.wait(1000);
    });

    it("Should not continue checkout with empty delivery information", () => {
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart');
      cy.wait(1000);
    
      cy.get('[data-test="checkout"]').click();
      cy.url().should('include', '/checkout-step-one');
      cy.wait(1000);
    
      cy.get('[data-test="continue"]').click();
      cy.wait(1000);
    
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Error: First Name is required');
    });
});