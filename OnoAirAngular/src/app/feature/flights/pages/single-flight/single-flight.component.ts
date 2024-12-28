import { Component, input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FlightsService } from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-single-flight',
  imports: [MatTableModule,MatCardModule,CommonModule],
  templateUrl: './single-flight.component.html',
  styleUrl: './single-flight.component.css'
})
export class SingleFlightComponent implements OnInit {
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
