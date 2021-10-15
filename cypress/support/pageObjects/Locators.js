class Locators{

    getLargeSize(){
        return cy.get('input[value="L"]')
    }

    getMediumSize(){
        return cy.get('input[value="M"]')
    }

    getSmallSize(){
        return cy.get('input[value="S"]')
    }

    getShirtResults(){
        return cy.get('.shelf-container').find('.shelf-item')
    }

    getCartItems(){
        return  cy.get('.float-cart__shelf-container').find('.shelf-item')
    }

    getBuyButton(){
        return cy.get('.buy-btn')
    }

    getSelectDropDown(){
        return cy.get('select')
    }

    getCartItemsDeleteButton(){
        return cy.get('.float-cart__shelf-container').find('.shelf-item__del')
    }

    getCart(){
        return cy.get('.float-cart__shelf-container')
    }
}

export default Locators