import { Injectable } from '@angular/core';
import { Flight } from './flight-model/flight-model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
   private flights=[
   (()=>{
    const boardingDate=this.generateFlightDate(50);
    const arrivalDate=this.generateFlightDate(52);
    return new Flight("W61283", "Tel-Aviv", "Berlin",  boardingDate.flightDate, "12:50", arrivalDate.flightDate, "20:00", 2)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(3);
    const arrivalDate=this.generateFlightDate(4);
    return new Flight("AA1234", "New York", "Los Angeles",  boardingDate.flightDate, "14:00", arrivalDate.flightDate, "12:30", 150)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(5);
    const arrivalDate=this.generateFlightDate(5);
    return new Flight("BA5678", "London", "Paris", boardingDate.flightDate, "14:00", arrivalDate.flightDate, "15:30", 75)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(2);
    const arrivalDate=this.generateFlightDate(2);
    return new Flight("EK9876", "Dubai", "Tokyo", boardingDate.flightDate, "22:00", arrivalDate.flightDate, "10:00", 300)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(9);
    const arrivalDate=this.generateFlightDate(9);
    return new Flight("LH4321", "Frankfurt", "Berlin", boardingDate.flightDate, "18:00", arrivalDate.flightDate, "20:30", 200)
   })(),
   
   (()=>{
    const boardingDate=this.generateFlightDate(6);
    const arrivalDate=this.generateFlightDate(6);
    return new Flight("AF6789", "Paris", "Rome", boardingDate.flightDate, "09:15",arrivalDate.flightDate, "11:30", 100)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(15);
    const arrivalDate=this.generateFlightDate(15);
    return new Flight("QF3456", "Sydney", "Dubai",boardingDate.flightDate, "16:00", arrivalDate.flightDate, "22:00", 280)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(9);
    const arrivalDate=this.generateFlightDate(10);
    return new Flight("UA2345", "Berlin", "New York", boardingDate.flightDate, "23:00", arrivalDate.flightDate, "11:00", 120)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(1);
    const arrivalDate=this.generateFlightDate(2);
    return new Flight("JL5432", "Tokyo", "Sydney", boardingDate.flightDate, "23:50", arrivalDate.flightDate, "09:00", 180)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(20);
    const arrivalDate=this.generateFlightDate(21);
    return new Flight("LY8901", "Tel-Aviv", "New York", boardingDate.flightDate, "23:30", arrivalDate.flightDate, "06:00", 220)
   })(),




    // new Flight("W61283", "Tel-Aviv", "Berlin", generateFlightDate(1).boardingDateDate, "12:50", "01.12.24", "20:00", 2),
    // new Flight("AA1234", "New York", "Los Angeles", "05.12.24", "08:00", "05.12.24", "12:30", 150),
    // new Flight("BA5678", "London", "Paris", "10.12.24", "14:00", "10.12.24", "15:30", 75),
    // new Flight("EK9876", "Dubai", "Tokyo", "20.12.24", "22:00", "21.12.24", "10:00", 300),
    // new Flight("LH4321", "Frankfurt", "Berlin", "25.12.24", "18:00", "25.12.24", "20:30", 200),
    // new Flight("AF6789", "Paris", "Rome", "30.12.24", "09:15", "30.12.24", "11:30", 100),
    // new Flight("QF3456", "Sydney", "Dubai", "15.01.25", "16:00", "15.01.25", "22:00", 280),
    // new Flight("UA2345", "Berlin", "New York", "18.01.25", "07:00", "18.01.25", "11:00", 120),
    // new Flight("JL5432", "Tokyo", "Sydney", "25.01.25", "23:50", "26.01.25", "09:00", 180),
    // new Flight("LY8901", "Tel-Aviv", "New York", "02.02.25", "23:30", "03.02.25", "06:00", 220),
   ]
  constructor() { }
  list(): Flight[]{
    return this.flights;
  }
  get (flightNumber: string): Flight| undefined{
    return this.flights.find(flight => flight.flightNumber === flightNumber);
}


 generateFlightDate(daysFromTodayForFlight: number,):
  { flightDate: string; } {
    const today = new Date();Number

    const flightDateTime = new Date(today);
    flightDateTime.setDate(today.getDate() + daysFromTodayForFlight);
    const flightDate= flightDateTime.toISOString().split('T')[0];


    return { flightDate };
 }
}