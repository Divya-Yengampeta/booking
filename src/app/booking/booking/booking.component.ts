import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  retriveBookingDetailsForm !: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initRetriveForm();
  }


  // We will assign feilds for the form here 
  initRetriveForm(){
    this.retriveBookingDetailsForm = this.fb.group({
      bookingCode: ['',[Validators.required,Validators.maxLength(6),Validators.minLength(5),Validators.pattern("^([a-zA-Z2-9]{5,6})$")]], // bookingCode is required && bookingCode max length must be 6 && bookingCode min length must be 5 
      familyName : ['',[Validators.required,Validators.maxLength(30),Validators.minLength(2)]] // familyName is required && familyName max length must be 30 && familyName min length must be 2 
    })
  }

  get f(){
    return this.retriveBookingDetailsForm.controls;
  }

  onSubmitRetriveForm(){
    var postData = this.retriveBookingDetailsForm.value
    this.router.navigate([`${postData.bookingCode}/${postData.familyName}/details`])
  }
}
