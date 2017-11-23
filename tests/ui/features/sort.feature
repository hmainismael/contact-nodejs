Feature: User can sort the displayed contacts by lastname
  As a user

  Scenario: User sort contacts by lastname
    Given The contact list is display but not sorted
    When User clicks on sort button
    Then Displayed contacts are sorted by lastname