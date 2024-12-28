export class MyBooking {
    constructor(
        public from: string,
        public fromDate: string,
        public fromTime: string,
        public to: string,
        public toDate: string,
        public toTime: string,
        public numOfPassengers: number
    ) { }
}