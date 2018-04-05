import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {messageServiceInjectables} from "./message/messages.service";
import {threadServiceInjectables} from "./thread/threads.service";
import { ChatThreadComponentComponent } from './chat-thread-component/chat-thread-component.component';
import { SingleChatThreadComponentComponent } from './single-chat-thread-component/single-chat-thread-component.component';
import { ChatWindowComponentComponent } from './chat-window-component/chat-window-component.component';
import { ChatMessageComponentComponent } from './chat-message-component/chat-message-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatThreadComponentComponent,
    SingleChatThreadComponentComponent,
    ChatWindowComponentComponent,
    ChatMessageComponentComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    messageServiceInjectables, threadServiceInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
