

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../booking.service';
import { DestinationsService } from '../../../../destinations/destinations.service';
import { MyBooking } from '../../../bookings-model/booking-model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Timestamp } from 'firebase/firestore';
import {MatProgressSpinnerModule}from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-booking',
  standalone: true, 
  imports: [CommonModule, MatCardModule,MatProgressSpinnerModule],
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  booking?: MyBooking;
  imgUrl?: string;
  bookingId?: string;
  bookingNotFound = false;
 loading=true;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private destinationsService: DestinationsService
  ) {}

  async ngOnInit() {
    this.bookingId = this.route.snapshot.paramMap.get('bookingId') || '';

    if (!this.bookingId) {
      this.bookingNotFound = true;

      return;
    }


    try {
      this.booking = await this.bookingService.get(this.bookingId);

      if (!this.booking) {
  
        this.bookingNotFound = true;
        this.loading=false;
        return;
      }


      this.booking.fromDate = this.ensureDate(this.booking.fromDate);
      this.booking.toDate = this.ensureDate(this.booking.toDate);


      this.imgUrl = await this.destinationsService.getImgUrlbyDestinationAirportName(this.booking.to);
      this.loading=false;

    } catch (error) {
      console.error('❌ שגיאה בעת שליפת ההזמנה:', error);
      this.bookingNotFound = true;
    }
    
  }

  private ensureDate(value: Date | Timestamp): Date {
    return value instanceof Timestamp ? value.toDate() : value;
  }
}
