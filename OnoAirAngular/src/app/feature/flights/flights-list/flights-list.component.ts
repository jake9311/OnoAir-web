import { Component } from '@angular/core';
import {FlightsService} from '../../../flights.service';
import { Flight } from '../flight-cons/flight-cons';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-flights-list',
  imports: [],
  templateUrl: './flights-list.component.html',
  styleUrl: './flights-list.component.css'
})
export class FlightsListComponent implements OnInit {
  flights!: Flight[];
  //constructor(private flightService: FlightsService){}
  constructor(private flightService: FlightsService ) { }
  ngOnInit() :void{
    this.flights = this.flightService.list();
  }
} 


