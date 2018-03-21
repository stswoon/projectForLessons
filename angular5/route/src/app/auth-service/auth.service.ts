import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {
  login(user: string, password: string): boolean {
    if (user === "user" && password === "password") {
      localStorage.setItem("userName", user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem("userName");
  }

  getUser(): string {
    return localStorage.getItem("userName");
  }

  isLoggedIn(): boolean {
    return this.getUser() != null;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  {provide: AuthService, useClass: AuthService}
];
