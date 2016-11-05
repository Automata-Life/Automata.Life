Feature: Rocking with lettuce and django

    Scenario: Simple Hello World
        Given I access the url "/automata_life/"
        When I look at the page
        Then I see the text "Follow your heart."
