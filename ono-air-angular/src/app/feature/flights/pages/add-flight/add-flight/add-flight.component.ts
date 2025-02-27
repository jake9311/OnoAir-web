// import { Component } from '@angular/core';
// import { FlightsService } from '../../../flights.service';
// import { Flight } from '../../../flight-model/flight-model';
// import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
// import { objectStatus } from '../../../../../shared/object-status/object-status.enum';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { FormsModule } from '@angular/forms';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatSelectModule } from '@angular/material/select';
// import { MatNativeDateModule } from '@angular/material/core';
// import { DestinationsService } from '../../../../destinations/destinations.service';
// import { OnInit } from '@angular/core';
// import { Timestamp } from 'firebase/firestore';
// @Component({
//   selector: 'app-add-flight',
//   imports: [RouterModule, MatTableModule, CommonModule,MatNativeDateModule,MatFormFieldModule, FormsModule,MatRadioModule,MatTableModule,MatInputModule
//       ,MatDatepickerModule,MatButtonModule,MatSelectModule],
//   templateUrl: './add-flight.component.html',
//   styleUrl: './add-flight.component.css'
// })
// export class AddFlightComponent implements OnInit {
//   newFlight: Flight = {
//     flightNumber: '',
//     origin: '',
//     destination: '',
//     // boardingDate: new Date(),
//     boardingDate: Timestamp.now(),
//     boardingTime: '',
//     // arrivalDate: new Date(),
//     arrivalDate: Timestamp.now(),
//     arrivalTime: '',
//     numOfSeats: 1,
//     status: objectStatus.Active,
//   };
  
//   flightStatuses = Object.values(objectStatus);
//   destinations: string[] = [];
  
//   ngOnInit(){
//     this.destinationsService.list().then(destinations => {
//       const destinationCodes = destinations.map(destination => destination.destinationCode);
//     });
    
//   }

//   constructor(
//     private flightsService: FlightsService,
//     private router: Router,
//     private destinationsService: DestinationsService
//   ) { }
  

//   // saveFlight(form: NgForm): void {
//   //   if (form.invalid || !this.validateDates()) {
//   //     alert('Please fix the errors before saving.');
//   //     return;
//   //   }

//   //   this.flightsService.addFlight(this.newFlight);
//   //   this.router.navigate(['/manage-flights']);
//   // }
//   async saveFlight(form: NgForm): Promise<void> {
//     if (form.invalid) {
//       alert('Please fix the errors before saving.');
//       return;
//     }
  
//     await this.flightsService.addFlight(this.newFlight);
//     this.router.navigate(['/manage-flights']);
//   }

//   validateDates(): boolean {
//     if (!this.newFlight.boardingDate || !this.newFlight.arrivalDate) return false;

//     // const boardingDate = new Date(this.newFlight.boardingDate);
//     // const arrivalDate = new Date(this.newFlight.arrivalDate);
//     //const boardingDate = this.newFlight.boardingDate.toDate();
//     const boardingDate = this.ensureDate(this.newFlight.boardingDate);
//     //const arrivalDate = this.newFlight.arrivalDate.toDate();
//     const arrivalDate = this.ensureDate(this.newFlight.arrivalDate);
//     boardingDate.setHours(0, 0, 0, 0);
//     arrivalDate.setHours(0, 0, 0, 0);

//     if (arrivalDate.getTime() < boardingDate.getTime()) {
//       alert(' Arrival date must be after the boarding date.');
//       return false;
//     }

//     if (boardingDate.getTime() === arrivalDate.getTime()) {
//       if (this.newFlight.boardingTime && this.newFlight.arrivalTime) {
//         const [boardingHours, boardingMinutes] = this.newFlight.boardingTime.split(':').map(Number);
//         const [arrivalHours, arrivalMinutes] = this.newFlight.arrivalTime.split(':').map(Number);

//         if (arrivalHours * 60 + arrivalMinutes <= boardingHours * 60 + boardingMinutes) {
//           alert(' Arrival time must be after the boarding time.');
//           return false;
//         }
//       }
//     }
//     return true;
//   }
//   ensureDate(value: Date | Timestamp): Date {
//     if (value instanceof Timestamp) {
//       return value.toDate();
//     } else {
//       return value;
//     }
//   }
//   combineDateAndTime(date: Date, time: string): Date {
//     if (!date || !time) return date;
//     const [hours, minutes] = time.split(':').map(Number);
//     const newDate = new Date(date);
//     newDate.setHours(hours, minutes, 0, 0);
//     return newDate;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../../flights.service';
import { Flight } from '../../../flight-model/flight-model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { objectStatus } from '../../../../../shared/object-status/object-status.enum';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { DestinationsService } from '../../../../destinations/destinations.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'


@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    CommonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  newFlight: Flight = {
    flightNumber: '',
    origin: '',
    destination: '',
    boardingDate: new Date(),
    boardingTime: '',
    arrivalDate: new Date(),
    arrivalTime: '',
    numOfSeats: 1,
    status: objectStatus.Active
  };

  flightStatuses = Object.values(objectStatus);
  destinations: string[] = [];
  loading =false;

  constructor(
    private flightsService: FlightsService,
    private router: Router,
    private destinationsService: DestinationsService
  ) { }

  ngOnInit() {

    this.destinationsService.list().then(destinations => {
 
      this.destinations = destinations.map(dest => dest.name);
    });
  }

  async saveFlight(form: NgForm): Promise<void> {
    if (form.invalid || !this.validateDates()) {
      alert('Please fix the errors before saving.');
      return;
    }
    this.loading=true;

    this.newFlight.boardingDate = this.combineDateAndTime(this.newFlight.boardingDate, this.newFlight.boardingTime);
    this.newFlight.arrivalDate = this.combineDateAndTime(this.newFlight.arrivalDate, this.newFlight.arrivalTime);

    await this.flightsService.addFlight(this.newFlight);
    this.router.navigate(['/manage-flights']);
    this.loading=false;
  }


  validateDates(): boolean {
    if (!this.newFlight.boardingDate || !this.newFlight.arrivalDate) return false;

    
   
    const boardingDate = this.combineDateAndTime(this.newFlight.boardingDate, this.newFlight.boardingTime);
    const arrivalDate = this.combineDateAndTime(this.newFlight.arrivalDate, this.newFlight.arrivalTime);

    if (arrivalDate <= boardingDate) {
      alert('Arrival date must be after the boarding date.');
      return false;
    }

    return true;
  }

  /**
   * ממזגים date + time לאובייקט Date
   */
  // combineDateAndTime(date: Date, time: string): Date {
  //   if (!date || !time) return date;
  //   const [hours, minutes] = time.split(':').map(Number);
  //   const newDate = new Date(date);
  //   newDate.setHours(hours, minutes, 0, 0);
  //   return newDate;
  // }

  combineDateAndTime(date: Date, time: string): Date {
    if (!date || !time) return date;
  
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);  // ✅ מעדכן גם את השעה וגם את הדקות
  
    console.log("🕒 AFTER Merge:", newDate); // הדפסת הבדיקה
  
    return newDate;
  }
  
}
