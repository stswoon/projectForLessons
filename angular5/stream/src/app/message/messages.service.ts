import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {User} from "./user.model";
import {Message} from "./message.model";
import {Observable} from "rxjs/Observable";

const initMessages: Message[] = [];

interface MessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>(); // publish new messages only once
  messages: Observable<Message[]>; // emits of the most up to date messages
  updates: Subject<any> = new Subject<any>(); // receives operations to be applied to messages

  // actions:
  creates: Subject<Message> = new Subject<Message>();
  makeThreadAsRead: Subject<any> = new Subject<any>();

  cunstructor() {
    this.messages = this.updates
      .scan((messages: Message[], operation: MessagesOperation) => operation(messages), initMessages) // reduce messages thought updates operations in stream way
      .publishReplay(1) // lat message should be available to any subscriber
      .refCount(); //share stream to several subscribers

    //todo
  }
}

export const messageServiceInjectables: Array<any> = [MessagesService];
