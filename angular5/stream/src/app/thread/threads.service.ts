import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {combineLatest} from "rxjs/observable/combineLatest";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/map";

import {Thread} from "./thread.model";
import {MessagesService} from "../message/messages.service";
import {Message} from "../message/message.model";

export interface ThreadMap {
  [key: string]: Thread;
}

@Injectable()
export class ThreadsService {
  threads: Observable<ThreadMap>;
  orderedThreads: Observable<Thread[]>;
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
  currentThreadMessages: Observable<Message[]>;

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

    this.orderedThreads = this.threads
      .map((threadGroups: ThreadMap) => {
        const threads: Thread[] = Object.values(threadGroups);
        return threads.sort((t1: Thread, t2: Thread) => {
          return t1.lastMessage.sentAt.getTime() - t2.lastMessage.sentAt.getTime();
        });
      });

    this.currentThreadMessages = combineLatest(
      this.currentThread,
      this.currentThreadMessages,
      (currentThread: Thread, messages: Message[]) => {
        if (this.currentThread && messages.length > 0) {
          return messages
            .filter((message: Message) => message.thread.id === currentThread.id)
            .map((message: Message) => {
              message.read = true;
              return message;
            });
        } else {
          return [];
        }
      });
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}

export const threadServiceInjectables: Array<any> = [ThreadsService];
