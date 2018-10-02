// ============================================
// This module is responsible for joining the user's 
// groups and channels according to the user's 
// responsibilities
// ============================================
module.exports = function(){
    this.username;
    this.data;
    
    // Find and delete a group by matching groupName to available data in this.data
    this.deleteGroup = function(groupName){
        let found = false;
        //console.log(this.data);
        for(let i = 0; i < this.data.length; i++){
            if(this.data[i].name === groupName){
                found = true;
                this.data.splice(i, 1);
                return this.data
            }
        }
        return found;
    };
    this.getGroups = function(username, res, db) {
        let groups = [];
        let query = {};
        console.log("user " + username);
        
        db.collection("users").find({"username":username}).toArray(function(err, groups) { // , {"adminOf.group":1}
            // groups = JSON.stringify(groups)
            console.log('Group query: \n');
            console.log(groups);
            res.send(groups);
            return groups;
            
        });
        //res.send(groups);
        

    }

    

    // Get all the channels a user has access for a given group and role
    this.getChannels = function(username, group, role){
        channels = [];
        // Go through all the channels
        for(let i = 0; i < data.channels.length; i++){
            // Check to see if the channel matches the current group
            if(data.channels[i].group === group.name){
                if(role >= 2 || group.role >= 1){
                    channels.push(data.channels[i]);
                } else {
                    // Channel belongs to group, check for access
                    let channel = data.channels[i];
                    for(let j = 0; j < channel.members.length; j++){
                        if(username === channel.members[j]){
                            channels.push(channel);
                        }
                    }
                }
            }
        }

        console.log("Channels", channels);
        return channels;
    };
    return this;
};