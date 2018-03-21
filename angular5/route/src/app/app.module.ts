import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from "./login/login.component";
import {ProtectedComponent} from "./protected/protected.component";
import {LoggedInGuard} from "./auth-service/logged-in.guard";
import {AUTH_PROVIDERS} from "./auth-service/auth.service";

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "about/:text", component: AboutComponent},

  {path: "login", component: LoginComponent},
  {path: "protected", component: ProtectedComponent, canActivate: [LoggedInGuard]}

  // there are nested routes as well
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AUTH_PROVIDERS,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
