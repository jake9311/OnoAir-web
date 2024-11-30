import { flights } from '../data/flights.js';


function populateTable() {
    const tableBody = document.querySelector('#flightsTable tbody'); 

    flights.forEach(flight => {
        const row = document.createElement('tr');
        row.setAttribute('bgcolor', 'lightgray'); 

      
        const flightDetails = [
            flight.flightNo, 
            flight.origin, 
            flight.destination, 
            flight.boardingDate, 
            flight.boardingTime, 
            flight.arrivalDate, 
            flight.arrivalTime, 
            flight.numberOfSeats
        ];

        flightDetails.forEach(detail => {
            const cell = document.createElement('td');
            cell.textContent = detail;
            row.appendChild(cell);
        });

     
        tableBody.appendChild(row);
    });
}


document.addEventListener('DOMContentLoaded', populateTable);





document.addEventListener("DOMContentLoaded",()=>{
    const table= document.querySelector("table");
    const flights = localStorage.getItem("flights") || "";
    const flightsList = flights.split("\n");
    flightsList.forEach((flight)=>{
    const[flightNo,origin,destination,boardingDate,boardingTime,arrivalDate,arrivalTime,numberOfSeats]=flight.split(",");
    const row=table.insertRow(-1);
    row.innerHTML=`
    <td>${flightNo}</td> 
    <td>${origin}</td> 
    <td >${destination}</td> 
     <td >${boardingDate}</td>
      <td >${boardingTime}</td>
       <td >${arrivalDate}</td>
       <td >${arrivalTime}</td>
       <td >${numberOfSeats}</td>

     `
    })
    
})