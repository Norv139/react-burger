/// <reference types="cypress"/>

context('Test login page',()=>{

    it('login',()=>{
        cy.visit('http://localhost:3000/login')
        cy.wait(1000)
        cy.get('[name="email"]').focus().type('12434444@gmail.com')
        cy.get('[name="password"]').focus().type('1234')
        cy.get('button').click()
    })
})