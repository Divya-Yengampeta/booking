import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../bookinService/booking.service';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  bookingCode!: string | null;
  familyName!: string | null;
  searchResult: any;
  public isCollapsed = false;
  public isCollapsedItinerary = false;
  public isCollapsedMarketing = false;

  constructor(private bookingService: BookingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.bookingCode = value.get('bookingCode');
      this.familyName = value.get('familyName');
    })
    this.bookingService.search(this.bookingCode,this.familyName).toPromise()
      .then((resp: any)=> {
        this.searchResult = resp?.getBookings;

      })
      .catch()
  }
}
