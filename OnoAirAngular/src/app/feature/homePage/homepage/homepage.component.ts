import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FlightsService } from '../../flights/flights.service';
import { Flight } from '../../flights/flight-model/flight-model';
import { FlightsListComponent } from "../../flights/pages/flights-list/flights-list.component";
import { CommonModule } from '@angular/common';
import { DestinationsService } from '../../destinations/destinations.service';
import {MatCardModule} from '@angular/material/card';
import { _MatInternalFormField } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-homepage',
  imports: [ FlightsListComponent,CommonModule,MatCardModule,MatFormFieldModule,MatTableModule,MatInputModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
 lastMinuteFlights :{flight: Flight; imgUrl: string|undefined}[] = [];
 displayedColumns: string[] = ['flightNumber', 'origin', 'destination','boardingDate', 'actions'];
 dataSource = new MatTableDataSource();


 constructor(private flightsService: FlightsService,
             private destinationsService: DestinationsService 
              ) { }

 ngOnInit(): void {
  const flights = this.flightsService.list().sort((a,b)=> new Date(a.boardingDate).getTime() - new Date(b.boardingDate).getTime()).slice(0,3);
  this.lastMinuteFlights = flights.map((flight) =>({flight, imgUrl:this.destinationsService.getImgUrl(flight.destination)}));
  this.dataSource.data = this.flightsService.list();
 }

 applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

bookFlight(flight: any): void {
 
  //צריך להמשיך
}
}
