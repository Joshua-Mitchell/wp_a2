// ============================================
// This module handles the login according to
// the data that is presented.
// ============================================

module.exports = function(){
    this.data;

    this.findUser = function(username, password){

        // this.MongoClient.connect(this.dbName, function(err, db) {
        //     const assert = require('assert');
        //     let dbo = db.db('chat');
        // });

        console.log("Password: ", password);
        let match = false;
        let users = data.users;

        for(let i = 0; i < users.length; i++) {
            if(users[i].username === username && users[i].password === password) {
                match = users[i];
            }
        }
        return match;
    };

    this.findUser = function(username){

        let match = false;
        let users = data.users;
        for (let i = 0; i < users.length; i++){
            if (users[i].username === username){
                match = users[i];
            }
        }
        return match;
    };

    // this.checkPassword = function(username, password) {
    //     let passCheck = false;
    //     if (users[])
    // }

    this.setUserData = function(data){
        this.data = data;
    };

    return this;
};