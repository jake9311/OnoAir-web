import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BookingService } from '../../booking.service';
import { MyBooking } from '../../bookings-model/booking-model';
import { CommonModule } from '@angular/common';
import { DestinationsService } from '../../../destinations/destinations.service';
import { Flight } from '../../../flights/flight-model/flight-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule],
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.css'
})
export class ManageBookingsComponent {
newBookings: any[] = [];
previousBookings: any[] = [];



constructor(private bookingService: BookingService,private destinationsService: DestinationsService, private router: Router) {}
ngOnInit() {
  this.previousBookings = this.bookingService.getPreviousBookings();
  this.newBookings = this.bookingService.getNewBookings();

}
  viewBooking(booking: MyBooking): void {
    this.router.navigate(['view-booking', booking.id]);
  }
 
  

}
