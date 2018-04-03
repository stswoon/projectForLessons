import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ThreadsService} from "../thread/threads.service";

@Component({
  selector: "app-chat-thread-component",
  templateUrl: "./chat-thread-component.component.html",
  styleUrls: ["./chat-thread-component.component.css"]
})
export class ChatThreadComponentComponent implements OnInit {
  threads: Observable<any>;

  constructor(public threadService: ThreadsService) {
    this.threads = this.threadService.orderedThreads;
  }

  ngOnInit() {
  }

}
