
import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { Flight } from '../flight-model/flight-model';

export const flightConverter: FirestoreDataConverter<Flight> = {
    toFirestore(flight: Flight) {
        let bd: Date;
        let ad: Date;
      
        if (flight.boardingDate instanceof Timestamp) {
          bd = flight.boardingDate.toDate();
        } else {
          bd = flight.boardingDate; 
        }
       
        if (flight.arrivalDate instanceof Timestamp) {
          ad = flight.arrivalDate.toDate();
        } else {
          ad = flight.arrivalDate;
        }
      
        return {
          ...flight,
          boardingDate: Timestamp.fromDate(bd),
          arrivalDate: Timestamp.fromDate(ad)   
        };
      }
    ,      
  
  fromFirestore(snapshot) {
    const data = snapshot.data();


    const boardingDate = data['boardingDate'] instanceof Timestamp
      ? data['boardingDate'].toDate()
      : data['boardingDate']; 

    const arrivalDate = data['arrivalDate'] instanceof Timestamp
      ? data['arrivalDate'].toDate()
      : data['arrivalDate']; 

    return new Flight(
      data['flightNumber'],
      data['origin'],
      data['destination'],
      boardingDate,
      data['boardingTime'],
      arrivalDate,
      data['arrivalTime'],
      data['numOfSeats'],
      data['status']
    );
  }
};