import {Component, Input, OnInit} from "@angular/core";
import {Thread} from "../thread/thread.model";
import {ThreadsService} from "../thread/threads.service";

@Component({
  selector: "app-single-chat-thread-component",
  templateUrl: "./single-chat-thread-component.component.html",
  styleUrls: ["./single-chat-thread-component.component.css"]
})
export class SingleChatThreadComponentComponent implements OnInit {
  @Input() thread: Thread;
  selected: Boolean = false;

  constructor(public threadService: ThreadsService) {
  }

  ngOnInit(): void {
    this.threadService.currentThread
      .subscribe((currentThread: Thread) => {
        this.selected = currentThread && this.thread && (currentThread.id === this.thread.id);
      });
  }

  clicked(event: any): void {
    this.threadService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
