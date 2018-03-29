import {User} from "../user/user.model";
import {Thread} from "../thread/thread.model";
import {Message} from "./message.model";
import {MessagesService} from "./messages.service";

describe("MessageService", () => {
  it("Should test", () => {
    const user: User = new User("Nate");
    const thread: Thread = new Thread("t1", "Nate");
    const m1: Message = new Message({author: user, text: "Hi!", thread});
    const m2: Message = new Message({author: user, text: "Bye!", thread});

    const messagesService: MessagesService = new MessagesService();
    messagesService.newMessages.subscribe((message: Message) => {
      console.log("New message: " + message.text);
    });
    messagesService.messages.subscribe((messages: Message[]) => {
      console.log("=> Messages length: " + messages.length);
    });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);
  });
});
