import { Component } from '@angular/core';
import {FlightsService} from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import { OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
@Component({
  selector: 'app-flights-list',
  imports: [MatTableModule,MatFormFieldModule, MatInputModule],
  templateUrl: './flights-list.component.html',
  styleUrl: './flights-list.component.css'
})
export class FlightsListComponent implements OnInit {
  flights : Flight[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'boardingDate', 'actions'];
  constructor(
    private flightsService: FlightsService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.flights = this.flightsService.list();
    this.dataSource.data = this.flightsService.list();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  watchFlight(flight: Flight): void {
    this.router.navigate(['flights', flight.flightNumber]);
  }
  }
