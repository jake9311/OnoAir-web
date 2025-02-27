import { Component } from '@angular/core';
import { BookingService } from '../../booking.service';
import { MyBooking } from '../../bookings-model/booking-model';
import { CommonModule } from '@angular/common';
import { DestinationsService } from '../../../destinations/destinations.service';
import { Router } from '@angular/router';
import { objectStatus } from '../../../../shared/object-status/object-status.enum';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/dialog/dialog/dialog.component';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-manage-bookings',
  imports: [CommonModule, MatIconModule,MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.css'
})
export class ManageBookingsComponent {
newBookings: any[] = [];
previousBookings: any[] = [];
loading=true;


constructor(private bookingService: BookingService,private destinationsService: DestinationsService, private router: Router,
  private dialog: MatDialog
) {}



async ngOnInit() {
  try {
    const allBookings = await this.bookingService.list();
    const now = new Date();

    this.newBookings = allBookings.filter(
      booking => new Date(booking.toDate) > now && booking.status === objectStatus.Active
    );

    this.previousBookings = allBookings.filter(
      booking => new Date(booking.fromDate) <= now || booking.status === objectStatus.Inactive
    );
    this.loading=false;

  } catch (error) {
    console.error('Error loading bookings:', error);
  }

}


  viewBooking(booking: MyBooking): void {
    this.router.navigate(['view-booking', booking.id]);
  }

  async toggleBookingStatus(booking: MyBooking): Promise<void> {
    const confirmationMessage = booking.status === objectStatus.Active
      ? `Are you sure you want to cancel booking for flight ${booking.flightNumber}?`
      : `Do you want to reactivate booking for flight ${booking.flightNumber}?`;
  
    this.openDialog('Confirm Action', confirmationMessage).subscribe(async result => {
      if (!result) return;
  
      const newStatus = booking.status === objectStatus.Active ? objectStatus.Inactive : objectStatus.Active;
  
      try {
        await this.bookingService.updateBookingStatus(booking.id, newStatus);

        booking.status = newStatus;
        this.refreshBookings(); 
  
      } catch (error) {
        console.error('❌ Error updating booking status:', error);
      }
    });
  }

  async refreshBookings(): Promise<void> {
    try {
      const allBookings = await this.bookingService.list();
      const now = new Date();
  
      this.newBookings = allBookings.filter(
        booking => new Date(booking.toDate) > now && booking.status === objectStatus.Active
      );
  
      this.previousBookings = allBookings.filter(
        booking => new Date(booking.fromDate) <= now || booking.status === objectStatus.Inactive
      );
    } catch (error) {
      console.error('❌ Error refreshing bookings:', error);
    }
  }
  
  

  openDialog(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { title, message }
    });
  
    return dialogRef.afterClosed();
  }
  

}
