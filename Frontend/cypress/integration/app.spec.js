describe("Tests for Gator Marketplace", ()=>{
    it("renders landing page",()=>{
        cy.visit("/");
        cy.get('#landing').should("exist");
    });

    it("check if landing page has non authenticated user",()=>{
        cy.visit("/home");
        cy.get('#login').should('exist');
    })

    it("authenticated user can see listings",()=>{
        cy.visit("/home");
        cy.get('#listings').should('exist');
    })

    it("authenticated user can see requests",()=>{
        cy.visit("/home");
        cy.get('#requests').should('exist');
    })


    it("check if home page has authenticated user",()=>{
        cy.visit("/home");
        cy.get('#logout').should('exist');

    });

    it("authenticated user can click on read more and see posts",()=>{
        cy.visit("/home");
        cy.get('#cardButton').should('be.visible');
        
});

it('click on any card to read product description', () => {
    cy.visit('/home')
    cy.get('#cardButton').click();
    cy.get('#interestedButton').should('exist');
    cy.get('#interestedButton').click();
    
});

it('Set location filter', () => {
    cy.visit('/home')
    cy.get('#filter').click();
    cy.get(':nth-child(3) > .form-control').select('Location');
    cy.get(':nth-child(4) > .form-control').select('Gainesville');
    cy.get('#cardButton').should('exist');
});

it('Set Tags filter', () => {
    cy.visit('/home')
    cy.get('#filter').click();
    cy.get(':nth-child(3) > .form-control').select('Category');
    cy.get(':nth-child(4) > .form-control').select('Stationary');
    cy.get('#cardButton').should('exist');
});
        
    it('opens form, populate fields and assert', () => {
        cy.visit('/Form')
        cy.get('label > input').click();
        cy.get('#title').clear();
        cy.get('#title').type('Title');
        cy.get('#description').clear();
        cy.get('#description').type('Product Description');
        cy.get('#price').clear();
        cy.get('#price').type('4');
        cy.get(':nth-child(7) > .form-control').select('Stationary');
        cy.get(':nth-child(8) > .form-control').select('Hawthorne');
        cy.get('#submitted').click();
        cy.get('.logoImage').click();
    })

    

})
