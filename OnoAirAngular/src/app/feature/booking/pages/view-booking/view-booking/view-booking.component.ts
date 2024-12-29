import { Component } from '@angular/core';
import { DestinationsService } from '../../../../destinations/destinations.service';
import { BookingService } from '../../../booking.service';
import { MyBooking } from '../../../bookings-model/booking-model';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-view-booking',
  imports: [CommonModule,MatCardModule],
  templateUrl: './view-booking.component.html',
  styleUrl: './view-booking.component.css'
})
export class ViewBookingComponent implements OnInit {
  booking: MyBooking | undefined;
  imgUrl: string | undefined;
  constructor(private bookingService: BookingService, private route: ActivatedRoute, private destinationsService: DestinationsService) { }

  ngOnInit() {
    const bookingId = this.route.snapshot.paramMap.get('bookingId'); 
    if (bookingId) {
      this.booking = this.bookingService.getBookingById(bookingId);
  }
  if (this.booking) {
    this.imgUrl = this.destinationsService.getImgUrlbyDestinationAirportName(this.booking.to);
  }
}}
