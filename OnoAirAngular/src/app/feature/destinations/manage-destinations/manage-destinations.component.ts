import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DestinationsService } from '../destinations.service';
import { Destination } from '../dsetinations-model/destination-model';
@Component({
  selector: 'app-manage-destinations',
  imports: [],
  templateUrl: './manage-destinations.component.html',
  styleUrl: './manage-destinations.component.css'
})
export class ManageDestinationsComponent implements OnInit {
  destinations!: Destination[];
  constructor(private destinationsService: DestinationsService) { }    
  ngOnInit(): void {
    this.destinations = this.destinationsService.list();
  }
}
