import { objectStatus } from "../../../shared/object-status/object-status.enum";
export class Flight {
    constructor(
        public flightNumber: string,
        public origin: string,
        public destination: string,
        public boardingDate: Date,
        public boardingTime: string,
        public arrivalDate: Date,
        public arrivalTime: string,
        public numOfSeats: number,
        public status: objectStatus,
    ) {}

  
}