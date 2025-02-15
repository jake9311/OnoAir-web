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



@Component({
  selector: 'app-manage-flights',
  imports: [MatTableModule,MatFormFieldModule, MatInputModule,MatIcon,RouterModule,CommonModule],
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
    private bookingService: BookingService
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
  const confirmationMessage =flight.status === objectStatus.Active 
  ? 'Are you sure you want to deactivate this flight?' : 'Are you sure you want to activate this flight?';
  const confirmation = window.confirm(confirmationMessage);
  if (confirmation) {
    if (flight.status === 'Active' && this.hasActiveBookings(flight.flightNumber)) {
      alert(`Cannot cancel flight ${flight.flightNumber} because there are active bookings.`);
      return;
    }
    if(flight.boardingDate < new Date(new Date().toISOString().split('T')[0])){
      alert(`Cannot cancel flight ${flight.flightNumber} because the flight has already started.`);
      return;
    }
    this.flightsService.updateFlightStatus(flight.flightNumber, flight.status === objectStatus.Active ? objectStatus.Inactive : objectStatus.Active);
    this.refreshTable();
  }
}
private hasActiveBookings(flightNumber: string): boolean {
  return this.bookingService.list().some(
    booking => booking.flightNumber === flightNumber
  );
}

}