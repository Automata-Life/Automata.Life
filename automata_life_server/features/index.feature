Feature: Rocking with lettuce and django

    Scenario: Simple Hello World
        Given I access the url "/"
        When I look at the page
        Then I see the text "Hello, World!"
