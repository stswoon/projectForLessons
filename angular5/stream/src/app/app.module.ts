import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {messageServiceInjectables} from "./message/messages.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    messageServiceInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
