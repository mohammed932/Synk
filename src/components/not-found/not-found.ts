import { Component, Input } from "@angular/core";

@Component({
  selector: "not-found",
  templateUrl: "not-found.html"
})
export class NotFoundComponent {
  @Input() txt;
  constructor() {}
}
