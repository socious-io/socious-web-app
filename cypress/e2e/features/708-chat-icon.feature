Feature: Chat icon on profiles

Scenario: Umaya sends message to OceanProtection
	Given Umaya is viewing OceanProtection's profile
	When Umaya clicks on the chat icon
	Then Umaya sees a chat window with OceanProtection

Scenario: OceanProtection sends message to Umaya
	Given OceanProtection is viewing Umaya's profile
	When OceanProtection clicks on the chat icon
	Then OceanProtection sees a chat window with Umaya

Scenario: Umaya sends message to Harry
	Given Umaya is viewing Harry's profile
  And Harry follows Umaya
  And Umaya follows Harry
	When Umaya clicks on the chat icon
	Then Umaya sees a chat window with Harry
