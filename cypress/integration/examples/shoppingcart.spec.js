import Locators from '../../support/pageObjects/Locators';
const locators=new Locators();

describe('React Shopping Cart Test Suite', function()
{
  
    it('Buy a Large size T-Shirt having a name Crazy Monkey',function() {
    
    cy.visit(Cypress.env('url'))
    cy.wait(1000)

    locators.getLargeSize().click({force: true})  
    cy.wait(3000)
    locators.getShirtResults().should('have.length',10)

    locators.getShirtResults().each(($el,index,$list) => {

    const shirtName=$el.find('p.shelf-item__title').text()
    if(shirtName.includes('Crazy Monkey'))
    {
    $el.find('.shelf-item__buy-btn').click()
    }
    })
    locators.getCartItems().should('have.length',1)
    locators.getCartItems().contains('Crazy Monkey')
    
    locators.getBuyButton().click()

    })


    it('Sort the shirts by the price value',function() {
        
        cy.visit(Cypress.env('url'))

        locators.getSelectDropDown().select('Lowest to highest')
        cy.wait(1000)
        locators.getSelectDropDown().select('Highest to lowest')
    })


    it('Modify the cart items by add/delete', function(){

        cy.visit(Cypress.env('url'))
        cy.wait(1000)

        locators.getLargeSize().click({force: true})  
        locators.getShirtResults().eq(0).contains('Add to cart').click()

        locators.getCart().find('.change-product-button').contains('+').click()
        locators.getCartItems().contains('2')
        locators.getCart().find('.change-product-button').contains('-').click()
        locators.getCartItems().contains('1')

        locators.getCartItemsDeleteButton().click()

        locators.getCart().should('have.text','Add some products in the cart :)')

    })


    it('Validate the cart subtotal based on the items added', function(){

        cy.visit(Cypress.env('url'))
        cy.wait(1000)

        locators.getLargeSize().click({force: true})  
        cy.wait(2000)
        locators.getShirtResults().eq(0).contains('Add to cart').click()
        locators.getLargeSize().click({force: true})  
        cy.wait(2000)

        locators.getSmallSize().click({force: true})  
        cy.wait(2000)
        locators.getShirtResults().eq(0).contains('Add to cart').click()
        locators.getSmallSize().click({force: true})  
        cy.wait(2000)

        locators.getMediumSize().click({force: true})  
        cy.wait(2000)
        locators.getShirtResults().eq(0).contains('Add to cart').click()
        locators.getMediumSize().click({force: true})  

    
        //Calculate the sum of the items 
        var totalPriceCalculated=0

        cy.get('.float-cart__shelf-container').find('.shelf-item').each(($el,index,$list)=>{

            const priceText = $el.find('.shelf-item__price').find('p').text()
            var price=Number(priceText.replace( /^\D+/g, ''))
            totalPriceCalculated=totalPriceCalculated+price

        }).then(function()
        {
            cy.log(totalPriceCalculated)
        })

        //Compare the calculated total with the displayed total  in the cart
        cy.get('.sub-price__val').then(function(element){

            const total_amount = element.text()
            var total_amount_displayed = Number(total_amount.replace( /^\D+/g, ''))
            var finalSum=total_amount_displayed.toFixed(0)
            expect(finalSum).to.equal(totalPriceCalculated.toFixed(0))

        })
    })

    it('Give Star on the github',function(){

        cy.visit(Cypress.env('url'))
        cy.wait(1000)

        cy.get('a')
        .invoke('attr', 'href')
        .then(href => {
          cy.request(href);
        });

    })

})
