import {Thread} from "../thread/thread.model";
import {User} from "../user/user.model";
import {uuid} from "../util/uuid";

export class Message {
  id: string;
  read: boolean;
  sentAt: Date;
  text: string;
  author: User;
  thread: Thread;


  constructor(obj?: any) {
    this.id = obj && obj.id || uuid();
    this.read = obj && obj.read || false;
    this.sentAt = obj && obj.sentAt || new Date();
    this.text = obj && obj.text || null;
    this.author = obj && obj.author || null;
    this.thread = obj && obj.thread || null;
  }
}
