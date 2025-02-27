import { QueryDocumentSnapshot,SnapshotOptions } from 'firebase/firestore';
import { Destination } from '../destinations-model/destination-model';



export const destinationConverter={
    toFirestore(destination: Destination){
      return{
        name: destination.name,
        airportName: destination.airportName,
        destinationCode: destination.destinationCode,
        airportWebsite: destination.airportWebsite,
        airportImg: destination.airportImg,
        status: destination.status
      }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Destination{
      const data = snapshot.data(options);
      return new Destination(data['name'],data['airportName'],data['destinationCode'],data['airportWebsite'],data['airportImg'],data['status'])
    }
  }