

import { Injectable } from '@angular/core';
import { Destination } from './destinations-model/destination-model';
import { objectStatus } from '../../shared/object-status/object-status.enum';
import {Firestore, collection ,getDocs,addDoc, doc, updateDoc, setDoc,CollectionReference, query, where} from '@angular/fire/firestore';
import { destinationConverter } from './pages/destination-converter';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  private destinationsCollection: CollectionReference;


constructor(private firestore: Firestore) {
  this.destinationsCollection = collection(this.firestore, 'destinations');
 }


async list(onlyActive = false): Promise<Destination[]> {
  const querySnapshot = await getDocs(this.destinationsCollection);
  const destinations: Destination[] = querySnapshot.docs.map(doc => doc.data() as Destination); // המרת המסמכים לאובייקטים
  return onlyActive ? destinations.filter(d => d.status === objectStatus.Active) : destinations;
}



async get(destinationCode: string): Promise<Destination | undefined> {
  const q = query(collection(this.firestore, 'destinations'), where('destinationCode', '==', destinationCode));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.warn(`❌ Destination "${destinationCode}" not found in Firestore.`);
    return undefined;
  }

  return querySnapshot.docs[0].data() as Destination;
}



async getImgUrl(name: string): Promise<string | undefined> {
  const querySnapshot = await getDocs(collection(this.firestore, 'destinations'));

  const destination = querySnapshot.docs
    .map(doc => doc.data() as Destination)
    .find(d => d.name === name);

  return destination ? destination.airportImg : undefined;
}


async getImgUrlbyDestinationAirportName(airportName: string): Promise<string | undefined> {
  const querySnapshot = await getDocs(collection(this.firestore, 'destinations'));

  const destination = querySnapshot.docs
    .map(doc => doc.data() as Destination)
    .find(d => d.airportName === airportName||
   d.name === airportName);

  return destination ? destination.airportImg : undefined;
}



async addDestination(destination: Destination): Promise<void> {
  const destinationRef = collection(this.firestore, 'destinations').withConverter(destinationConverter);
  await addDoc(destinationRef, destination);

}

async getDestinationCodeByName(destinationName: string): Promise<string | undefined> {
  const q = query(
    this.destinationsCollection,
    where('airportName', '==', destinationName)||
    where('name', '==', destinationName)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.warn(`⚠️ Destination "${destinationName}" not found.`);
    return undefined;
  }

  const destinationData = querySnapshot.docs[0].data() as Destination;
  return destinationData.destinationCode;
}


async updateDestinationStatus(destinationCode: string, newStatus: objectStatus): Promise<void> {
  const q = query(collection(this.firestore, 'destinations'), where('destinationCode', '==', destinationCode));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return;
  }
  const docRef = querySnapshot.docs[0].ref;
  await updateDoc(docRef, { status: newStatus });
}


async updateDestination(updatedDestination: Destination): Promise<void> {
  const destinationRef = doc(this.firestore, 'destinations', updatedDestination.destinationCode);
  await setDoc(destinationRef, updatedDestination, { merge: true });
}



}




