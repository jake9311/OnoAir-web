
import { Injectable } from '@angular/core';
import { Firestore,  collection,  getDocs,  addDoc,  updateDoc,  query,  where,Timestamp,} from '@angular/fire/firestore';
import { Flight } from './flight-model/flight-model';
import { objectStatus } from '../../shared/object-status/object-status.enum';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private flightsCollection;

  constructor(private firestore: Firestore) {
   
    this.flightsCollection = collection(this.firestore, 'flights');
  }


  // async uploadFlightsToFirestore(): Promise<void> {
  //   const flights: Flight[] = [
  //     new Flight(
  //       "W61283",
  //       "Tel-Aviv",
  //       "Berlin",
  //       this.generateDate(50, "12:50"), 
  //       "12:50",
  //       this.generateDate(52, "20:00"), 
  //       "20:00",
  //       2,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "AA1234",
  //       "New York",
  //       "London",
  //       this.generateDate(3, "14:00"),
  //       "14:00",
  //       this.generateDate(4, "12:30"),
  //       "12:30",
  //       150,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "BA5678",
  //       "Paris",
  //       "Tel-Aviv",
  //       this.generateDate(5, "14:00"),
  //       "14:00",
  //       this.generateDate(5, "15:30"),
  //       "15:30",
  //       75,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "EK9876",
  //       "Dubai",
  //       "Sydney",
  //       this.generateDate(2, "22:00"),
  //       "22:00",
  //       this.generateDate(2, "10:00"),
  //       "10:00",
  //       300,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "LH4321",
  //       "Rome",
  //       "Berlin",
  //       this.generateDate(9, "18:00"),
  //       "18:00",
  //       this.generateDate(9, "20:30"),
  //       "20:30",
  //       200,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "AF6789",
  //       "Paris",
  //       "Rome",
  //       this.generateDate(6, "09:15"),
  //       "09:15",
  //       this.generateDate(6, "11:30"),
  //       "11:30",
  //       100,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "QF3456",
  //       "Sydney",
  //       "Dubai",
  //       this.generateDate(15, "16:00"),
  //       "16:00",
  //       this.generateDate(15, "22:00"),
  //       "22:00",
  //       280,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "UA2345",
  //       "Los Angeles",
  //       "Tokyo",
  //       this.generateDate(9, "23:00"),
  //       "23:00",
  //       this.generateDate(10, "11:00"),
  //       "11:00",
  //       120,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "JL5432",
  //       "Tokyo",
  //       "Los Angeles",
  //       this.generateDate(1, "23:50"),
  //       "23:50",
  //       this.generateDate(2, "09:00"),
  //       "09:00",
  //       180,
  //       objectStatus.Active
  //     ),
  //     new Flight(
  //       "LY8901",
  //       "Tel-Aviv",
  //       "New York",
  //       this.generateDate(20, "23:30"),
  //       "23:30",
  //       this.generateDate(21, "06:00"),
  //       "06:00",
  //       220,
  //       objectStatus.Active
  //     )
  //   ];

  //   try {
  //     for (const flight of flights) {
  //     
  //       const docData = {
  //         ...flight,
  //         boardingDate: Timestamp.fromDate(flight.boardingDate),
  //         arrivalDate: Timestamp.fromDate(flight.arrivalDate)
  //       };

  //       await addDoc(this.flightsCollection, docData);
  //       console.log(`✅ Flight ${flight.flightNumber} uploaded to Firestore.`);
  //     }
  //   } catch (error) {
  //     console.error('❌ Error uploading flights to Firestore:', error);
  //   }
  // }


  async list(onlyActive = false): Promise<Flight[]> {
    const querySnapshot = await getDocs(this.flightsCollection);

    const flights: Flight[] = querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Record<string, any>;

   
      const bd: Date = data['boardingDate']?.toDate
        ? data['boardingDate'].toDate()
        : data['boardingDate'] ?? new Date();

      const ad: Date = data['arrivalDate']?.toDate
        ? data['arrivalDate'].toDate()
        : data['arrivalDate'] ?? new Date();

   
      return new Flight(
        data['flightNumber'],
        data['origin'],
        data['destination'],
        bd,
        data['boardingTime'],
        ad,
        data['arrivalTime'],
        data['numOfSeats'],
        data['status']
      );
    });
    return onlyActive
      ? flights.filter((f) => f.status === objectStatus.Active)
      : flights;
  }

  async get(flightNumber: string): Promise<Flight | undefined> {
    const q = query(
      this.flightsCollection,
      where('flightNumber', '==', flightNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`❌ Flight "${flightNumber}" not found in Firestore.`);
      return undefined;
    }

    const data = querySnapshot.docs[0].data() as Record<string, any>;

    const bd: Date = data['boardingDate']?.toDate
      ? data['boardingDate'].toDate()
      : data['boardingDate'] ?? new Date();

    const ad: Date = data['arrivalDate']?.toDate
      ? data['arrivalDate'].toDate()
      : data['arrivalDate'] ?? new Date();

    return new Flight(
      data['flightNumber'],
      data['origin'],
      data['destination'],
      bd,
      data['boardingTime'],
      ad,
      data['arrivalTime'],
      data['numOfSeats'],
      data['status']
    );
  }


  async addFlight(flight: Flight): Promise<void> {
    
  
    await addDoc(this.flightsCollection, {
      ...flight,
      boardingDate: Timestamp.fromDate(flight.boardingDate), 
      arrivalDate: Timestamp.fromDate(flight.arrivalDate)
    });
  
  }
  
  
  
 







  async updateFlightStatus(
    flightNumber: string,
    newStatus: objectStatus
  ): Promise<void> {
    const q = query(
      this.flightsCollection,
      where('flightNumber', '==', flightNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`❌ Flight "${flightNumber}" not found in Firestore.`);
      return;
    }

    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, { status: newStatus });
  }


  async updateFlight(updatedFlight: Flight): Promise<void> {
    const q = query(
      this.flightsCollection,
      where('flightNumber', '==', updatedFlight.flightNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(
        `❌ Flight "${updatedFlight.flightNumber}" not found in Firestore.`
      );
      return;
    }

    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      ...updatedFlight,
      boardingDate: Timestamp.fromDate(updatedFlight.boardingDate),
      arrivalDate: Timestamp.fromDate(updatedFlight.arrivalDate),
    });
  }

  // async deleteAllFlights(): Promise<void> {
  //   try {
  //     const querySnapshot = await getDocs(this.flightsCollection);

  //     if (querySnapshot.empty) {
  //       console.log('📂 No flights found in Firestore.');
  //       return;
  //     }

  //     console.log(
  //       `🚀 Deleting ${querySnapshot.size} flights from Firestore...`
  //     );

  //     for (const document of querySnapshot.docs) {
  //       await deleteDoc(document.ref);
  //       console.log(`🗑️ Deleted flight: ${document.id}`);
  //     }

  //     console.log('✅ All flights have been deleted from Firestore.');
  //   } catch (error) {
  //     console.error('❌ Error deleting flights:', error);
  //   }
  // }

  
  private generateDate(daysFromToday: number, time: string): Date {
    const today = new Date();
    today.setDate(today.getDate() + daysFromToday);

    const [hours, minutes] = time.split(':').map(Number);
    today.setHours(hours, minutes, 0, 0);

    return today;
  }
}
