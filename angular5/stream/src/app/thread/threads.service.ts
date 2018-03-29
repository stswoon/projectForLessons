import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

import {Thread} from "./thread.model";
import {MessagesService} from "../message/messages.service";
import {Message} from "../message/message.model";

export interface ThreadMap { [key: string]: Thread; }

@Injectable()
export class ThreadsService {
  threads: Observable<ThreadMap>;

  constructor(private messagesService: MessagesService) {
    this.threads = messagesService.messages
      .map((messages: Message[]) => {
        const threads: ThreadMap = {};
        messages.map((message: Message) => {
          // cache last message
          threads[message.thread.id] = threads[message.thread.id] || message.thread;
          const messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      });
  }
}

export const threadServiceInjectables: Array<any> = [ThreadsService];
