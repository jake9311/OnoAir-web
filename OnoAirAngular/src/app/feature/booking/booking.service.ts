import { Injectable } from '@angular/core';
import { MyBooking } from './bookings-model/booking-model';
import { DestinationsService } from '../destinations/destinations.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private myBookings = [
  new MyBooking(this.generateId(), "Ben Gurion Airport", "01/07/2025", "10:30", "John F. Kennedy Airport", "01/07/2025", "15:30", 8),
  new MyBooking(this.generateId(),"John F. Kennedy Airport", "15/06/2024", "08:00", "Heathrow Airport", "15/06/2024", "18:30", 2),
  new MyBooking(this.generateId(),"Heathrow Airport", "10/05/2025", "16:00", "Charles de Gaulle Airport", "10/05/2025", "17:30", 4),
  new MyBooking(this.generateId(),"Dubai International Airport", "20/04/2024", "22:30", "Kingsford Smith Airport", "21/04/2024", "10:00", 5),
  new MyBooking(this.generateId(),"Leonardo da Vinci Airport", "18/03/2025", "13:45", "Berlin Brandenburg Airport", "18/03/2025", "16:00", 1),
  new MyBooking(this.generateId(),"Charles de Gaulle Airport", "07/02/2024", "09:15", "Ben Gurion Airport", "07/02/2024", "13:15", 6),
  new MyBooking(this.generateId(),"Kingsford Smith Airport", "12/01/2024", "14:30", "Dubai International Airport", "12/01/2024", "19:15", 2),
  new MyBooking(this.generateId(),"Dubai International Airport", "25/12/2023", "23:50", "Ben Gurion Airport", "26/12/2023", "07:30", 3),
  new MyBooking(this.generateId(),"Los Angeles International Airport", "05/11/2023", "06:00", "Tokyo Haneda Airport", "05/11/2023", "15:15", 2),
  new MyBooking(this.generateId(),"Tokyo Haneda Airport", "20/10/2023", "21:00", "Los Angeles International Airport", "21/10/2023", "15:30", 7)
]
  constructor( private destinationsService: DestinationsService ) { }
 list(): MyBooking[] {
    return this.myBookings;
  }
  get (to: string): MyBooking| undefined{
    return this.myBookings.find(b => b.to === to);
  }

  getPreviousBookings() {
    const now = new Date();
    return this.myBookings.filter(
      (myBooking) => new Date(myBooking.fromDate) <= now).map((booking) => ({...booking,
        image: this.destinationsService.getImgUrlbyDestinationAirportName(booking.to)})
      
      );}
  

  getNewBookings() {
    const now = new Date();
    return this.myBookings.filter(
      (booking) => new Date(booking.toDate) > now).map((booking) => ({...booking,
        image: this.destinationsService.getImgUrlbyDestinationAirportName(booking.to)})
      );}
    
  addBooking(booking: any) {
    this.generateId();
    this.myBookings.push(booking);
  }

  getBooking() {
  
    return this.myBookings.map((booking) => ({...booking,
        image: this.destinationsService.getImgUrlbyDestinationAirportName(booking.to)})
  )}
   generateId(): string {
    return Math.random().toString(36).substring(2, 15); 
  }
  getBookingById(id: string): MyBooking | undefined {
    return this.myBookings.find((b) => b.id === id);
  }

}
