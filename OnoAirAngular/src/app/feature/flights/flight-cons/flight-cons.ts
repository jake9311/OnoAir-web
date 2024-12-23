export class Flight {
    constructor(
        public flightNumber: string,
        public origin: string,
        public destination: string,
        public departureDate: string,
        public departureTime: string,
        public arrivalDate: string,
        public arrivalTime: string,
        public numOfSeats: number,
       
    ) {}
}