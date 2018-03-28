import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/publishReplay";

import {Message} from "./message.model";
import {Thread} from "../thread/thread.model";
import {User} from "../user/user.model";

const initMessages: Message[] = [];

type MessagesOperation = (messages: Message[]) => Message[];

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>(); // publish new messages only once
  messages: Observable<Message[]>; // emits of the most up to date messages
  updates: Subject<any> = new Subject<any>(); // receives operations to be applied to messages

  // actions:
  creates: Subject<Message> = new Subject<Message>();
  makeThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates
    // reduce messages thought updates operations in stream way
      .scan((messages: Message[], operation: MessagesOperation) => {
        return operation(messages);
      }, initMessages)
      .publishReplay(1) // last message should be available to any subscriber
      .refCount(); // share stream to several subscribers

    // takes message, create an operation which concat message, subscribe updates to this
    this.creates
      .map(
        function (message: Message): MessagesOperation {
          return (messages: Message[]) => {
            return messages.concat(message);
          };
        }
      )
      .subscribe(this.updates);

    // similarly makeThreadAsRead takes Thread, create an operation, subscribe update
    this.makeThreadAsRead
      .map((thread: Thread) => (messages: Message[]) => messages.map((message: Message) => {
        if (message.thread.id === thread.id) {
          message.read = true;
        }
        return message;
      }))
      .subscribe(this.updates);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  getMessagesByThreadAndNotUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .filter((message: Message) => message.thread.id === thread.id && message.author.id !== user.id);
  }
}

export const messageServiceInjectables: Array<any> = [MessagesService];
