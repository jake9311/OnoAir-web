import { Component } from '@angular/core';
import {FlightsService} from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import { OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-flights-list',
  imports: [MatTableModule,MatFormFieldModule, MatInputModule,MatProgressSpinnerModule,CommonModule],
  templateUrl: './flights-list.component.html',
  styleUrl: './flights-list.component.css'
})
export class FlightsListComponent implements OnInit {
  flights : Flight[]=[];
   dataSource = new MatTableDataSource();
   displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'boardingDate', 'actions'];
  loading=true;
  constructor(
    private flightsService: FlightsService,
    private router: Router
  ){}
  async ngOnInit():Promise<void> {
    this.flights =await  this.flightsService.list();
    this.dataSource.data = await this.flightsService.list();
    this.loading=false;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  watchFlight(flight: Flight): void {
    this.router.navigate(['flights', flight.flightNumber]);
  }
  }
