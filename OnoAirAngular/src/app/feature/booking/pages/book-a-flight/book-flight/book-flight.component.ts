import { Component } from '@angular/core';
import { FlightsService } from '../../../../flights/flights.service';
import { Flight } from '../../../../flights/flight-model/flight-model';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-book-flight',
  imports: [MatCardModule, CommonModule, MatTableModule],
  templateUrl: './book-flight.component.html',
  styleUrl: './book-flight.component.css'
})
export class BookFlightComponent implements OnInit {
 flight: Flight | undefined;
  constructor(private flightsService: FlightsService, private route: ActivatedRoute) { }

  ngOnInit() {
  const flightNumber=this.route.snapshot.paramMap.get('flightNumber')?.trim();
  if (flightNumber){
    const flight = this.flightsService.get(flightNumber);
    if (flight){
      this.flight = flight;
  }
  }
  }


}
