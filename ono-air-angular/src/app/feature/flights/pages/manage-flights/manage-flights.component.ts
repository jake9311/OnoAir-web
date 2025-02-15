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


@Component({
  selector: 'app-manage-flights',
  imports: [MatTableModule,MatFormFieldModule, MatInputModule,MatIcon,RouterModule,CommonModule,MatDialogModule],
  templateUrl: './manage-flights.component.html',
  styleUrl: './manage-flights.component.css'
})
export class ManageFlightsComponent implements OnInit {
  flights : Flight[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'boardingDate','arrivalDate', 'numOfSeats','status','actions'];

  
   constructor(
    private flightsService: FlightsService,
    private router: Router,
    private bookingService: BookingService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    try {
      this.refreshTable();
    } catch (error) {
      console.error("Error loading flights:", error);
    }
  }
  refreshTable():void{
    this.flights=this.flightsService.list();
    this.dataSource.data=this.flightsService.list();
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

  this.openDialog('Confirm Action', confirmationMessage).subscribe(result => {
    if (!result) return;

    if (flight.status === objectStatus.Active && this.hasActiveBookings(flight.flightNumber)) {
      this.openDialog('Error', `Cannot cancel flight ${flight.flightNumber} because there are active bookings.`);
      return;
    }

    if (flight.boardingDate < new Date(new Date().toISOString().split('T')[0])) {
      this.openDialog('Error', `Cannot cancel flight ${flight.flightNumber} because the flight has already started.`);
      return;
    }

    // עדכון הסטטוס של הטיסה
    this.flightsService.updateFlightStatus(
      flight.flightNumber,
      flight.status === objectStatus.Active ? objectStatus.Inactive : objectStatus.Active
    );

    this.refreshTable();
  });
}

private hasActiveBookings(flightNumber: string): boolean {
  return this.bookingService.list().some(
    booking => booking.flightNumber === flightNumber
  );
}
openDialog(title: string, message: string): Observable<boolean> {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '400px',
    data: { title, message }
  });

  return dialogRef.afterClosed();
}

}