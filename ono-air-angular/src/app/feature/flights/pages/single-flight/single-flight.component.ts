import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FlightsService } from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';



@Component({
  selector: 'app-single-flight',
  imports: [MatTableModule,MatCardModule,CommonModule],
  templateUrl: './single-flight.component.html',
  styleUrl: './single-flight.component.css'
})
export class SingleFlightComponent implements OnInit {
  @Input() flightNumber: string | undefined;
  flight: Flight | undefined;
  flightNotFound = false;
  constructor(private flightsService: FlightsService, private route: ActivatedRoute) { }

  ngOnInit() {
  const flightNumber=this.route.snapshot.paramMap.get('flightNumber')?.trim();
  if (flightNumber){
    const flight = this.flightsService.get(flightNumber);
    if (flight){
      this.flight = flight;
  }
  else{
    this.flightNotFound = true;
  }
  }
  else{
    this.flightNotFound = true;
  }
  }




}
