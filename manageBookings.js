
import { myBookings } from "../data/bookings.js";
import { destinations } from "../data/destinations.js";


function findDestination(airportName) {
    return destinations.find((dest) => dest.airportName === airportName);
}


function createBookingCard(booking) {
    const destinationInfo = findDestination(booking.arrivalAirport);

    const bookingCard = document.createElement("div");
    bookingCard.classList.add("booking-card");

    const destinationImage = document.createElement("img");
    destinationImage.classList.add("destination-image");
    destinationImage.src = destinationInfo ? destinationInfo.airportImg : "https://via.placeholder.com/150";
    destinationImage.alt = destinationInfo ? destinationInfo.city : "Destination Image";

    const bookingDetails = document.createElement("div");
    bookingDetails.classList.add("booking-details");
    bookingDetails.innerHTML = `
        <p><strong>Origin:</strong> ${booking.boardingAirport} Boarding: ${booking.boardingDate} ${booking.boardingTime}</p>
        <p><strong>Destination:</strong> ${booking.arrivalAirport} Landing: ${booking.arrivalDate} ${booking.arrivalTime}</p>
        <p><strong>No. of passengers:</strong> ${booking.seatsBooked}</p>
    `;

    bookingCard.appendChild(destinationImage);
    bookingCard.appendChild(bookingDetails);

    return bookingCard;
}


function displayBookings() {
    const mainElement = document.getElementById("main");

    myBookings.forEach((booking) => {
        const bookingCard = createBookingCard(booking);
        mainElement.appendChild(bookingCard);
    });
}


function loadBookings() {
    const mainElement = document.getElementById("main");
    const bookings = localStorage.getItem("bookings") || "";
    const bookingRows = bookings.split("\n").filter(row => row.trim() !== "");

    bookingRows.forEach(bookingData => {
        const [boardingAirport, boardingDate, boardingTime, arrivalAirport, arrivalDate, arrivalTime, seatsBooked] = bookingData.split(",");
        
        const booking = {
            boardingAirport,
            boardingDate,
            boardingTime,
            arrivalAirport,
            arrivalDate,
            arrivalTime,
            seatsBooked,
        };

        const bookingCard = createBookingCard(booking);
        mainElement.appendChild(bookingCard);
    });
}

document.addEventListener("DOMContentLoaded", displayBookings);
document.addEventListener("DOMContentLoaded", loadBookings);
//localStorage.clear();
