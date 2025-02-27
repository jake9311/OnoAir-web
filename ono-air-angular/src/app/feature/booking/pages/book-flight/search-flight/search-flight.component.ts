import { Component } from '@angular/core';
import {FlightsService} from '../../../../flights/flights.service';
import { Flight } from '../../../../flights/flight-model/flight-model';
import { OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-flight',
  imports: [MatTableModule,MatFormFieldModule, MatInputModule,MatIconModule,MatProgressSpinnerModule,CommonModule],
  templateUrl: './search-flight.component.html',
  styleUrl: './search-flight.component.css'
})
export class SearchFlightComponent implements OnInit {

  flights : Flight[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'boardingDate', 'actions'];
   loading=true;
  constructor(
    private flightsService: FlightsService,
    private router: Router
  ){}
  async ngOnInit(): Promise<void> {
    this.flights =await this.flightsService.list();
    this.dataSource.data =await this.flightsService.list();
    this.loading=false
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  bookFlight(flight: Flight): void {
    this.router.navigate(['book-a-flight', flight.flightNumber]);
  }

  goToAdvancedSearch(): void {
    this.router.navigate(['special-flight-search']);
  }
  }
