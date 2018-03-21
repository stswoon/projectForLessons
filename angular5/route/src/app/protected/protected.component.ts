import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth-service/auth.service";

@Component({
  selector: "app-protected",
  templateUrl: "./protected.component.html",
  styleUrls: ["./protected.component.css"]
})
export class ProtectedComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
