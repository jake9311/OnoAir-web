import { Component,OnInit } from '@angular/core';
import { DestinationsService } from '../../../destinations.service';
import { Destination } from '../../../destinations-model/destination-model';
import { ActivatedRoute,Router,RouterModule  } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { objectStatus } from '../../../../../shared/object-status/object-status.enum';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-edit-destination',
  imports: [RouterModule, MatTableModule, CommonModule, MatFormFieldModule, FormsModule,MatRadioModule,MatInputModule],
  templateUrl: './edit-destination.component.html',
  styleUrl: './edit-destination.component.css'
})
export class EditDestinationComponent implements OnInit {
  destination: Destination | undefined;
   destinationStatuses = Object.values(objectStatus);
   imagePreview: string|undefined ;

  ngOnInit() {
    const destinationCode = this.route.snapshot.paramMap.get('destinationCode');
    if (destinationCode) {
      this.destination = this.destinationsService.get(destinationCode);
    }
  }
constructor(private destinationsService: DestinationsService, private route: ActivatedRoute, 
  private router: Router, ) { };

saveChanges(): void {
  if (this.destination){ {
    this.destinationsService.updateDestination(this.destination);
    this.router.navigate(['/manage-destinations']); 
  }
}}
updateImagePreview(): void {
  this.imagePreview= this.destination!.airportImg;
}




}
