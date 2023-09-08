import ProductsPage from "../../../../support/pageObjects/ProductsPage";
import CartPage from "../../../../support/pageObjects/CartPage";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const cartPage = new CartPage();
const productsPage = new ProductsPage();
let minimumPriceIndex = 0;

Given("I add four random items to my Cart", function () {
  productsPage.getAddtocartButton().each(($el, index, list) => {
    if (index <= 3) {
      cy.get(".add_to_cart_button").eq(index).click();
      cy.wait(500);
    }
  });
});

When("I view my cart", function () {
  cy.get(".page_item").first().click();
});

Then("I find total four items in my cart", function () {
  cartPage.getProductList().should("have.length", "4");
});

When("I search for lowest price item", function () {
  const priceList = [];
  cartPage
    .getPriceList()
    .each(($el, index, $list) => {
      let price = $el.text().replace("$", "");
      cy.log(price);
      priceList.push(parseInt(price));
    })
    .then(() => {
      console.log(priceList);
      const minValue = Math.min(...priceList);
      let minIndex = priceList.indexOf(minValue);
      cy.log(minIndex);
      minimumPriceIndex = minIndex;
    });
});

When("I am able to remove the lowest price item from my cart", function () {
  cartPage.getRemoveButton().eq(minimumPriceIndex).click();
  cy.wait(500);
});

Then("I am able to verify three items in my cart", function () {
  cartPage.getProductList().should("have.length", "3");
});
