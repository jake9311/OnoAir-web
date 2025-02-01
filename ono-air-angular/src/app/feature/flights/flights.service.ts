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

   ]
 
  list(): Flight[]{
    return this.flights;
  }
  get (flightNumber: string): Flight| undefined{
    return this.flights.find(flight => flight.flightNumber === flightNumber);
}


 generateFlightDate(daysFromTodayForFlight: number,):
  { flightDate: string; } {
    const today = new Date();

    const flightDateTime = new Date(today);
    flightDateTime.setDate(today.getDate() + daysFromTodayForFlight);
    const flightDate= flightDateTime.toISOString().split('T')[0];


    return { flightDate };
 }



}