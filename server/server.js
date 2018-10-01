const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express(); 
const fs = require('fs');
const dataFile = './data.json';
const dataFormat = 'utf8';
const verbose = false;

// CORS
// We are enabling CORS so that our 'ng serve' Angular server can still access
// our Node server. 
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
app.use(cors(corsOptions));


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';

const dbName = 'chatDB';

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    if (err) {
        console.log(err)
    }
    console.log("Connected successfully to server");

    
    
    
    
    const db = client.db(dbName);
    let usersInit = [
        // users:[
            {username:"Josh", permissions:2, password:"123"},
            {username:"super", permissions:2, password:"123"},
            {username:"group", permission:1, password:"123"},
            {username:"ryoma", permissions:2, password:"123"}
        // groups:[
        //     {name:"2811ICT",admins:["super"],members:["member1","ryoma"]},
        //     {name:"1701ICT",admins:["group"],members:["member2"]}
        // ],
        // channels:[
        //     {name:"Events",group:"Griffith Innovate",members:["ryoma","member1","group"]},
        //     {name:"Admin Chat",group:"Griffith Innovate",members:["ryoma"]}
        // ]
        
    ];
    let groupsInit = [
        {name:"2811ICT",admins:["super"],members:["ryoma", "member1"]},
        {name:"1701ICT",admins:["group"],members:["member2"]}
    ];
    let channelInit = [
        {name:"Events",group:"Griffith Innovate",members:["ryoma","member1","group"]},
        {name:"Admin Chat",group:"Griffith Innovate",members:["ryoma"]}
    ];


    let superUser = {
        _id : "egergrsg",
        username : "super",
        password : "123",
        adminOf: [
            {group: "1701", role:0, channels: [
                {channel: "Lab"},
                {channel: "Lab2"},
                {channel: "lab3"}
            ]},
            {group: "1803", role:1, channels: [
                {channel: "Lab1"},
                {channel: "Lab2"}
            ]},
            {group: "1801", role:1, channels: [
                {channel: "Lab1"},
                {channel: "Lab"}
            ]}
        ],
        memberOf: [
            {}
        ]

    }

    let groupAdmin1 = {
        _id : "ssrgdrtg",
        username: "josh",
        password: "123",
        adminOf : [
            {group: "1801", role: 1, channels: [
                {channel: "Lab1"},
                {channel: "Lab2"}
            ]}
        ],
        memberOf : [
            {}
        ]
    }

    db.collection("users").drop(function(err, delOk) {
        if(err) {
            console.log("ERROR: failed drop collection users");
            if(verbose) console.log(err)
        }
        if(delOk) console.log("SUCCESS: dropped collection users");
    });

    db.collection("groups").drop(function(err, delOk) {
        if(err) {
            console.log("ERROR: failed drop collection groups");
            if(verbose) console.log(err)
        }
        if(delOk) console.log("SUCCESS: dropped collection groups");
    });

    db.collection("channels").drop(function(err, delOk) {
        if(err) {
            console.log("ERROR: failed drop collection channels");
            if(verbose) console.log(err)
        }
        if(delOk) console.log("SUCCESS: dropped collection channels");
    });

    db.createCollection("users", function(err, res) {
        if (err) {
            console.log("Error on creating users collection");
        } else {
            console.log("Sucessfully created collection users");
        }


    });

    db.createCollection("groups", function(err, res) {
        if (err) {
            console.log("Error on creating group collection");

        } else {
            console.log("Sucessfully create groups collection");
        }

    });

    db.createCollection("channels", function(err, res) {
        if (err) {
            console.log("Error on creating channels collection");
        } else {
            console.log("Sucessfully created collection channels");
        }

    });

    db.collection("users").insertOne(superUser, function(err, res){
        if (err) throw err;
        console.log("Inserted " + res.insertedCount + " documents to students");
    });

    db.collection("users").insertOne(groupAdmin1, function(err, res) {
        if (err) throw err;
        console.log("Inserted " + res.insertedCount + " documents to groups");
    });

    db.collection("channels").insertMany(channelInit, function(err, res) {
        if (err) throw err;
        console.log("Inserted " + res.insertedCount + " documents to channels");
    });



    client.close();

});

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic Routes
app.use(express.static(path.join(__dirname, '../angular-app/dist/angular-app')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../angular-app/dist/angular-app/index.html'))
});
app.get('/home', function(req,res){
    res.sendFile(path.join(__dirname,'../angular-app/dist/angular-app/index.html'))
});


// Login Module
const login = require('./login.js')();
const groups = require('./groups.js')();

// app.get('/db/install', function(req, client){
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         console.log("Connected to db");
//         let db = client.db("chat");
//     })
// });

app.post('/api/login', function(req, res){
    // read in the users data json object to get the username
    MongoClient.connect(url, function(err, client) {
        if (err) {
            console.log(err);
        }
        let db = client.db(dbName);
        // let username = db.collection.findOne(req.body.username);
        db.collection("users").findOne({"username": req.body.username}, function(err, data) {
            if(err) throw err;
            let obj = {
                "success": false
            }
            console.log("Data \n");
            console.log(data);
            if (data === null) {
                let obj = false;
                res.send(obj);
                
            } else{
                if(data.password === req.body.password){
                    obj.success = true;

                    //obj.groups = 
                    // db.collection("users").find({"adminOf" : {$all : []}}).toArray(function(err, groupsData){
                    //     if (err) throw err;
                    //     console.log("groups1: " + groupsData);
                    // });

                    //console.log();
                    //getGroups(username, res, dbo)
                    console.log("User : "+ data._id + 'logged in.');

                    
                    //console.log("group returned\n" + obj.groups);
                    console.log("Password correct");
                    
                } 
                res.send(data);
            }
            
            

            
            
            client.close();
        });

    });

});

// Group APIs
app.post('/api/groups', function(req,res){
    console.log('api groups called\n');
    let groupsList= [];
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        let db = client.db(dbName);
        let ObjectID = require('mongodb').ObjectID;
        groupsList = groups.getGroups(req.body.username, res, db);
        console.log('groups request from db\n');
        console.log(groupsList);
        client.close();
    });
    
    //res.send(groupslist);

    // We want to authenticate again -- usually you'd use a token
    // fs.readFile(dataFile, dataFormat, function(err, data){
    //     data = JSON.parse(data);
    //     let username = req.body.username; 
    //     login.data = data;
    //     let match = login.findUser(username);
        
    //     // Check to see if we got a match, get groups if true
    //     if(match !== false){
    //         groups.data = data;
    //         match.groups = groups.getGroups(username, match.permissions);
    //     }
    //     res.send(match);
    // });
});

app.delete('/api/group/delete/:groupname/:id', function(req, res){
    let groupName = req.params.groupname;
    console.log('Called groups delete api\n');
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        let db = client.db(dbName);
        let ObjectID = require('mongodb').ObjectID;
        db.collection("users").findOne({"_id" : req.params.id}, function(err, data) { 
            if (err) throw err;
            if (data === null) {
                console.log("\nCould find user to delete group\n");
            } else {
                db.collection("users").updateOne({"_id" : req.params.id}, {$pull : {"adminOf" : {"group" : groupName}}}, function(err, groupDelete) {
                    if (err) throw err;
                    
                    if (groupDelete.result.nModified === 1) {
                        res.send(data);
                    } else {
                        res.send(false);
                    }
                    console.log("Getting group data after delete\n");
                    console.log(groupDelete.result);
                });
                    
            }
            console.log("User found\n");
            console.log(data); 
            client.close();
        });

    });

    // Read the JSON file to get the current data
    // fs.readFile(dataFile, dataFormat, function(err, data){
    //     let readData = JSON.parse(data);
    //     groups.data = readData.groups;
    //     readData.groups = groups.deleteGroup(groupName);
    //     console.log(readData);
    //     let json = JSON.stringify(readData);

    //     // Write the updated data to JSON
    //     fs.writeFile(dataFile, json, dataFormat, function(err, d){
    //         res.send(true);
    //         console.log("Deleted group: " + groupName);
    //     });
    // });
});

app.post('/api/group/create', function(req, res){
    let groupName = req.body.newGroupName;
    if(groupName === '' || groupName === 'undefined' || groupName == null){
        res.send(false);
    } else {
        // Read the JSON file to get an updated list of groups
        fs.readFile(dataFile, dataFormat, function(err, data){
            let readData = JSON.parse(data);
            let g = readData.groups;
    
            let newGroup = {
                'name': req.body.newGroupName,
                'admins':[],
                'members':[]
            };
            g.push(newGroup);
            readData.groups = g;
            let json = JSON.stringify(readData);
            
            // Write the updated data to the JSON file.
            fs.writeFile(dataFile, json, dataFormat, function(err, data){
                res.send(true);
                console.log("Created new group: " + req.body.newGroupName);
            });
        });
    }
});

app.post('/api/channel/create', function(req, res){
    let channelName = req.body.newChannelName;
    let selectedGroup = req.body.selectedGroup;
    let member = req.body.member;
    if(channelName === '' || channelName === 'undefined' || channelName == null){
        res.send(false);
    } else {
        // Read the JSON file to get an updated list of groups
        fs.readFile(dataFile, dataFormat, function(err, data){
            let readData = JSON.parse(data);
            let c = readData.channels;
    
            let newChannel = {
                'name': req.body.newChannelName,
                'group': selectedGroup,
                'members':[]
            };
            console.log(newChannel);
            c.push(newChannel);
            readData.channels = c;
            let json = JSON.stringify(readData);
            
            // Write the updated data to the JSON file.
            fs.writeFile(dataFile, json, dataFormat, function(err, data){
                res.send(true);
                console.log("Created new channel: " + req.body.newChannelName);
            });
        });
    }
});

app.post('/api/channels', function(req,res){
    // We want to authenticate again -- usually you'd use a token
    fs.readFile(dataFile, dataFormat, function(err, data){
        data = JSON.parse(data);
        let username = req.body.username; 
        let group = req.body.group;
        login.data = data;
        let match = login.findUser(username);
        console.log("Username:" + username);
        console.log("Match:" + match);
        
        // Check to see if we got a match, get channels if true
        if(match !== false){
            groups.data = data;
            match.groups = groups.getChannels(username, group, match.permissions);
        }
        res.send(match);
    });
});


 


// HTTP Listener
app.listen(3000, function(){
    console.log('Server running');
})
module.exports = app;