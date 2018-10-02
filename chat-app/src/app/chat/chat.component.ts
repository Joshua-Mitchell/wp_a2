import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() channel;

  @Output() sendMessage: EventEmitter<string> = new EventEmitter();
  public message: string;

  constructor() { }

  ngOnInit() {
  }

  enteredMessage(message) {
    this.sendMessage.emit(message);
  }

}
