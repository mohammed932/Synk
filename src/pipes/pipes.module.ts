import { NgModule } from '@angular/core';
import { CustomDatePipe } from './custom-date/custom-date';
@NgModule({
	declarations: [CustomDatePipe],
	imports: [],
	exports: [CustomDatePipe]
})
export class PipesModule {}
