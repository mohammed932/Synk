import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateActivityPage } from './create-activity';
import { DatePickerModule } from 'datepicker-ionic2';
import { PipesModule } from '../../pipes/pipes.module';
import { IonAlphaScrollModule } from 'ionic2-alpha-scroll';

@NgModule({
  declarations: [
    CreateActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateActivityPage),
    PipesModule,
    IonAlphaScrollModule,
    DatePickerModule
  ],
})
export class CreateActivityPageModule {}
