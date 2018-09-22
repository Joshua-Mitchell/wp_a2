# Summary
The server files are largely spread out between three main files:
* server.js
* login.js
* groups.js

## server.js
**server.js** is the main file that will run the server. It also instantiates the two other files as modules. 


## login.js
This module is purely for finding the user from the **this.data** array of users. The data member variable must be set before **findUser()** is run. This can be done by either settings it externally (as the **data** member variable is public) or through the function **setData()**. 

**findUser()** will search through the data and see if a match exists between the username and the list of users. If a user exists, the function will return the user object. If there is no match, the function will return **false**. 

## groups.js
This module is responsbile for CRUD on the groups as well as returning the groups (and subsequently, the channels) associated with the user. 

**deleteGroup(name)**: given a name for the group, this function will delete the group from the **data** list. It will return the new list if a group with the given name eixsts. If no group is found, the function will return a **false**. 

**getGroups(username, [role])**: given a username and an optional role parameter, the function will return all the groups and channels associated with the username. Roles are categories as:
* 0: user
* 1: group admin
* 2: super admin
If a user is a super admin (2), then all groups are returned with all channels. Otherwise, the function will go through all the groups and add the groups that the user is associated with. Afterwhich it will then go through and grab all the channels for each group that the user has access to. 

**getChannels(username, group, role)**: Given a username, group and role, the function will search through the channels for channels associated with the group. It will then look to see if the user has access to the channel. 


# Routes
The main **get** routes for this are the root directory and **/home**. Both point to the **dist/index.html** in the Angular app folder. To do so, an express static route is also established. 
**host/**: serves ../angular-app/dist/angular-app/index.html
**host/home**: serves ../angular-app/dist/angular-app/index.html

## API
The node server has a number of APIs available for the Angular app to use. 

### Login
**[POST] host/api/login**: This API is used for logging into the system. As per assignment specification, the login feature only requires the username and does not check for a password. It will call the findUser() function from the login module and then get all the groups using the group module. This route will return the following data structure:
{
    "username": "userName",
    "permissions": 1,
    "groups": [
        {
            "name": "groupName",
            "admins": ['userName1',..., 'userNameN'],
            "members":['userName1', ..., 'userNameN'],
            "channels":[
                {
                    "name": "channelName",
                    "group": "groupName",
                    "members":["userName1", ... , "userNameN"]
                }
            ],
            "role": 2
        }
    ]
}
The strategy here is to return a user object with the user details. This user object will contain the groups that the user is associated with as an array of objects. Inside each group object, the channels that the user is associated with is also included. This allows for all the data to be passed to the Angular application at login. 

### Group
The group APIs handle the read, create and delete for groups in the JSON file. 

**[POST] host/api/groups**: This API will return all the groups associated with the username that is sent in the post body. This was done as a post for authentication purposes. The post body must have a **username** key value pair. This will be searched against the list of known usernames and then retrieve the groups according to the user's access. If the authentication fails (i.e. the user does not exist), then the API will return a **false**. Once the new group is created in the array, this is then written to the JSON file. 

**[POST] host/api/group/create**: This API will return a true if the server is able to successfully create a new group. This function also uses the post method and requires **newGroupName** to be in the request body. It is recommended to update this code so that it also checks for username to make sure that the user has permission to create new groups. Once the new group object is instantiated and added to the current array of groups, the data is written to the JSON file. This method returns **true** or **false** depending on the success of the request. 

**[DELETE] host/api/group/delete/:groupname**: This API will delete a group from the current list of groups. Currently only returns **true** if it was successful.
This function should be updated to return **false** if it was unable to delete the group.

### User 
User routes have not been created for this demonstration. Students should create their own in a similar vein to the Group routes.

## Channels
Channel routes have not been cretead for this demonstration. Students should create their own in a similar vein to the Group routes. 