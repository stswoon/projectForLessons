import {Component, HostBinding, OnInit} from "@angular/core";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  @HostBinding("attr.class") cssClass = "row";

  constructor() { }

  ngOnInit() {
  }

}
