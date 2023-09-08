class CartPage {
  getPriceList() {
    return cy.get("tr td:nth-child(4)");
  }

  getRemoveButton() {
    return cy.get("tr td:nth-child(1) a");
  }

  getProductList() {
    return cy.get("tr td:nth-child(3)");
  }
}

export default CartPage;
