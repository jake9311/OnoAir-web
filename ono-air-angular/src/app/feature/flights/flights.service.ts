import { Injectable } from '@angular/core';
import { Flight } from './flight-model/flight-model';
import { objectStatus } from '../../shared/object-status/object-status.enum';

@Injectable({
  providedIn: 'root'
})

export class FlightsService {
   private flights=[
   (()=>{
    const boardingDate=this.generateFlightDate(50,"12:50");
    const arrivalDate=this.generateFlightDate(52,"20:00");
    return new Flight("W61283", "Tel-Aviv", "Berlin",  boardingDate.flightDate, "12:50", arrivalDate.flightDate, "20:00", 2, objectStatus.Active)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(3,"14:00");
    const arrivalDate=this.generateFlightDate(4, "12:30");
    return new Flight("AA1234", "New York", "London",  boardingDate.flightDate, "14:00", arrivalDate.flightDate, "12:30", 150, objectStatus.Active)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(5,"14:00");
    const arrivalDate=this.generateFlightDate(5,"15:30");
    return new Flight("BA5678", "Paris", "Tel-Aviv", boardingDate.flightDate, "14:00", arrivalDate.flightDate, "15:30", 75, objectStatus.Active)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(2,"22:00");
    const arrivalDate=this.generateFlightDate(2,"10:00");
    return new Flight("EK9876", "Dubai", "Sydney", boardingDate.flightDate, "22:00", arrivalDate.flightDate, "10:00", 300, objectStatus.Active)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(9,"18:00");
    const arrivalDate=this.generateFlightDate(9, "20:30");
    return new Flight("LH4321","Rome", "Berlin", boardingDate.flightDate, "18:00", arrivalDate.flightDate, "20:30", 200, objectStatus.Active)
   })(),
   
   (()=>{
    const boardingDate=this.generateFlightDate(6,"09:15");
    const arrivalDate=this.generateFlightDate(6,"11:30");
    return new Flight("AF6789", "Paris", "Rome", boardingDate.flightDate, "09:15",arrivalDate.flightDate, "11:30", 100, objectStatus.Active)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(15,"16:00");
    const arrivalDate=this.generateFlightDate(15,"22:00");
    return new Flight("QF3456", "Sydney", "Dubai",boardingDate.flightDate, "16:00", arrivalDate.flightDate, "22:00", 280, objectStatus.Active)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(9,"23:00");
    const arrivalDate=this.generateFlightDate(10, "11:00");
    return new Flight("UA2345", "Los Angeles", "Tokyo", boardingDate.flightDate, "23:00", arrivalDate.flightDate, "11:00", 120, objectStatus.Active)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(1,"23:50");
    const arrivalDate=this.generateFlightDate(2, "09:00");
    return new Flight("JL5432", "Tokyo", "Los Angeles", boardingDate.flightDate, "23:50", arrivalDate.flightDate, "09:00", 180, objectStatus.Active)
   })(),

   (()=>{
    const boardingDate=this.generateFlightDate(20,"23:30");
    const arrivalDate=this.generateFlightDate(21,"06:00");
    return new Flight("LY8901", "Tel-Aviv", "New York", boardingDate.flightDate, "23:30", arrivalDate.flightDate, "06:00", 220, objectStatus.Active)
   })(),

   ]
 

  list(onlyActive = false): Flight[] {
    return this.flights
      .filter(flight => !onlyActive || flight.status === objectStatus.Active)
      .map(flight => ({
        ...flight,
        boardingDate: flight.boardingDate instanceof Date ? flight.boardingDate : new Date(flight.boardingDate),
        arrivalDate: flight.arrivalDate instanceof Date ? flight.arrivalDate : new Date(flight.arrivalDate)
      }));
  }
  
  
  get (flightNumber: string): Flight| undefined{
    return this.flights.find(flight => flight.flightNumber === flightNumber);
}


 generateFlightDate(daysFromTodayForFlight: number, time: string): { flightDate: Date } {
  const today = new Date();
  const flightDateTime = new Date(today);
  flightDateTime.setDate(today.getDate() + daysFromTodayForFlight);

 
  const [hours, minutes] = time.split(':').map(Number);
  flightDateTime.setHours(hours, minutes, 0, 0);

  return { flightDate: flightDateTime };
}



 addFlight(flight: Flight): void{
  this.flights.push(flight);
 }

 updateFlightStatus(flightNumber: string, newStatus: objectStatus): void {
  const flight = this.get(flightNumber);
  if (flight) {
    flight.status = newStatus;
  }
}

  updateFlight(updatedFlight: Flight): void {
    const index = this.flights.findIndex(f => f.flightNumber === updatedFlight.flightNumber);
    if (index !== -1) {
      this.flights[index] = {...updatedFlight};
      this.flights=[...this.flights];
      console.log(this.flights);
    }
  }
}