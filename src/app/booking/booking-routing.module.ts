import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingComponent } from './booking/booking.component';
import { CheckinComponent } from './checkin/checkin.component';

const routes: Routes = [
  {
    path: '',
    component: CheckinComponent,
    children: [
      {
        path: '',
        component: BookingComponent
      },{
        path: ':bookingCode/:familyName/details',
        component: BookingDetailsComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
