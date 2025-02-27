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
import { Timestamp } from 'firebase/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-book-flight',
  imports: [MatCardModule, CommonModule, MatTableModule,MatFormFieldModule,MatInputModule ,FormsModule,MatProgressSpinnerModule],
  templateUrl: './book-flight.component.html',
  styleUrl: './book-flight.component.css'
})
export class BookFlightComponent implements OnInit {
  flight: Flight | undefined;
  numOfPassengers = 1;
  passengers: { name: string; passport: string }[] = [];
  loading=true;
  constructor(private flightsService: FlightsService, private route: ActivatedRoute,
    private bookingService: BookingService, private router: Router
  ) {}

  async ngOnInit() {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber')?.trim();
    if (flightNumber) {
      this.flight = await this.flightsService.get(flightNumber);
      this.loading=false;
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

  async submitBooking(form: NgForm) {
    if (form.invalid) {
      alert(' Please fill in all required fields correctly.');
      return;
    }
    let fromDate: Date;
if (this.flight!.boardingDate instanceof Timestamp) {
  fromDate = this.flight!.boardingDate.toDate();
} else {
  fromDate = this.flight!.boardingDate; // כבר Date
}


let toDate: Date;
if (this.flight!.arrivalDate instanceof Timestamp) {
  toDate = this.flight!.arrivalDate.toDate();
} else {
  toDate = this.flight!.arrivalDate;
}
  
    const newBooking: MyBooking = {
      id: Math.random().toString(36).substr(2, 9),
      flightNumber: this.flight!.flightNumber,
      from: this.flight!.origin,
      fromDate: fromDate,
      to: this.flight!.destination,
      toDate: toDate,
      numOfPassengers: this.numOfPassengers,
      passengers: this.passengers,
      status: objectStatus.Active,
     
    };
  
    try {
      await this.bookingService.addBooking(newBooking);
      alert(' Flight booked successfully!');
      this.router.navigate(['/manage-bookings']);
    } catch (error) {
      console.error(' Error adding booking:', error);
    }
  }
  
}