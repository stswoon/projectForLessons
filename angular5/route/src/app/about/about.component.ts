import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  text: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {this.text = params["text"]});
  }

  ngOnInit() {
  }

  navigate() {
    this.router
      .navigate(["about/i"], {queryParams: {query: "a=1&b=2"}})
      .then(result => console.log(result))
  }
}
