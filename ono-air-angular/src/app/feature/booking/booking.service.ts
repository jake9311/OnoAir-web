

import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, addDoc, updateDoc,getDoc, query, where,CollectionReference,Timestamp,or  } from '@angular/fire/firestore';
import { MyBooking } from './bookings-model/booking-model';
import { objectStatus } from '../../shared/object-status/object-status.enum';
import { DestinationsService } from '../destinations/destinations.service';



@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsCollection: CollectionReference;
  private destinationsCollection: CollectionReference;
  private destinationsService: DestinationsService;

  constructor(private firestore: Firestore,  destinationsService: DestinationsService) {
   this. bookingsCollection = collection(this.firestore, 'bookings');
this. destinationsCollection = collection(this.firestore, 'destinations');
this.destinationsService = destinationsService;
  }

 
  async list(): Promise<MyBooking[]> {
    const querySnapshot = await getDocs(this.bookingsCollection);

    const bookings: MyBooking[] = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const bookingData = docSnap.data() as MyBooking;

        const fromDate = bookingData.fromDate instanceof Timestamp ? bookingData.fromDate.toDate() : bookingData.fromDate;
        const toDate = bookingData.toDate instanceof Timestamp ? bookingData.toDate.toDate() : bookingData.toDate;
  
    
        const destinationQuery=query(this.destinationsCollection,
          or(
            where('airportName', '==', bookingData.to),
            where('name', '==', bookingData.to)
          )
        )
        const destinationSnapshot = await getDocs(destinationQuery);

        let imageUrl = 'assets/default-image.jpg'; 
        if (!destinationSnapshot.empty) {
          const destinationData = destinationSnapshot.docs[0].data();
          imageUrl = destinationData['airportImg'] || imageUrl;
        }

        return {
          ...bookingData,
          id: docSnap.id, 
          fromDate: fromDate,
          toDate: toDate,
          image: imageUrl 
        } as MyBooking;
      })
    );

    return bookings;
  }

 async get(bookingId: string): Promise<MyBooking | undefined> {
  try {
    const docRef = doc(this.bookingsCollection, bookingId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return undefined;
    }

    const bookingData = docSnap.data() as MyBooking;
    return bookingData;
  } catch (error) {
    console.error('❌ Error getting booking:', error);
    return undefined;
  }
}



  async addBooking(booking: MyBooking): Promise<void> {
    try {
      const docRef = await addDoc(this.bookingsCollection, booking);
      console.log(`✅ Booking added with ID: ${docRef.id}`);
    } catch (error) {
      console.error('❌ Error adding booking:', error);
    }
  }


  async updateBookingStatus(bookingId: string, newStatus: objectStatus): Promise<void> {
    const bookingRef = doc(this.firestore, 'bookings', bookingId);
      await updateDoc(bookingRef, { status: newStatus });
  }
    generateId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
    private generateDate(changeDays: number, time: string): Date {
    const date = new Date();
    date.setDate(date.getDate() + changeDays); 
    const [hours, minutes] = time.split(':').map(Number); 
    date.setHours(hours, minutes, 0, 0); 
    return date;
  }


  async getImageForBooking(destinationName: string): Promise<string> {
    
    const destinationCode = await this.destinationsService.getDestinationCodeByName(destinationName);
    try {
     
      if (!destinationCode) {
        console.warn(`⚠️ לא נמצא destinationCode עבור '${destinationName}', משתמש בתמונת ברירת מחדל.`);
        return 'https://via.placeholder.com/150';
      }
  
      console.log(`🔍 מחפש תמונה לפי קוד יעד: ${destinationCode}`);
  
      const destinationQuery = query(
        this.destinationsCollection,
        where('destinationCode', '==', destinationCode) // 3. כאן כבר בטוח שלא undefined
      );
      const destinationSnapshot = await getDocs(destinationQuery);
  
      if (destinationSnapshot.empty) {
        console.warn(`⚠️ לא נמצאה תמונה ליעד עם הקוד: ${destinationCode}`);
        return 'https://via.placeholder.com/150';
      }
  
      const destinationData = destinationSnapshot.docs[0].data();
      console.log(`✅ תמונה שנמצאה: ${destinationData['airportImg']}`);
      return destinationData['airportImg'] ?? 'https://via.placeholder.com/150';
  
    } catch (error) {
      console.error('❌ שגיאה בעת שליפת התמונה:', error);
      return 'https://via.placeholder.com/150';
    }
  }
  

  }
  










  // async uploadBookingsToFirestore(): Promise<void> {

  //   const existingBookingsSnapshot = await getDocs(this.bookingsCollection);
  //   for (const bookingDoc of existingBookingsSnapshot.docs) {
  //     await deleteDoc(doc(this.bookingsCollection, bookingDoc.id));
  //     console.log(`🗑️ Deleted booking with ID: ${bookingDoc.id}`);
  //   }

  //   const myBookings: MyBooking[] = [
  //     new MyBooking(this.generateId(),"LY8901","Ben Gurion Airport",this.generateDate(50,"10:30"), "John F. Kennedy Airport",this.generateDate(50,"15:30"), 2, [{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"AA1234","John F. Kennedy Airport",this.generateDate(21,"08:00"), "Heathrow Airport", this.generateDate(21,"18:30"), 3, [{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"BA5678","Heathrow Airport", this.generateDate(10,"16:00"), "Charles de Gaulle Airport",this.generateDate(10,"17:30"), 4,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'},{name:'koko', passport: '311111111'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"EK9876","Dubai International Airport",this.generateDate(-20,"22:30"), "Kingsford Smith Airport", this.generateDate(-20,"10:00"), 5,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'},{name:'koko', passport: '311111111'},{name:'shely', passport: '666334495'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"LH4321","Leonardo da Vinci Airport", this.generateDate(30,"09:45"), "Berlin Brandenburg Airport", this.generateDate(30,"16:00"), 1,[{name: 'shely',passport:'666334495'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"BA5678","Charles de Gaulle Airport", this.generateDate(10,"09:15"), "Ben Gurion Airport", this.generateDate(10,"13:15"), 2,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"QF3456","Kingsford Smith Airport", this.generateDate(-10,"14:30"), "Dubai International Airport", this.generateDate(-10,"19:15"), 2,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"EK9876","Dubai International Airport", this.generateDate(-27,"23:50"), "Kingsford Smith Airport", this.generateDate(-27,"07:30"), 3,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"UA2345","Los Angeles International Airport", this.generateDate(10,"06:00"), "Tokyo Haneda Airport", this.generateDate(10,"15:15"), 2,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'}], objectStatus.Active),
  //     new MyBooking(this.generateId(),"JL5432","Tokyo Haneda Airport", this.generateDate(2,"21:00"), "Los Angeles International Airport", this.generateDate(2,"15:30"), 5,[{name: 'yakov makoria', passport: '123456789'}, {name: 'noam ben-asuli', passport: '3456123456'},{name:'alex', passport: '123498589'},{name:'koko', passport: '311111111'},{name:'shely', passport: '666334495'}], objectStatus.Active)
  //   ];

  //   for (const booking of myBookings) {
  //     await addDoc(this.bookingsCollection, { ...booking, 
  //       fromDate: Timestamp.fromDate(booking.fromDate),
  //       toDate: Timestamp.fromDate(booking.toDate),
  //     });
  //     console.log(`✅ Booking ${booking.flightNumber} uploaded to Firestore.`);
  //   }
  // }



  




