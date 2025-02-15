import { Component } from '@angular/core';
import { FlightsService } from '../../../../flights/flights.service';
import { BookingService } from '../../../booking.service';
import { Flight } from '../../../../flights/flight-model/flight-model';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, NgForm } from '@angular/forms';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { objectStatus } from '../../../../../shared/object-status/object-status.enum';
import { MyBooking } from '../../../bookings-model/booking-model';

@Component({
  selector: 'app-book-flight',
  imports: [MatCardModule, CommonModule, MatTableModule,MatFormFieldModule,MatInputModule ,FormsModule],
  templateUrl: './book-flight.component.html',
  styleUrl: './book-flight.component.css'
})
export class BookFlightComponent implements OnInit {
  flight: Flight | undefined;
  numOfPassengers = 1;
  passengers: { name: string; passport: string }[] = [];

  constructor(private flightsService: FlightsService, private route: ActivatedRoute,
    private bookingService: BookingService, private router: Router
  ) {}

  ngOnInit() {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber')?.trim();
    if (flightNumber) {
      this.flight = this.flightsService.get(flightNumber);
    }
    
    this.updatePassengerFields(); 
  }

  updatePassengerFields() {
    const currentLength = this.passengers.length;
    const newLength = Math.max(1, this.numOfPassengers || 1);

    if (newLength > currentLength) {
     
      for (let i = currentLength; i < newLength; i++) {
        this.passengers.push({ name: '', passport: '' });
      }
    } else {
     
      this.passengers.length = newLength;
    }
  }

  submitBooking(form: NgForm) {
    if (form.invalid) {
      alert('❌ Please fill in all required fields correctly.');
      return;
    }


    const newBooking: MyBooking = {
      id: Math.random().toString(36).substr(2, 9),
      flightNumber: this.flight!.flightNumber,
      from: this.flight!.origin,
      fromDate: this.flight!.boardingDate,
      to: this.flight!.destination,
      toDate: this.flight!.arrivalDate,
      numOfPassengers: this.numOfPassengers,
      passengers: this.passengers,
      status: objectStatus.Active,
    };

    this.bookingService.addBooking(newBooking);
    alert('Flight booked successfully!');
    this.router.navigate(['/manage-bookings']);
  
  }
}