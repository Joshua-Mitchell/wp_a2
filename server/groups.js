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

    // Return all groups where the username exists (or according to role)
    this.getGroups = function(username, role = 0){
        let groups = [];
        //console.log(role);

        if(role === 2){
            // Just return every group and every channel
            for(let i = 0; i < data.groups.length; i++){
                let group = data.groups[i];
                group.channels = this.getChannels(username, group, role);
                group.role = 2;
                groups.push(group);
            }
        } else {   
            // Check for group admin
            for(let i = 0; i < data.groups.length; i++){
                let admins = data.groups[i].admins;
                for(let j = 0; j < admins.length; j++){
                    if(username === admins[j]){
                        data.groups[i].role = 1;
                        groups.push(data.groups[i]);
                    }
                }
            }

            // Check for membership
            for(let i = 0; i < data.groups.length; i++){
                let members = data.groups[i].members;
                for(let j = 0; j < members.length; j++){
                    if(username === members[j]){
                        data.groups[i].role = 0;
                        groups.push(data.groups[i]);
                    }
                }
            }

            // Grab the channels for each group
            for(let i = 0; i < groups.length; i++){
                let channels = getChannels(username, groups[i], groups[i].permissions);
                groups[i].channels = channels;
            }
        }
        return groups;
    };

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


        return channels;
    };
    return this;
};