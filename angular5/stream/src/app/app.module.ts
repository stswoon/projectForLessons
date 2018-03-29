import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {messageServiceInjectables} from "./message/messages.service";
import {threadServiceInjectables} from "./thread/threads.service";

@NgModule({
  declarations: [
    AppComponent,
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
