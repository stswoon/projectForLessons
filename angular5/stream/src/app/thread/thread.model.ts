import {uuid} from "../util/uuid";
import {Message} from "../message/message.model";

export class Thread {
  id: string;
  lastMessage: Message;
  name: string;


  constructor(id?: string, name?: string) {
    this.id = id || uuid();
    this.name = name;
  }
}
