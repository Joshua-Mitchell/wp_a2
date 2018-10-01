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
## Git 
My git repositories layout consists of the node server javascript files without the node module dependancies folder. The angular front end's source files are contained within the repository.
My approach to version control to push a commit to the repository once I've completed some task for the assignment. For example, this could be adding editing functionality to group or channel names, deleting channels or groups, or displaying messages on the messages component.
## REST API

## Angular Architecture
The chat-app contains 4 components and 2 services. 
A login component displays the login page and is the default, first page to be displayed to the user. It consists of username and password input with a login button. If the users credentials are found in the mongo database and are correct, the users information will be retrieved from the database and stored in session storage. The user is then navigated to the home component page.

The project contains 2 components, a login component and a chat component. The login routes to the chat component when the user enters their username. The chat component contains all of the other features, including the text message area and the side navigation bar with the list of channels and groups. 
A group service is used to return a list of all groups that are available
