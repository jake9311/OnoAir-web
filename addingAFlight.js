let form=document.getElementById("addingFlightForm");


form.addEventListener("submit", (event)=>{
let flightNo = document.getElementById('flightNo').value;
let origin= document.getElementById('origin').value;
let selsctedDestination= document.getElementById('selectDestination').value;
let boardingDate = document.getElementById('boardingDate').value;
let boardingTime = document.getElementById('boardingTime').value;
let arrivalDate = document.getElementById('Arrival Date').value;
let arrivalTime = document.getElementById('ArrivalTime').value;
let seats = document.getElementById('Seats').value;
let error=false;
event.preventDefault();
let boardingDateandTime= new Date(`${boardingDate.value}T${boardingTime.value}`);
let arrivalDateandTime= new Date(`${arrivalDate.value}T${arrivalTime.value}`);

if (boardingDateandTime>=arrivalDateandTime){
    event.preventDefault();
    alert("Arrival date and time must be after boarding date and time ");
    error=true;
}

if (seats.value<=0){
    event.preventDefault();
    alert("Number of seats must be a positive number");
    error=true;
}
if (!error){
alert("Deatails has received");
const flight= `${flightNo},${origin},${selsctedDestination}, ${boardingDate}, ${boardingTime}, ${arrivalDate},${arrivalTime},${seats}`;
console.log(flightNo);
let flights=localStorage.getItem("flights") ||"";
flights += `\n${flight}`;
localStorage.setItem("flights", flights);
  window.location.href= "manageFlights.html";
}

});

function bookFlight(flight) {

    const flightDetailsDiv = document.getElementById("flight_details");


    flightDetailsDiv.innerHTML = "";

  
    const flightDetailsHTML = `
        <p><strong>Flight No.:</strong> ${flight.flightNo}</p>
        <p><strong>Origin:</strong> ${flight.origin}</p>
        <p><strong>Destination:</strong> ${flight.destination}</p>
        <p><strong>Boarding Date:</strong> ${flight.boardingDate}</p>
        <p><strong>Boarding Time:</strong> ${flight.boardingTime}</p>
        <p><strong>Arrival Date:</strong> ${flight.arrivalDate}</p>
        <p><strong>Arrival Time:</strong> ${flight.arrivalTime}</p>
        <p><strong>Number of Seats Available:</strong> ${flight.numberOfSeats}</p>
    `;


    flightDetailsDiv.innerHTML = flightDetailsHTML;

    const newBooking = `${flight.flightNo},${flight.origin},${flight.destination},${flight.boardingDate},${flight.boardingTime},${flight.arrivalDate},${flight.arrivalTime},${flight.numberOfSeats}`;
    const existingBookings = localStorage.getItem("bookings") || "";
    const updatedBookings = existingBookings ? `${existingBookings}\n${newBooking}` : newBooking;

    localStorage.setItem("bookings", updatedBookings);


    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm Booking";
    confirmButton.addEventListener("click", () => {
        window.location.href = "flightBookings.html"; 
    });

    flightDetailsDiv.appendChild(confirmButton);
}
