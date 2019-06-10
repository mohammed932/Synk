import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "user-card",
  templateUrl: "user-card.html"
})
export class UserCardComponent {
  @Input() user;
  @Output() inviteFriend = new EventEmitter();
  constructor() {}

  inviteAction(user) {
    this.inviteFriend.emit(user);
  }
}
