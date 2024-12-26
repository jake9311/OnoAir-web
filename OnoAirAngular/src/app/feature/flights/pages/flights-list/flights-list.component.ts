import { Component } from '@angular/core';
import {FlightsService} from '../../flights.service';
import { Flight } from '../../flight-model/flight-model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-flights-list',
  imports: [],
  templateUrl: './flights-list.component.html',
  styleUrl: './flights-list.component.css'
})
export class FlightsListComponent implements OnInit {
  flights!: Flight[];
  displayedColumns: string[] = ['flightNumber', 'origin', 'destination', 'action'];
  
  constructor(private flightService: FlightsService ) { }
  ngOnInit() :void{
    this.flights = this.flightService.list();
  }
} 


