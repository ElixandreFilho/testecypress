import { users, url } from "./Mock";

describe('Inventory - Login', () => {
  beforeEach(()=> {
    cy.visit(url);
  })

    it('Should login with valid credentials', () => {
      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();
      cy.contains('Products');
    });
    
    it('Should login with valid credentials and do logout', () => {
      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory');
      cy.get('#react-burger-menu-btn').should('exist').click();
      cy.get('[data-test="logout-sidebar-link"]').click()
      cy.url().should('include', '/')
    });

    it('Should not login with invalid credentials', () => {
      cy.get('[data-test="username"]').type('elixandre');
      cy.get('[data-test="password"]').type('123456');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/')
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
      cy.url().should('include', '/')
    });

    it('Should not allow "locked_out_user" do sign in', () =>{
      cy.get('[data-test="username"]').type('users.locked_out_user.username');
      cy.get('[data-test="password"]').type('users.locked_out_user.password');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/')
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
      cy.url().should('include', '/')
    });

    it('Should login with "performance_glitch_user" and wait the products page loads', () =>{
      cy.get('[data-test="username"]').type(users.performance_glitch_user.username);
      cy.get('[data-test="password"]').type(users.performance_glitch_user.password);
      cy.get('[data-test="login-button"]').click();
      cy.url({ timeout: 10000 }).should('include', '/inventory');
    });
  })