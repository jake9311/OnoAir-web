import { Injectable } from '@angular/core';
import { MyBooking } from './bookings-model/booking-model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private myBookings = [
  new MyBooking("Ben Gurion Airport", "01/07/2024", "10:30", "John F. Kennedy Airport", "01/07/2024", "15:30", 3),
  new MyBooking("John F. Kennedy Airport", "15/06/2024", "08:00", "Heathrow Airport", "15/06/2024", "18:30", 2),
  new MyBooking("Heathrow Airport", "10/05/2024", "16:00", "Charles de Gaulle Airport", "10/05/2024", "17:30", 4),
  new MyBooking("Dubai International Airport", "20/04/2024", "22:30", "Kingsford Smith Airport", "21/04/2024", "10:00", 5),
  new MyBooking("Leonardo da Vinci Airport", "18/03/2024", "13:45", "Berlin Brandenburg Airport", "18/03/2024", "16:00", 1),
  new MyBooking("Charles de Gaulle Airport", "07/02/2024", "09:15", "Ben Gurion Airport", "07/02/2024", "13:15", 6),
  new MyBooking("Kingsford Smith Airport", "12/01/2024", "14:30", "Dubai International Airport", "12/01/2024", "19:15", 2),
  new MyBooking("Dubai International Airport", "25/12/2023", "23:50", "Ben Gurion Airport", "26/12/2023", "07:30", 3),
  new MyBooking("Los Angeles International Airport", "05/11/2023", "06:00", "Tokyo Haneda Airport", "05/11/2023", "15:15", 2),
  new MyBooking("Tokyo Haneda Airport", "20/10/2023", "21:00", "Los Angeles International Airport", "21/10/2023", "15:30", 7)
]
  constructor() { }
 list(): MyBooking[] {
    return this.myBookings;
  }
  get (to: string): MyBooking| undefined{
    return this.myBookings.find(b => b.to === to);
  }


}
