import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {MessagesService} from "./message/messages.service";
import {ThreadsService} from "./thread/threads.service";
import {UsersService} from "./user/users.service";
import {ChatExampleData} from "./chatexampledata/chat-example-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public messageService: MessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService) {
    ChatExampleData.init(messageService, threadsService, usersService);
  }
}
