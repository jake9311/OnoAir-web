import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BookingService } from '../../booking.service';
import { MyBooking } from '../../bookings-model/booking-model';
import { CommonModule } from '@angular/common';
import { DestinationsService } from '../../../destinations/destinations.service';


@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule],
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.css'
})
export class ManageBookingsComponent {
newBookings: any[] = [];
previousBookings: any[] = [];


constructor(private bookingService: BookingService,private destinationsService: DestinationsService) {}
ngOnInit() {
  this.previousBookings = this.bookingService.getPreviousBookings();
  this.newBookings = this.bookingService.getNewBookings();

}


}
