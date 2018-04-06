import {Component, OnInit, Input} from "@angular/core";
import {Message} from "../message/message.model";
import {User} from "../user/user.model";
import {UsersService} from "../user/users.service";

@Component({
  selector: "app-chat-message-component",
  templateUrl: "./chat-message-component.component.html",
  styleUrls: ["./chat-message-component.component.css"]
})
export class ChatMessageComponentComponent implements OnInit {
  @Input() message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public UserService: UsersService) {
  }

  ngOnInit(): void {
    this.UserService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
        if (this.message.author && user) {
          this.incoming = this.message.author.id !== user.id;
        }
      });
  }
}
