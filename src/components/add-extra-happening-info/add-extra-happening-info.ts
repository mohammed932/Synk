import { Component } from '@angular/core';

/**
 * Generated class for the AddExtraHappeningInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-extra-happening-info',
  templateUrl: 'add-extra-happening-info.html'
})
export class AddExtraHappeningInfoComponent {

  text: string;

  constructor() {
    console.log('Hello AddExtraHappeningInfoComponent Component');
    this.text = 'Hello World';
  }

}
