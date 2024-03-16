/// <reference types= 'cypress'/>

describe('working with login', () => {
    before(() => {
        cy.visit('https://www.saucedemo.com')
    })

    it('Should login with standar_user', () => {

        cy.url().should('include', 'saucedemo.com')

        cy.fixture("saucedemo").then(saucedemo => {
            const reguser = saucedemo.regusername
            const regpass = saucedemo.regpassword

            cy.login(reguser, regpass);

            cy.get('span').should('contain.text','Products');
        });
    });

    it('Try login with locked_out_user', () => {

        cy.visit('https://www.saucedemo.com')
        cy.url().should('include', 'saucedemo.com')

        cy.fixture("saucedemo").then(saucedemo => {
            const lockuser = saucedemo.lockusername
            const regpass = saucedemo.regpassword

            cy.login(lockuser, regpass);

            cy.get('h3').should('contain.text','Epic sadface: Sorry, this user has been locked out.');
        });
    });

    it('Try login with problem_user', () => {

        cy.visit('https://www.saucedemo.com')
        cy.url().should('include', 'saucedemo.com')

        cy.fixture("saucedemo").then(saucedemo => {
            const probuser = saucedemo.probusername
            const regpass = saucedemo.regpassword

            cy.login(probuser, regpass);

            cy.get('.inventory_item_name ').should('contain.text', 'Test.allTheThings() T-Shirt (Red)');
        });
    });

    it('Try login with performance_glitch_user', () => {

        cy.visit('https://www.saucedemo.com')
        cy.url().should('include', 'saucedemo.com')

        cy.fixture("saucedemo").then(saucedemo => {
            const glitchuser = saucedemo.perglitchusername
            const regpass = saucedemo.regpassword

            cy.login(glitchuser, regpass);

            cy.get('span').should('contain.text','Products');
        });
    });

    it('Try login with error_user', () => {

        cy.visit('https://www.saucedemo.com')
        cy.url().should('include', 'saucedemo.com')

        cy.fixture("saucedemo").then(saucedemo => {
            const erruser = saucedemo.errusername
            const regpass = saucedemo.regpassword

            cy.login(erruser, regpass);

            cy.get('span').should('contain.text','Products');
        });
    });

    it('Try login with visual_user', () => {

        cy.visit('https://www.saucedemo.com')
        cy.url().should('include', 'saucedemo.com')

        cy.fixture("saucedemo").then(saucedemo => {
            const visuser = saucedemo.visusername
            const regpass = saucedemo.regpassword

            cy.login(visuser, regpass);

            cy.get('span').should('contain.text','Products');
        });
    });
});

describe('Testing from "add to cart" to finish checkout', () => {
    
    it('login with standart_username', () => {
        cy.visit('https://www.saucedemo.com')
        cy.url().should('include', 'saucedemo.com')

        cy.fixture("saucedemo").then(saucedemo => {
            const reguser = saucedemo.regusername
            const regpass = saucedemo.regpassword

            cy.login(reguser, regpass);

            cy.get('span').should('contain.text','Products');
        });
    });

    it('Add to cart the product chose', () => {
        cy.get('.inventory_item_name ').contains('Sauce Labs Backpack').click()
        cy.get('[class*="inventory_details_desc large_size"').should('contain.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
        cy.get('#add-to-cart-sauce-labs-backpack').contains('Add to cart').click()
    });

    it('Checkout the product at the "Your Cart"', () => {
        cy.get('.shopping_cart_link').click()
        cy.get('#checkout').should('contain.text', 'Checkout').click()
    });

    it('Fill "Your Information" and finish', () => {
        cy.get('#first-name').clear()
        cy.get('#first-name').type('John')

        cy.get('#last-name').clear()
        cy.get('#last-name').type('Doe')

        cy.get('#postal-code').clear()
        cy.get('#postal-code').type('12345')

        cy.get('#continue').click()

        cy.get('#finish').click()
        cy.get('#back-to-products').click();
    });
})

describe('Try the "product short"', () => {
    it('A to Z', () => {
        cy.get('select').as('dropdown');
        cy.get('@dropdown').select('Name (A to Z)');
        cy.get('@dropdown').should('have.value', 'az');
    });

    it('Z to A', () => {
        cy.get('select').as('dropdown');
        cy.get('@dropdown').select('Name (Z to A)');
        cy.get('@dropdown').should('have.value', 'za');
    });

    it('low to high', () => {
        cy.get('select').as('dropdown');
        cy.get('@dropdown').select('Price (low to high)');
        cy.get('@dropdown').should('have.value', 'lohi');
    });

    it('high to low', () => {
        cy.get('select').as('dropdown');
        cy.get('@dropdown').select('Price (high to low)');
        cy.get('@dropdown').should('have.value', 'hilo');
    });
});