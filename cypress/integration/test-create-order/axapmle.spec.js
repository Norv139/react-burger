/// <reference types="cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
context('Тест функционал создания заказа', ()=>{

    // it('login',()=>{
    //     cy.visit('http://localhost:3000/login')
        
    // })

    it( 'перетаскивание ингредиента в конструктор', ()=>{
        cy.visit('http://localhost:3000/')
        cy.wait(1000)
        cy.get('[data-at="ingredient"]').first().trigger('dragstart')
        cy.get('[data-at="drop"]').trigger('drop')
        cy.wait(1000)
        cy.get('[data-at="ingredient"]').contains('Мясо бессмертных').trigger('dragstart')
        cy.get('[data-at="drop"]').trigger('drop')
    })

    it('Замена булки (перетаскивание ингредиента в конструктор)', ()=>{
        cy.get('[data-at="ingredient"]').contains('Флюоресцентная булка').trigger('dragstart')
        cy.get('[data-at="drop"]').trigger('drop')
    })

    it('Открытие/закрытие модального окна с описанием ингредиента и отображение данных ингредиента', ()=>{
        cy.get('[data-at="ingredient"]').contains('Мясо бессмертных').click()
        cy.wait(1000)
        cy.get('[data-at="btnClose"]').click({force: true})
        cy.wait(1000)
    })

    it('Открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»',()=>{
        cy.get('[data-at="btn-order"]').click()
        cy.wait(1000)
        cy.get('[name="email"]').focus().type('numbernine726@gmail.com')
        cy.get('[name="password"]').focus().type('Very_hard_pa55w0rd')
        cy.get('button').click()
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('getOrders')
        cy.wait('@getOrders')

        
    })
    it('Закрытие модальных окон при клике на кнопку закрытия.', ()=>{
        cy.wait(2000)
        cy.get('[data-at="btnClose"]').click({force: true})
    })

    
})