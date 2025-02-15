import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../../flights.service';
import { Flight } from '../../../flight-model/flight-model';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { objectStatus } from '../../../../../shared/object-status/object-status.enum';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../../../../../shared/dialog/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-flight',
  imports: [RouterModule, MatTableModule, CommonModule, MatFormFieldModule, FormsModule,MatSelectModule,MatRadioModule,MatTableModule,MatInputModule
    ,MatDatepickerModule,MatNativeDateModule,MatButtonModule,MatButtonModule,MatDialogModule],
  templateUrl: './edit-flight.component.html',
  styleUrl: './edit-flight.component.css'
})
export class EditFlightComponent implements OnInit {
  flight: Flight | undefined;
  flightStatuses = Object.values(objectStatus);

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.flight = this.flightsService.get(flightNumber);
    }
  }

  saveChanges(form: NgForm): void {
    if (form.invalid || !this.validateDates()) {
      alert('Please fix the errors before saving.');
      return;
    }

    if (this.flight) {
      this.flight.boardingDate = this.combineDateAndTime(this.flight.boardingDate, this.flight.boardingTime);
      this.flight.arrivalDate = this.combineDateAndTime(this.flight.arrivalDate, this.flight.arrivalTime);
      console.log(this.flight)
      this.flightsService.updateFlight(this.flight);
      this.router.navigate(['/manage-flights']);
    }
  }

  validateDates(): boolean {
    if (!this.flight?.boardingDate || !this.flight?.arrivalDate) return false;

    const boardingDate = new Date(this.flight.boardingDate);
    const arrivalDate = new Date(this.flight.arrivalDate);

   
    boardingDate.setHours(0, 0, 0, 0);
    arrivalDate.setHours(0, 0, 0, 0);

    if (arrivalDate.getTime() < boardingDate.getTime()) {
      if (arrivalDate.getTime() < boardingDate.getTime()) {
        alert("❌ Arrival date must be after the boarding date.");
        return false;
      }
      
    }

   
    if (boardingDate.getTime() === arrivalDate.getTime()) {
      if (this.flight.boardingTime && this.flight.arrivalTime) {
        const [boardingHours, boardingMinutes] = this.flight.boardingTime.split(':').map(Number);
        const [arrivalHours, arrivalMinutes] = this.flight.arrivalTime.split(':').map(Number);

        const boardingTimeTotal = boardingHours * 60 + boardingMinutes;
        const arrivalTimeTotal = arrivalHours * 60 + arrivalMinutes;

        if (arrivalTimeTotal <= boardingTimeTotal) {
          alert(' Arrival time must be after the boarding time.');
          return false;
        }
      }
    }

    return true;
  }


  combineDateAndTime(date: Date, time: string): Date {
    if (!date || !time) return date;
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
}

openDialog(title: string, message: string): Observable<boolean> {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '400px',
    data: { title, message }
  });

  return dialogRef.afterClosed();
}

}
  

 

