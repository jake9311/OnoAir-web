import { Component } from '@angular/core';
import { FlightsService } from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import { MatTableDataSource } from '@angular/material/table';
import { Router,RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { objectStatus } from '../../../../shared/object-status/object-status.enum';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../booking/booking.service';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/dialog/dialog/dialog.component';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-manage-flights',
  imports: [MatTableModule,MatFormFieldModule, MatInputModule,MatIcon,RouterModule,CommonModule,MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './manage-flights.component.html',
  styleUrl: './manage-flights.component.css'
})
export class ManageFlightsComponent implements OnInit {
  flights : Flight[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'boardingDate','arrivalDate', 'numOfSeats','status','actions'];
  loading=true;
  
   constructor(
    private flightsService: FlightsService,
    private router: Router,
    private bookingService: BookingService,
    private dialog: MatDialog
  ){}

  async ngOnInit(): Promise<void> {
    this.refreshTable();
  }

  async refreshTable(): Promise<void> {
    this.flights = await this.flightsService.list();
    this.dataSource.data = this.flights;
    this.loading=false;
    // await this.flightsService.deleteAllFlights();
    // await this.flightsService.uploadFlightsToFirestore();
  }

  watchFlight(flight: Flight): void {
    this.router.navigate(['flights', flight.flightNumber]);
  }

  deleteFlight(flight: Flight): void {
    this.flightsService.updateFlightStatus(flight.flightNumber, objectStatus.Inactive);
    this.refreshTable();
}

edeitFlight(flight: Flight): void {
  this.router.navigate(['edit-flight', flight.flightNumber]);
}

addFlight(): void {
  this.router.navigate(['add-flight']);
}
confirmDeleteFlight(flight: Flight): void {
  const confirmation = window.confirm(`Are you sure you want to cancel flight "${flight.flightNumber}"?`);
  if (confirmation) {
    this.deleteFlight(flight);
  }
}

toggleFlightStatus(flight: Flight): void {
  const confirmationMessage =
    flight.status === objectStatus.Active
      ? 'Are you sure you want to deactivate this flight?'
      : 'Are you sure you want to activate this flight?';

  this.openDialog('Confirm Action', confirmationMessage).subscribe(async (result) => {
    if (!result) return;


    const hasActiveBookings = await this.hasActiveBookings(flight.flightNumber);
      if (flight.status === objectStatus.Active && hasActiveBookings) {
        this.openDialog('Error', `Cannot cancel flight ${flight.flightNumber} because there are active bookings.`);
      return;
      }
    });


      if ((flight.boardingDate instanceof Timestamp ? flight.boardingDate.toDate() : flight.boardingDate) < new Date()) {

      this.openDialog('Error', `Cannot cancel flight ${flight.flightNumber} because the flight has already started.`);
      return;

    this.flightsService.updateFlightStatus(
      flight.flightNumber,
      flight.status === objectStatus.Active ? objectStatus.Inactive : objectStatus.Active
    ).then(() => {
      this.refreshTable();
    });
  };
}




private async hasActiveBookings(flightNumber: string): Promise<boolean> {
  const bookings = await this.bookingService.list();
  return bookings.some(booking => booking.flightNumber === flightNumber);
}

openDialog(title: string, message: string): Observable<boolean> {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '400px',
    data: { title, message }
  });

  return dialogRef.afterClosed();
}

}