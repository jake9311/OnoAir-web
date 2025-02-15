import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DestinationsService } from '../../destinations.service';
import { Destination } from '../../destinations-model/destination-model';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { objectStatus } from '../../../../shared/object-status/object-status.enum';
import { CommonModule } from '@angular/common';
import { FlightsService } from '../../../flights/flights.service';


@Component({
  selector: 'app-manage-destinations',
  imports: [MatInputModule,MatFormFieldModule,MatTableModule, MatIcon,RouterModule,CommonModule],
  templateUrl: './manage-destinations.component.html',
  styleUrl: './manage-destinations.component.css'
})
export class ManageDestinationsComponent implements OnInit {
  destinations : Destination[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['name', 'airportName', 'destinationCode', 'airportWebsite','airportImg','status','actions'];
  constructor(
    private destinationsService: DestinationsService,
    private router: Router,
    private flightsService: FlightsService
  ){}
  ngOnInit(): void {
    this.refreshTable();
  }
refreshTable(): void {
  this.destinations = this.destinationsService.list();
  this.dataSource.data = this.destinationsService.list();
}
  watchDestination(destination: Destination): void {
    this.router.navigate(['destinations', destination.destinationCode]);
  }

    deleteDestination(destination: Destination): void {
      this.destinationsService.updateDestinationStatus(destination.destinationCode, objectStatus.Inactive);
      this.refreshTable();
  }
  
  editDestination(destination: Destination): void {
    this.router.navigate(['edit-destination', destination.destinationCode]);
  }
addDestination(): void {
  this.router.navigate(['add-destination']);
}

confirmDeleteDestination(destination: Destination): void {
  const confirmation = window.confirm(`Are you sure you want to cancel destination "${destination.name}"?`);
  if (confirmation) {
    this.deleteDestination(destination);
  }
}

toggleDestinationStatus(destination: Destination): void {
  const confirmationMessage =destination.status === objectStatus.Active 
  ? 'Are you sure you want to deactivate this destination?' : 'Are you sure you want to activate this destination?';
  const confirmation = window.confirm(confirmationMessage);
  if (confirmation) {
    if (this.hasActiveFlights(destination.name)) {
      alert(`Cannot delete destination ${destination.name} because there are active flights associated with it.`);
      return;
    }
    else{
    this.destinationsService.updateDestinationStatus(destination.destinationCode, destination.status === objectStatus.Active ? objectStatus.Inactive : objectStatus.Active);
    this.refreshTable();
  }
}}

private hasActiveFlights(destination: string): boolean {
  return this.flightsService.list().some(
    flight => flight.status === 'Active' && (flight.origin === destination || flight.destination === destination)
  );
}


}
