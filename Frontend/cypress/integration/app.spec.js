describe("Tests for Gator Marketplace", ()=>{
    it("renders landing page",()=>{
        cy.visit("/");
        cy.get('#landing').should("exist");
    });

    it("check if landing page has non authenticated user",()=>{
        cy.visit("/");
        cy.get('#login').should('exist');
    })

    it("check if home page has authenticated user",()=>{
        cy.visit("/home");
        cy.get('#logout').should('exist');
        
});
        
    it('opens form, populate fields and assert', () => {
        cy.visit('/Form')
        cy.get('label > input').click();
        cy.get('#title').clear();
        cy.get('#title').type('Title');
        cy.get('#description').clear();
        cy.get('#description').type('Product Description');
        cy.get('#cost').clear();
        cy.get('#cost').type('69');
        cy.get(':nth-child(7) > .form-control').select('stationary');
        cy.get(':nth-child(8) > .form-control').select('hawthorne');
        cy.get('#submitted').click();
        cy.get('.logoImage').click();
    })
})
