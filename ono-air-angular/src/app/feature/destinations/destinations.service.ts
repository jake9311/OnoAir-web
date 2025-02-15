import { Injectable } from '@angular/core';
import { Destination } from './destinations-model/destination-model';
import { objectStatus } from '../../shared/object-status/object-status.enum';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
private Destinations=[
  new Destination("Tel-Aviv", "Ben Gurion Airport", "TLV", "https://www.iaa.gov.il/en/", "https://img.mako.co.il/2021/04/15/0a3ad0af-3a00-45a7-b342-106a97ef8f65_autoOrient_i.jpg", objectStatus.Active),
  new Destination("New York", "John F. Kennedy Airport", "JFK", "https://www.jfkairport.com/", "https://i.insider.com/6202bf9dbd50410019193b49?width=800&format=jpeg&auto=webp", objectStatus.Active),
  new Destination("London", "Heathrow Airport", "LHR", "https://www.heathrow.com/", "https://oxfordecocars.com/wp-content/uploads/2024/05/heathrow-terminal-4-reopen.jpg", objectStatus.Active),
  new Destination("Paris", "Charles de Gaulle Airport", "CDG", "https://www.parisaeroport.fr/", "https://i1.wp.com/www.charlesdegaulleairport.co.uk/wp-content/uploads/2010/08/Gary-Bembridge.jpg", objectStatus.Active),
  new Destination("Dubai", "Dubai International Airport", "DXB", "https://www.dubaiairports.ae/", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYpJbJ1AottycxDRxN_sTJNK9l8fONlIqKRg&s", objectStatus.Active),
  new Destination("Rome", "Leonardo da Vinci Airport", "FCO", "https://www.adr.it/fiumicino", "https://static.ffx.io/images/$zoom_1%2C$multiply_0.4049%2C$ratio_1.777778%2C$width_1976%2C$x_24%2C$y_160/t_crop_custom/q_86%2Cf_auto/t_traveller_no_label_no_age_social_wm/dfbfaf872ec9186a479afaa7fc981cbdccb05409", objectStatus.Active),
  new Destination("Berlin", "Berlin Brandenburg Airport", "BER", "https://ber.berlin-airport.de/", "https://www.airport-technology.com/wp-content/uploads/sites/14/2021/02/Berlin-Brandenburg-Airport.jpg", objectStatus.Active),
  new Destination("Tokyo", "Haneda Airport", "HND", "https://tokyo-haneda.com/", "https://tokyo-haneda.com/site_resource/flight/img/flight__img_int_arr_immigration_t2.png", objectStatus.Active),
  new Destination("Sydney", "Kingsford Smith Airport", "SYD", "https://www.sydneyairport.com.au/", "https://c8.alamy.com/comp/PY3PF1/detail-from-sydney-kingsford-smith-airport-in-sydney-australia-looking-towards-the-international-terminal-on-the-western-side-of-the-airport-PY3PF1.jpg", objectStatus.Active),
  new Destination("Los Angeles", "Los Angeles International Airport", "LAX", "https://www.flylax.com/", "https://media.cnn.com/api/v1/images/stellar/prod/221031110648-lax-airport-hazardous-materials-restricted.jpg?c=16x9&q=h_833,w_1480,c_fill", objectStatus.Active),
]

list(onlyActive = false): Destination[] {
  return onlyActive ? this.Destinations.filter(d => d.status === objectStatus.Active) : this.Destinations;
}

  get (destinationCode: string): Destination| undefined{
    return this.Destinations.find(d => d.destinationCode === destinationCode);
  }

  getImgUrl(name: string): string | undefined {
    return this.Destinations.find(d => d.name=== name)?.airportImg;
  }
  getImgUrlbyDestinationAirportName(airportName: string): string | undefined {
    return this.Destinations.find(d => d.airportName=== airportName)?.airportImg;
  }

  addDestination(destination: Destination): void {
    this.Destinations.push(destination);
  }

  updateDestinationStatus(destinationCode: string, newStatus: objectStatus): void {
    const destination = this.get(destinationCode);
    if (destination) {
      destination.status = newStatus;
    }
  }
  updateDestination(updatedDestination: Destination): void {
    const index = this.Destinations.findIndex(dest => dest.destinationCode === updatedDestination.destinationCode);
    if (index !== -1) {
      this.Destinations[index] = updatedDestination;
    }
  }

}
