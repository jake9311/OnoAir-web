import { destinations } from "../data/destinations.js";
import { flights } from "../data/flights.js";

function populateSelectOptions() {
    const originSelect = document.getElementById("origin");
    const destinationSelect = document.getElementById("destination");



    destinations.forEach(destination => {
        const originOption = document.createElement("option");
        originOption.value = destination.name;
        console.log(originOption);
        originOption.textContent = destination.name;
        console.log(originOption.value)
        originSelect.appendChild(originOption);

        const destinationOption = document.createElement("option");
        destinationOption.value = destination.name;
        destinationOption.textContent = destination.name;
        destinationSelect.appendChild(destinationOption);
    });
}


function searchFlights() {
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 

    if (!origin || !destination) {
        resultsDiv.textContent = "Please select both origin and destination.";
        return;
    }

    const matchingFlights = flights.filter(flight => 
        flight.origin === origin && flight.destination === destination
    );

    if (matchingFlights.length === 0) {
        resultsDiv.textContent = "No flights found for the selected route.";
        return;
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

   thead.innerHTML = `
        <tr>
            <th>Flight No.</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Boarding Date</th>
            <th>Boarding Time</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Number of Seats</th>
            <th> </th>
        </tr>`;
    matchingFlights.forEach(flight=>{
        const row=document.createElement("tr");
        row.innerHTML=`
        <td>${flight.flightNo}</td>
            <td>${flight.origin}</td>
            <td>${flight.destination}</td>
            <td>${flight.boardingDate}</td>
            <td>${flight.boardingTime}</td>
            <td>${flight.arrivalDate}</td>
            <td>${flight.arrivalTime}</td>
            <td>${flight.numberOfSeats}</td>
            <td><button class="book-btn">Book</button></td>
        `;
        row.querySelector(".book-btn").addEventListener("click", () => {
            bookFlight(flight);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultsDiv.appendChild(table);
}
function bookFlight(flight) {
    const flightDetails = [
        flight.flightNo,
        flight.origin,
        flight.destination,
        flight.boardingDate,
        flight.boardingTime,
        flight.arrivalDate,
        flight.arrivalTime,
        flight.numberOfSeats
    ].join(","); 

    localStorage.setItem("selectedFlight", flightDetails); 
    window.location.href = "flightBooking.html"; 
}

document.addEventListener("DOMContentLoaded", () => {
    populateSelectOptions();
    document.getElementById("searchButton").addEventListener("click", searchFlights);
});