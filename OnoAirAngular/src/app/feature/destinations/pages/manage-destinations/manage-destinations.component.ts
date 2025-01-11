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
import { AddDestinationComponent } from '../add-destination/add-destination/add-destination.component';
@Component({
  selector: 'app-manage-destinations',
  imports: [MatInputModule,MatFormFieldModule,MatTableModule, MatIcon,RouterModule],
  templateUrl: './manage-destinations.component.html',
  styleUrl: './manage-destinations.component.css'
})
export class ManageDestinationsComponent implements OnInit {
  destinations : Destination[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['name', 'airportName', 'destinationCode', 'airportWebsite','airportImg','actions'];
  constructor(
    private destinationsService: DestinationsService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.destinations = this.destinationsService.list();
    this.dataSource.data = this.destinationsService.list();
  }

  watchDestination(destination: Destination): void {
    this.router.navigate(['destinations', destination.destinationCode]);
  }

    deleteDestination(destination: Destination): void {
      console.log('delete flight');
  }
  
  editDestination(destination: Destination): void {
    console.log('edit flight');
  }

  addDestination(): void {
    this.router.navigate(['/add-destination']);
  }
}
