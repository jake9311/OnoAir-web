import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FlightsService } from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-single-flight',
  imports: [MatTableModule,MatCardModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './single-flight.component.html',
  styleUrl: './single-flight.component.css'
})
export class SingleFlightComponent implements OnInit {
  @Input() flightNumber: string | undefined;
  flight: Flight | undefined;
  flightNotFound = false;
  loading=true;
  constructor(private flightsService: FlightsService, private route: ActivatedRoute, private router: Router) { }


  async ngOnInit() {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.flight = await this.flightsService.get(flightNumber);
      this.loading=false;
      if (!this.flight) {
        this.flightNotFound = true;
      }
    } else {
      this.flightNotFound = true;
    }
  }
  bookFlight(flight: Flight): void {
    this.router.navigate(['book-a-flight', flight.flightNumber]);
  }



}
