
import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../flights/flights.service';
import { Flight } from '../../flights/flight-model/flight-model';
import { FlightsListComponent } from "../../flights/pages/flights-list/flights-list.component";
import { CommonModule } from '@angular/common';
import { DestinationsService } from '../../destinations/destinations.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-homepage',
  imports: [
    FlightsListComponent,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  lastMinuteFlights: { flight: Flight; imgUrl: string | undefined }[] = [];
  displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'boardingDate', 'actions'];
  dataSource = new MatTableDataSource();
  loading=true;

  constructor(
    private flightsService: FlightsService,
    private destinationsService: DestinationsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {

    const flights = await this.flightsService.list(); // Promise<Flight[]>
    flights.forEach(flight => {
      if (flight.boardingDate instanceof Timestamp) {
        flight.boardingDate = flight.boardingDate.toDate();
      }
      if (flight.arrivalDate instanceof Timestamp) {
        flight.arrivalDate = flight.arrivalDate.toDate();
      }
    });

    const sortedFlights = flights
  .sort((a, b) => {
    const aDate = a.boardingDate instanceof Timestamp ? a.boardingDate.toDate() : a.boardingDate;
    const bDate = b.boardingDate instanceof Timestamp ? b.boardingDate.toDate() : b.boardingDate;

    return new Date(aDate).getTime() - new Date(bDate).getTime();
  })
  .slice(0, 3);


      const promises = sortedFlights.map(async (flight) => {
        const imgUrl = await this.destinationsService.getImgUrl(flight.destination);
        return { flight, imgUrl };
      });
    this.lastMinuteFlights = await Promise.all(promises);
    this.dataSource.data = flights;
    this.loading=false;
  }

  viewFlightDetails(flight: Flight): void {
    this.router.navigate(['flights', flight.flightNumber]);
  }
}
