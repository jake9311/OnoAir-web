import { Component} from '@angular/core';
import { FlightsService } from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import {  MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-special-flight-search',
  imports: [CommonModule,MatIcon,MatDatepickerModule,MatFormFieldModule,MatTableModule,MatNativeDateModule,MatInputModule,FormsModule,MatButtonModule],
  templateUrl: './special-flight-search.component.html',
  styleUrl: './special-flight-search.component.css'
})
export class SpecialFlightSearchComponent {
  flights: Flight[] = [];
  allFlights: any[] = [];
  searchMode: 'days' | 'months' = 'days'; 
  startDate!: Date;
  endDate!: Date|null;
  displayedColumns: string[] =['flightNumber', 'origin', 'destination', 'boardingDate', 'arrivalDate', 'actions'];

  constructor(private flightsService: FlightsService, private router: Router) {}
  async ngOnInit():Promise<void> {
    this.allFlights = await this.flightsService.list();
  }
  toggleSearchMode() {
    this.searchMode = this.searchMode === 'days' ? 'months' : 'days';
    this.startDate = undefined!;
    this.endDate = undefined!;
    this.flights = [];
  }

  searchFlights() {
    if (!this.startDate || !this.endDate) return;

    this.flights = this.allFlights.filter(flight => {
      const flightDate = new Date(flight.boardingDate);

      if (this.searchMode === 'days') {
        return flightDate >= this.startDate && flightDate <= this.endDate!;
      } else {
        const flightMonth = flightDate.getFullYear() * 12 + flightDate.getMonth();
        const startMonth = this.startDate.getFullYear() * 12 + this.startDate.getMonth();
        const endMonth = this.endDate!.getFullYear() * 12 + this.endDate!.getMonth();
        return flightMonth >= startMonth && flightMonth <= endMonth;
      }
    });
  }
  setYear(year: Date, picker: any) {
    const newDate = new Date(year);
    newDate.setMonth(0); 
    this.startDate = newDate;
    picker.updateActiveDate(newDate);
  }
  
  setMonth(month: Date, picker: any) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = new Date(month);
      this.endDate = null;
    } else {
      if (month >= this.startDate) {
        this.endDate = new Date(month);
        picker.close();
      }
    }
  }
  bookFlight(flight: Flight): void {
    this.router.navigate(['book-a-flight', flight.flightNumber]);
  }
  
  
}