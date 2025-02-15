import { Component } from '@angular/core';
import { Destination } from '../../destinations-model/destination-model';
import { DestinationsService } from '../../destinations.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-single-destination',
  imports: [MatCardModule,MatTableModule,CommonModule],
  templateUrl: './single-destination.component.html',
  styleUrl: './single-destination.component.css'
})
export class SingleDestinationComponent implements OnInit {
  destination: Destination | undefined;
  constructor(private destinationsService: DestinationsService, private route: ActivatedRoute) { }

  ngOnInit() {
  const destinationCode=this.route.snapshot.paramMap.get('destinationCode')?.trim();
  if (destinationCode){
    const destination = this.destinationsService.get(destinationCode);
    if (destination){
      this.destination = destination;
  }
  }
}}