import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { CheckinComponent } from './checkin/checkin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [BookingComponent, BookingDetailsComponent, CheckinComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class BookingModule { }
