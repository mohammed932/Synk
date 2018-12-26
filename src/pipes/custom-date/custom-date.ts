import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
 
  transform(value: string, ...args) {
    let stringDate = String(value);
    let myDate = stringDate.split(" ");
    let day, month, year;
    switch (myDate[0]) {
      case 'Sat':
        day = 'Saturday'
        break;
      case 'Sun':
        day = "Sunday";
        break;
      case 'Mon':
        day = "Monday";
        break;
      case 'Tue':
        day = "Tuesday";
        break;
      case 'Wed':
        day = "Wednesday";
        break;
      case 'Thu':
        day = 'Thursday'
        break;
      case 'Fri':
        day = 'Friday'
        break;
    }
    if (args[0] == 0) {
      return day;
    } else {
      return day + ' , ' + myDate[2] + ' ' + month;
    }

  }
}
