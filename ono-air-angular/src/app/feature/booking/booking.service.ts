import { Injectable } from '@angular/core';
import { MyBooking } from './bookings-model/booking-model';
import { DestinationsService } from '../destinations/destinations.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private myBookings = [
  new MyBooking(this.generateId(), "Ben Gurion Airport",this.generateDate(50,"10:30") , "John F. Kennedy Airport",this.generateDate(50,"15:30") , 2, [{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'}]),
  new MyBooking(this.generateId(),"John F. Kennedy Airport",this.generateDate(21,"08:00") , "Heathrow Airport", this.generateDate(21,"18:30") , 3, [{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'}]),
  new MyBooking(this.generateId(),"Heathrow Airport", this.generateDate(10,"16:00"), "Charles de Gaulle Airport",this.generateDate(10,"17:30") , 4,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'},{name:'koko', passport: '311111111'}]),
  new MyBooking(this.generateId(),"Dubai International Airport",this.generateDate(-20,"22:30") , "Kingsford Smith Airport", this.generateDate(-20,"10:00"), 5,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'},{name:'koko', passport: '311111111'},{name:'shely', passport: '666334495'}]),
  new MyBooking(this.generateId(),"Leonardo da Vinci Airport", this.generateDate(30,"09:45") , "Berlin Brandenburg Airport", this.generateDate(30,"16:00") , 1,[{name: 'shely',passport:'666334495'}]),
  new MyBooking(this.generateId(),"Charles de Gaulle Airport", this.generateDate(10,"09:15") , "Ben Gurion Airport", this.generateDate(10,"13:15"), 2,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'}]),
  new MyBooking(this.generateId(),"Kingsford Smith Airport", this.generateDate(-10,"14:30") , "Dubai International Airport", this.generateDate(-10,"19:15") , 2,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'}]),
  new MyBooking(this.generateId(),"Dubai International Airport", this.generateDate(-27,"23:50") , "Ben Gurion Airport", this.generateDate(-27,"07:30") , 3,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'}]),
  new MyBooking(this.generateId(),"Los Angeles International Airport", this.generateDate(10,"06:00") , "Tokyo Haneda Airport", this.generateDate(10,"15:15"), 2,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'}]),
  new MyBooking(this.generateId(),"Tokyo Haneda Airport", this.generateDate(2,"21:00") , "Los Angeles International Airport", this.generateDate(2,"15:30"), 5,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'},{name:'koko', passport: '311111111'},{name:'shely', passport: '666334495'}])
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
    
  addBooking(booking: MyBooking) {
    this.generateId();
    this.myBookings.push(booking);
  }

  getBooking() {
  
    return this.myBookings.map((booking) => ({...booking,
        image: this.destinationsService.getImgUrlbyDestinationAirportName(booking.to)})
  )}
  generateId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
  
  getBookingById(id: string): MyBooking | undefined {
    return this.myBookings.find((b) => b.id === id);
  }

  private generateDate(changeDays: number, time: string): Date {
    const date = new Date();
    date.setDate(date.getDate() + changeDays); 
    const [hours, minutes] = time.split(':').map(Number); 
    date.setHours(hours, minutes, 0, 0); 
    return date;
  }
  
}
