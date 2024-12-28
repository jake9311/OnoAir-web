import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DestinationsService } from '../destinations.service';
import { Destination } from '../destinations-model/destination-model';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-manage-destinations',
  imports: [MatInputModule,MatFormFieldModule,MatTableModule],
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
}