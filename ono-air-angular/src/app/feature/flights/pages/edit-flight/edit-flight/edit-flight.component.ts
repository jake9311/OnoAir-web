import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../../flights.service';
import { Flight } from '../../../flight-model/flight-model';


@Component({
  selector: 'app-edit-flight',
  imports: [],
  templateUrl: './edit-flight.component.html',
  styleUrl: './edit-flight.component.css'
})
export class EditFlightComponent implements OnInit {
  flight: Flight|undefined;

  constructor(private route: ActivatedRoute, private flightsService: FlightsService) { }

  ngOnInit() {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.flight = this.flightsService.get(flightNumber);
    }
  }
}


