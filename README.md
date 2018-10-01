# Web Programming Angular Chat App 
A chat system developed with angular, node and sockets for the web programming assignment.

This repository contains the src files of the project and the dist. The github repository was used to commit changes once a feature or project task was completed.

## Data Structure

The users information is stored in a class with the variables:
username - string
email - string
accessibleGroups - Group[]
superAdmin - boolean
groupAdmin - boolean
The accessibleGroups variable is an array of Groups objects. These group object contains the list of groups that the user has access to and the string array of channels that they have access to.

## Angular Architecture
The project contains 2 components, a login component and a chat component. The login routes to the chat component when the user enters their username. The chat component contains all of the other features, including the text message area and the side navigation bar with the list of channels and groups. 
A group service is used to return a list of all groups that are available
