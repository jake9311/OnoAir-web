import { objectStatus } from '../../../shared/object-status/object-status.enum';
export class MyBooking {
    
    constructor(
        public id: string,
        public flightNumber: string,
        public from: string,
        public fromDate: Date,
        public to: string,
        public toDate: Date,
        public numOfPassengers: number,
        public passengers: { name: string; passport: string }[],
        public status: objectStatus,
        
        
    ) { }
}