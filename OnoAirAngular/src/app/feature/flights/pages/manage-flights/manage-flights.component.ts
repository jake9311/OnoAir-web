import { Component } from '@angular/core';
import { FlightsService } from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-manage-flights',
  imports: [MatTableModule,MatFormFieldModule, MatInputModule],
  templateUrl: './manage-flights.component.html',
  styleUrl: './manage-flights.component.css'
})
export class ManageFlightsComponent implements OnInit {
  flights : Flight[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'boardingDate','boardingTime','arrivalDate','arrivalTime', 'numOfSeats','actions'];
  constructor(
    private flightsService: FlightsService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.flights = this.flightsService.list();
    this.dataSource.data = this.flightsService.list();
  }

  watchFlight(flight: Flight): void {
    this.router.navigate(['flights', flight.flightNumber]);
  }
}