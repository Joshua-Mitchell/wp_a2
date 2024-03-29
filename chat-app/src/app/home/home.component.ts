import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { GroupService } from '../group.service';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ChatService]
})
export class HomeComponent implements OnInit {
  public user;
  public selectedGroup;
  public selectedChannel;
  public groups = [];
  public channels = [];
  public newGroupName: String;
  public newChannelName: String;

  messageArray: Array<{user: String, message: String}> = [{user:"super", message:"hello"}, {user:"super", message:"hello again"}];
  constructor(private router: Router, private _groupService: GroupService, private _chatService: ChatService) {

    this._chatService.newUserJoined().subscribe(data => {
      console.log('new user joined');
      console.log(data);
      this.messageArray.push(data);
    });

    this._chatService.newMessageReceived().subscribe(data => {
      console.log('new message');
      console.log(data);
      this.messageArray.push(data);


    });


  }

  ngOnInit() {
    if (sessionStorage.getItem('user') === null) {
      // User has not logged in, reroute to login
      this.router.navigate(['/login']);
    } else {
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.user = user;
      console.log('user object recevied\n');
      console.log(this.user);
      this.groups = user.adminOf;
      console.log("\nAdmin of: \n");
      console.log(this.groups);
      // console.log("group objects received" + user);
      if (this.groups.length > 0) {
        // open the first group and display it's channels
        this.openGroup(this.groups[0].group);

        if (this.groups[0].channels.length > 0) {
          console.log("set intial channels list to first group's\n");
          this.channelChangedHandler(this.groups[0].channels[0].channel);
        }
      }
    }
  }

  createChannel(event) {
    event.preventDefault();
    console.log('new channel name ' + this.newChannelName);
    let createChannelData = {
      'newChannelName': this.newChannelName,
      'selectedGroup': this.selectedGroup.group,
      '_id' : this.user._id,
      'member': JSON.parse(sessionStorage.getItem('user')).username
    };

    this._groupService.createChannel(createChannelData).subscribe(
      data => {
        if (data !== false) {

        // update the user stored in sessionstorage
          let temp = JSON.stringify(data);
          sessionStorage.setItem('user', temp);
          this.user = data;
          console.log(data);
          this.groups = data.adminOf;
          if (this.groups.length > 0) {
            console.log(this.groups);
            //this.selectedGroup = this.selectedGroup;
            this.openGroup(this.selectedGroup.group);
            this.channels = this.selectedGroup.channels;
          }
        } else {
          console.log('channel was not created');
          alert("The channel was not created.\nThis may be because no channel name was given");
        }

        //this.getChannels(this.selectedGroup.name);
      },
      error => {
        console.error(error);
      }
    );
  }

  createGroup(event) {
    event.preventDefault();
    let data = {'newGroupName': this.newGroupName, '_id' : this.user._id};
    this._groupService.createGroup(data).subscribe(
      data => {
        if (data !== false) {

          // update the user stored in sessionstorage
          let temp = JSON.stringify(data);
          sessionStorage.setItem('user', temp);
          this.user = data;
          console.log(data);

          this.groups = data.adminOf;
          if (this.groups.length > 0) {
            console.log(this.groups);
            this.selectedGroup = this.groups[0];
            this.channels = this.selectedGroup.channels;
          } else {
            console.log('there are no groups remaining\n');
          }


        } else {
          console.log('group ' + this.newGroupName + 'was not created :(\n');
          alert("The group was not created.\nThis may be because no group name was given");
        }

      },
      error => {
        console.error(error);
      }
    );
  }

  deleteGroup(groupName) {
    this._groupService.deleteGroup(groupName, this.user._id).subscribe(
      data => {
        if (data !== false) {

          // update the user stored in sessionstorage
          let temp = JSON.stringify(data);
          sessionStorage.setItem('user', temp);
          this.user = data;
          console.log(data);

          this.groups = data.adminOf;
          if (this.groups.length > 0) {
            console.log(this.groups);
            this.selectedGroup = this.groups[0];
            this.channels = this.selectedGroup.channels;
          } else {
            console.log('there are no groups remaining\n');
          }

        } else {
          console.log('group was not deleted\n');
        }

      }, error => {
        console.error(error);
      }
    );
  }


  getGroups() {

    console.log('get Groups function\n');
    const data = {
      'username' : this.user.username
    };
    this._groupService.getGroups(data).subscribe(
      d => {
        console.log('getGroups()');
        console.log(d);


      },
      error => {
        console.error(error);
      }
    );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  navSettings() {
    this.router.navigate(['/userSettings']);
  }

  // Determine which group is currently selected and pass onto the child panel
  openGroup(name) {
    console.log(name);
    // iterate through all the groups to find it index
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].group === name) {
        console.log('group ' + i + '\n');
        console.log(this.groups[i]);
        this.selectedGroup = this.groups[i];
      }
    }
    this.channels = this.selectedGroup.channels;
    this.selectedChannel = this.selectedGroup.channels[0];

    console.log("Channels of Selected Group\n");
    console.log(this.channels);
  }


  // Responsible for handling the event call by the child component
  channelChangedHandler(name) {
    //name = "Lab2";
    console.log('channel name selected : ' + name);
    let found: boolean = false;
    console.log('Entered channelChangedHandler');
    // iterate through channels to find it index
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].channel === name) {
        console.log("channel " + i);
        console.log(this.channels[i].channel);
        this.selectedChannel = this.channels[i];
        found = true;
        this.joinChannel();
      }
    }
    return found;
  }


  deleteChannelHandler(name) {
    console.log('channel selected to delete: ' + name);
    // call api route to delete channel
    this._groupService.deleteChannel(name, this.selectedGroup.group, this.user._id).subscribe(
      data => {
        if (data !== false) {
          // update user object in session storage
          let temp = JSON.stringify(data);
          sessionStorage.setItem('user', temp);
          this.user = data;
          console.log(data);

          this.groups = data.adminOf;
          if (this.groups.length > 0) {
            console.log(this.groups);
            //this.selectedGroup = this.selectedGroup;
            this.openGroup(this.selectedGroup.group);
            this.channels = this.selectedGroup.channels;
          }

        } else {
          console.log('channel was not deleted\n');
        }

      }, error => {
        console.error(error);
      }
    );
  }

  getChannels(groupName) {
    // let data = {
    //   'username': JSON.parse(sessionStorage.getItem('user')).username,
    //   'group': groupName,

    // };
    // this._groupService.getChannels(data).subscribe (
    //   d => {
    //     console.log('getChannels()');
    //     console.log(d);
    //     this.channels = d['channels'];
    //     console.log(this.channels);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );

    //return channels;
  }
  joinChannel() {
    //console.log('join channel called');
    this._chatService.joinChannel({username: this.user.username, selectedChannel: this.selectedChannel.channel, selectedGroup: this.selectedGroup.group});
  }


  enteredMessage(message) {
    // calls route to send messages to joined users
    console.log('message entered ' + message);
    let messageObj = {
      'message' : message,
      '_id' : this.user._id,
      'groupName' : this.selectedGroup.group
    };
    this._chatService.sendMessage({username: this.user.username, selectedChannel: this.selectedChannel.channel, selectedGroup: this.selectedGroup.group, message:message});


  }
}
