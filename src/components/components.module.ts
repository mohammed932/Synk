import { NgModule } from "@angular/core";
import { LoadingComponent } from "./loading/loading";
import { IonicModule } from "ionic-angular";
import { HappeningComponent } from './happening/happening';
import { UserCardComponent } from './user-card/user-card';
import { AddExtraHappeningInfoComponent } from './add-extra-happening-info/add-extra-happening-info';
import { NotFoundComponent } from './not-found/not-found';
@NgModule({
  declarations: [LoadingComponent,
    HappeningComponent,
    UserCardComponent,
    AddExtraHappeningInfoComponent,
    LoadingComponent,
    NotFoundComponent],
  imports: [IonicModule],
  exports: [LoadingComponent,
    HappeningComponent,
    UserCardComponent,
    AddExtraHappeningInfoComponent,
    LoadingComponent,
    NotFoundComponent]
})
export class ComponentsModule {}
