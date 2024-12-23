import { Routes } from '@angular/router';
import { HomepageComponent } from './feature/homePage/homepage/homepage.component';
import { ManageDestinationsComponent } from './feature/destinations/manage-destinations/manage-destinations.component';
import { ManageFlightsComponent } from './feature/flights/manage-flights/manage-flights.component';
import { ManageBookingsComponent } from './feature/booking/manage-bookings/manage-bookings.component';
import { BookFlightComponent } from './feature/booking/book-flight/book-flight.component';
import { FlightsListComponent } from './feature/flights/flights-list/flights-list.component';
export const routes: Routes = [
    { path: '', component: HomepageComponent},
    { path: 'manage-destinations', component: ManageDestinationsComponent},
    {path: 'manage-flights', component: ManageFlightsComponent},
    {path: 'manage-bookings', component: ManageBookingsComponent},
    {path: 'book-flight', component: BookFlightComponent},
    {path:'flights-list', component: FlightsListComponent}
];
