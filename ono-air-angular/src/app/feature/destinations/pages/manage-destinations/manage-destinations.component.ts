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
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/dialog/dialog/dialog.component';
import { Observable } from 'rxjs';
import { Flight } from '../../../flights/flight-model/flight-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-manage-destinations',
  imports: [MatInputModule,MatFormFieldModule,MatTableModule, MatIcon,RouterModule,CommonModule,MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './manage-destinations.component.html',
  styleUrl: './manage-destinations.component.css'
})
export class ManageDestinationsComponent implements OnInit {
  destinations : Destination[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['name', 'airportName', 'destinationCode', 'airportWebsite','airportImg','status','actions'];
   loading=true; 

   constructor(
    private destinationsService: DestinationsService,
    private router: Router,
    private flightsService: FlightsService,
    private dialog: MatDialog
    
  ){}
  ngOnInit(): void {
    this.refreshTable();
   
  }
refreshTable(): void {
this.destinationsService.list().then(destinations => this.destinations = destinations);
this.destinationsService.list().then(destinations=> this.dataSource.data = destinations);
this.loading=false
}

  watchDestination(destination: Destination): void {
    this.router.navigate(['destinations', destination.destinationCode]);
  }

    deleteDestination(destination: Destination): void {
      this.destinationsService.updateDestinationStatus(destination.destinationCode, objectStatus.Inactive);
      this.refreshTable();
  }
  


  editDestination(destination: Destination): void {
    if (!destination) {
      console.error('editDestination: Destination object is undefined!', destination);
      return;
    }
  
    if (!destination.destinationCode) {
      console.error('editDestination: destinationCode is missing!', destination);
      return;
    }
  
    console.log('Navigating to edit-destination:', destination.destinationCode);
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




async toggleDestinationStatus(destination: Destination): Promise<void> {
  if (!destination || !destination.destinationCode) {
    return;
  }

  const confirmationMessage =
    destination.status === objectStatus.Active
      ? 'Are you sure you want to deactivate this destination?'
      : 'Are you sure you want to activate this destination?';

  this.openDialog('Confirm Action', confirmationMessage).subscribe(async result => {
    if (!result) return;

    const newStatus = destination.status === objectStatus.Active ? objectStatus.Inactive : objectStatus.Active;

    try {
      await this.destinationsService.updateDestinationStatus(destination.destinationCode, newStatus);
  
      destination.status = newStatus;
      
    } catch (error) {
      console.error('❌ Error updating status:', error);
    }
  });
}



private async hasActiveFlights(destination: string): Promise<boolean> {
const flights=await this.flightsService.list();
return flights.some((flight:Flight)=>flight.status==='Active' && (flight.origin===destination || flight.destination===destination));

}
openDialog(title: string, message: string): Observable<boolean> {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '400px',
    data: { title, message }
  });

  return dialogRef.afterClosed();
}




}






