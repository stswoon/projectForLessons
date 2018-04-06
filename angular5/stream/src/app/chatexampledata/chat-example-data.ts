//get from https://github.com/ng-book/angular2-rxjs-chat/tree/master/src/app

import {UsersService} from "../user/users.service";
import {ThreadsService} from "../thread/threads.service";
import {MessagesService} from "../message/messages.service";
import {Message} from "../message/message.model";
import * as moment from 'moment';
import {Thread} from "../thread/thread.model";
import {User} from "../user/user.model";

const me: User = new User("Juliet");
const ladycap: User = new User("Lady Capulet");
const echo: User = new User("Echo Bot");
const rev: User = new User("Reverse Bot");
const wait: User = new User("Waiting Bot");

const tLadycap: Thread = new Thread("tLadycap", ladycap.name);
const tEcho: Thread = new Thread("tEcho", echo.name);
const tRev: Thread = new Thread("tRev", rev.name);
const tWait: Thread = new Thread("tWait", wait.name);

const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, "minutes").toDate(),
    text: "Yet let me weep for such a feeling loss.",
    thread: tLadycap
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, "minutes").toDate(),
    text: "So shall you feel the loss, but not the friend which you weep for.",
    thread: tLadycap
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, "minutes").toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, "minutes").toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: tRev
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, "minutes").toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

export class ChatExampleData {
  static init(messagesService: MessagesService,
              threadsService: ThreadsService,
              UsersService: UsersService): void {

    // TODO make `messages` hot
    messagesService.messages.subscribe(() => ({}));

    // set "Juliet" as the current user
    UsersService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map((message: Message) => messagesService.addMessage(message));

    threadsService.setCurrentThread(tEcho);

    this.setupBots(messagesService);
  }

  static setupBots(messagesService: MessagesService): void {

    // echo bot
    messagesService.getMessagesByThreadAndNotUser(tEcho, echo)
      .forEach((message: Message): void => {
          messagesService.addMessage(
            new Message({
              author: echo,
              text: message.text,
              thread: tEcho
            })
          );
        },
        null);


    // reverse bot
    messagesService.getMessagesByThreadAndNotUser(tRev, rev)
      .forEach((message: Message): void => {
          messagesService.addMessage(
            new Message({
              author: rev,
              text: message.text.split("").reverse().join(""),
              thread: tRev
            })
          );
        },
        null);

    // waiting bot
    messagesService.getMessagesByThreadAndNotUser(tWait, wait)
      .forEach((message: Message): void => {

          let waitTime: number = parseInt(message.text, 10);
          let reply: string;

          if (isNaN(waitTime)) {
            waitTime = 0;
            reply = `I didn\'t understand ${message.text}. Try sending me a number`;
          } else {
            reply = `I waited ${waitTime} seconds to send you this.`;
          }

          setTimeout(
            () => {
              messagesService.addMessage(
                new Message({
                  author: wait,
                  text: reply,
                  thread: tWait
                })
              );
            },
            waitTime * 1000);
        },
        null);
  }
}
