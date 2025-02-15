import { Component } from '@angular/core';
import { BookingService } from '../../booking.service';
import { MyBooking } from '../../bookings-model/booking-model';
import { CommonModule } from '@angular/common';
import { DestinationsService } from '../../../destinations/destinations.service';
import { Router } from '@angular/router';
import { objectStatus } from '../../../../shared/object-status/object-status.enum';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule, MatIconModule],
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

  toggleBookingStatus(booking: MyBooking): void {
    const confirmationMessage =
      booking.status === objectStatus.Active
        ? `Are you sure you want to cancel booking for flight ${booking.flightNumber}?`
        : `Do you want to reactivate booking for flight ${booking.flightNumber}?`;

    if (window.confirm(confirmationMessage)) {
      booking.status = booking.status === objectStatus.Active ? objectStatus.Inactive : objectStatus.Active;
      this.bookingService.updateBookingStatus(booking.id, booking.status);
      this.previousBookings = this.bookingService.getPreviousBookings();
      this.newBookings = this.bookingService.getNewBookings();
    }
  }
 
  

}
