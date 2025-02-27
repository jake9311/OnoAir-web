


import { Component, OnInit } from '@angular/core';
import { DestinationsService } from '../../../destinations.service';
import { Destination } from '../../../destinations-model/destination-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { objectStatus } from '../../../../../shared/object-status/object-status.enum';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-destination',
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatRadioModule, MatInputModule],
  templateUrl: './edit-destination.component.html',
  styleUrl: './edit-destination.component.css'
})
export class EditDestinationComponent implements OnInit {
  destination: Destination | undefined;
  destinationStatuses = Object.values(objectStatus);
  imagePreview: string | undefined;

  constructor(
    private destinationsService: DestinationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  
 
  async ngOnInit() {
    const destinationCode = this.route.snapshot.paramMap.get('destinationCode');
    if (destinationCode) {
      this.destination = await this.destinationsService.get(destinationCode);
      if (this.destination) {
        this.imagePreview = this.destination.airportImg;
      }
    }
  }


  async saveChanges(): Promise<void> {
    if (this.destination) {
      await this.destinationsService.updateDestination(this.destination);
      this.router.navigate(['/manage-destinations']);
    }
  }


  updateImagePreview(): void {
    if (this.destination) {
      this.imagePreview = this.destination.airportImg;
    }
  }
}
