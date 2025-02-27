import { QueryDocumentSnapshot,SnapshotOptions } from 'firebase/firestore';
import { MyBooking } from '../bookings-model/booking-model';






export const bookingConverter={
    toFirestore(booking: MyBooking){
      return{
        id: booking.id,
        flightNumber: booking.flightNumber,
        from: booking.from,
        fromDate: booking.fromDate,
        to: booking.to,
        toDate: booking.toDate,
        numOfPassengers: booking.numOfPassengers,
        passengers: booking.passengers,
        status: booking.status,
      }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): MyBooking{
      const data = snapshot.data(options);
      return new MyBooking(data['id'],data['flightNumber'],data['from'],data['fromDate'],data['to'],data['toDate'],data['numOfPassengers'],data['passengers'],data['status'])
    }
}