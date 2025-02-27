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
import { Timestamp } from 'firebase/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-edit-flight',
  imports: [RouterModule, MatTableModule, CommonModule, MatFormFieldModule, FormsModule,MatSelectModule,MatRadioModule,MatTableModule,MatInputModule
    ,MatDatepickerModule,MatNativeDateModule,MatButtonModule,MatButtonModule,MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './edit-flight.component.html',
  styleUrl: './edit-flight.component.css'
})
export class EditFlightComponent implements OnInit {
  flight: Flight | undefined;
  flightStatuses = Object.values(objectStatus);
  loading=true;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  async ngOnInit():Promise<void> {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.flight =await this.flightsService.get(flightNumber);
      this.loading=false;
    }
  }


  async saveChanges(form: NgForm): Promise<void> {
    if (form.invalid || !this.validateDates()) {
      alert('Please fix the errors before saving.');
      return;
    }
  
    if (this.flight) {
      // בדיקה אם boardingDate הוא Timestamp => המרה ל-Date
      if (this.flight.boardingDate instanceof Timestamp) {
        this.flight.boardingDate = this.flight.boardingDate.toDate();
      }
      // כנ"ל arrivalDate
      if (this.flight.arrivalDate instanceof Timestamp) {
        this.flight.arrivalDate = this.flight.arrivalDate.toDate();
      }
    
      // עכשיו בטוח שניהם Date
      this.flight.boardingDate = this.combineDateAndTime(
        this.flight.boardingDate, 
        this.flight.boardingTime
      );
      this.flight.arrivalDate = this.combineDateAndTime(
        this.flight.arrivalDate, 
        this.flight.arrivalTime
      );
    
      await this.flightsService.updateFlight(this.flight);
      this.router.navigate(['/manage-flights']);
    }
  }    
  

  validateDates(): boolean {
    if (!this.flight?.boardingDate || !this.flight?.arrivalDate) return false;

    const arrivalDate = this.flight.arrivalDate instanceof Timestamp ? this.flight.arrivalDate.toDate() : this.flight.arrivalDate;
    const boardingDate = this.flight.boardingDate instanceof Timestamp ? this.flight.boardingDate.toDate() : this.flight.boardingDate;
    // const arrivalDate = new Date(this.flight.arrivalDate);

   
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
  

 

