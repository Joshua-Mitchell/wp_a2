# Web Programming Angular Chat App 
A chat system developed with angular, node and sockets for the web programming assignment.

This repository contains the src files of the project. 

## Data Structure
Users are stored in a mongo database in a single collection. The users collection contains an array of documents with all the individual users information. Including username, password, adminOf and memberOf. adminOf is an array of groups that the user has access to, with that groups array of channels. The channels array contains the channel name and an array of messages stored for that channel.

## Git 
My git repositories layout consists of the node server javascript files without the node module dependancies folder. The angular front end's source files are contained within the repository.
My approach to version control to push a commit to the repository once I've completed some task for the assignment. For example, this could be adding editing functionality to group or channel names, deleting channels or groups, or displaying messages on the messages component.
## REST API
### /api/login
parameters:
  username, password
Returns the user object

This route handles retrieving the user intially from the database. The route first checks that the username is contained within the database. If so, the password is then checked. If both are correct, then the user is logged into home page by sending the user object to the login component. The receiving observer on the front-end stores the user object in session storage and navigates the user to the home page.

### /api/group/delete/:groupname/:id
parameters
  groupName, id
 Returns:
  updated user object
 This route handles deleting groups from the database. It sends the user id and the groupName that is to be deleted. The group is deleted with the following query:
 {"_id" : req.params.id}, {$pull : {"adminOf" : {"group" : groupName}}}
 The new user object is then returned back to the front end
 
 ### /api/group/create
 parameters:
  newGroupName, id
  returns:
    updated user object
 This route adds a new group to the database and returns the update user object
 
 ### /api/channel/delete/:channelName/:groupName/:id
 
 parameters:
  channelName, groupName, id
 returns:
  updated user object
 This route deletes the specfied channel from the database contained within the specified group
 
 ### /api/channel/create
 parameters:
  newChannelName, selectedGroup, id
 returns:
  updated user object
 This route adds a new channel to the database within the selected group and returns the update user object
 

## Angular Architecture
The chat-app contains 4 components and 2 services. 
A login component displays the login page and is the default, first page to be displayed to the user. It consists of username and password input with a login button. If the users credentials are found in the mongo database and are correct, the users information will be retrieved from the database and stored in session storage. The user is then navigated to the home component page.
The home component contains the majority of the web site functionality. Here the list of groups, channels and users are displayed. And they can all be edited, deleted (if user has access) and created. The chat component is also displayed here. The user can enter messages to broadcast to all other members.

The group service handles all post, get and delete route calls for groups and channels.
The user service handles the login routes and sets the intial user detail in session storage when they log in.

The project contains 2 components, a login component and a chat component. The login routes to the chat component when the user enters their username. The chat component contains all of the other features, including the text message area and the side navigation bar with the list of channels and groups. 
A group service is used to return a list of all groups that are available
