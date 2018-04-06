import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {messageServiceInjectables} from "./message/messages.service";
import {threadServiceInjectables} from "./thread/threads.service";
import { ChatThreadComponentComponent } from "./chat-thread-component/chat-thread-component.component";
import { SingleChatThreadComponentComponent } from "./single-chat-thread-component/single-chat-thread-component.component";
import { ChatWindowComponentComponent } from "./chat-window-component/chat-window-component.component";
import { ChatMessageComponentComponent } from "./chat-message-component/chat-message-component.component";
import { ChatNavBarComponent } from "./chat-nav-bar/chat-nav-bar.component";
import { FromNowPipe } from "./from-now-pipe/from-now.pipe";
import { ChatPageComponent } from "./chat-page/chat-page.component";
import {FormsModule} from "@angular/forms";
import {userServiceInjectables} from "./user/users.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatThreadComponentComponent,
    SingleChatThreadComponentComponent,
    ChatWindowComponentComponent,
    ChatMessageComponentComponent,
    ChatNavBarComponent,
    FromNowPipe,
    ChatPageComponent,
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [
    messageServiceInjectables, threadServiceInjectables, userServiceInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
