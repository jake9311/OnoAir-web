import { Routes } from '@angular/router';
import { HomepageComponent } from './feature/homePage/homepage/homepage.component';
import { ManageDestinationsComponent } from './feature/destinations/manage-destinations/manage-destinations.component';
import { ManageFlightsComponent } from './feature/flights/pages/manage-flights/manage-flights.component';
import { ManageBookingsComponent } from './feature/booking/manage-bookings/manage-bookings/manage-bookings.component';
import { FlightsListComponent } from './feature/flights/pages/flights-list/flights-list.component';
import { SingleFlightComponent } from './feature/flights/pages/single-flight/single-flight.component';
import { SingleDestinationComponent } from './feature/destinations/single-destination/single-destination/single-destination.component';
import { SearchFlightComponent } from './feature/booking/pages/book-flight/search-flight/search-flight.component';
import { BookFlightComponent } from './feature/booking/pages/book-a-flight/book-flight/book-flight.component';
import { ViewBookingComponent } from './feature/booking/pages/view-booking/view-booking/view-booking.component';
import { HelpComponent } from './feature/help/help/help.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent},
    { path: 'manage-destinations', component: ManageDestinationsComponent},
    {path: 'manage-flights', component: ManageFlightsComponent},
    {path: 'manage-bookings', component: ManageBookingsComponent},
    {path: 'search-flight', component:  SearchFlightComponent},
    {path:'flights-list', component: FlightsListComponent},
    {path: 'homepage', component: HomepageComponent},
    {path: 'flights/:flightNumber', component: SingleFlightComponent},
    {path: 'destinations/:destinationCode', component: SingleDestinationComponent},
    {path: 'book-a-flight/:flightNumber', component: BookFlightComponent},
    {path: 'view-booking/:bookingId', component: ViewBookingComponent},
    {path: 'help', component: HelpComponent}
];
