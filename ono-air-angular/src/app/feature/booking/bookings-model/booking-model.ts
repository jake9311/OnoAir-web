export class MyBooking {
    
    constructor(
        public id: string,
        public from: string,
        public fromDate: Date,
        public to: string,
        public toDate: Date,
        public numOfPassengers: number,
        public passengers: { name: string; passport: string }[]
        
    ) { }
}