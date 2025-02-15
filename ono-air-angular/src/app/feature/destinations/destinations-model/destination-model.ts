import { objectStatus } from "../../../shared/object-status/object-status.enum";
export class Destination {
    constructor(
        public name : string,
        public airportName : string,
        public destinationCode : string,
        public airportWebsite : string,
        public airportImg : string,
        public status : objectStatus,
    ){}
}