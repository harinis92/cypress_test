Feature: End to end validation

    @Regression
    Scenario: Add and verify the products in the cart
        Given  I add four random items to my Cart
        When I view my cart
        Then I find total four items in my cart
        When I search for lowest price item
        And I am able to remove the lowest price item from my cart
        Then I am able to verify three items in my cart