import { Component } from '@angular/core';
import {  Router } from '@angular/router';    
import { DestinationsService } from '../../destinations.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { objectStatus } from '../../../../shared/object-status/object-status.enum';

@Component({
  selector: 'app-add-destination-form',
  imports: [MatFormFieldModule,FormsModule,MatInputModule,CommonModule],
  templateUrl: './add-destination-form.component.html',
  styleUrl: './add-destination-form.component.css'
})
export class AddDestinationFormComponent {
  newDestination = {
    name: '',
    airportName: '',
    destinationCode: '',
    airportWebsite: '',
    airportImg: '',
    status: objectStatus.Active
  };
  imagePreview: string | null = null;
  updateImagePreview(): void {
    this.imagePreview = this.newDestination.airportImg;
  }
constructor(
  private destinationsService: DestinationsService, private router: Router){}

  onSubmit(): void {
    this.destinationsService.addDestination(this.newDestination);
    this.router.navigate(['/manage-destinations']);
  }
}
