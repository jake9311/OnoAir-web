
document.getElementById("Done").addEventListener('click', function(){
   
const passengersNum= document.getElementById("NoOfPassengers").value;
const passengersDetails= document.getElementById("passengersDetails");

passengersDetails.innerHTML='';
for (let i=1; i<=  passengersNum; i++){
    const passengerField=document.createElement('div');
    passengerField.className ='passenger'
    passengerField.innerHTML=`
    <h4>Passenger ${i} </h4>

    <lable for="Name${i}"> Name:</lable>  
    <input type="text" id="Name${i}" name="Name${i}" required>

    <label for="PassportID${i}">Passport ID:</label>
    <input type="text" id="PassportID${i}" name="PassportID${i}" required>
`;
passengersDetails.appendChild(passengerField);
}
});

let form= document.getElementById("passengerForm");

form.addEventListener("submit", (event)=>{
    const passengersNum= document.getElementById("NoOfPassengers").value;
    let error=false;
    const nameRegex = /^[A-Za-z\s]+$/;
    const passportRegex= /^[A-Za-z0-9]{6,9}$/;
    
    for (let i=1; i<=passengersNum;i++){
        const name=document.getElementById(`Name${i}`).value.trim();
        const passportID=document.getElementById(`PassportID${i}`).value.trim();

        if(!nameRegex.test(name)){
            event.preventDefault();
            alert(`Passenger ${i}: Name must contain only letters and spaces.`)
            error=true;
        }
        if(!passportRegex.test(passportID)){
            event.preventDefault();
            alert(`Passenger ${i}: Passport ID must be 6-9 alphanumeric characters.`)
            error=true;
        }
       
          }
          if (!error){
            event.preventDefault();
            alert(`Deatails has received `)
            const myFlight=getFlightDetails();
            localStorage.setItem("bookings", myFlight);
            window.location.href="manageBookings.html"
        }
})

function getFlightDetails() {
    const flightDetailsString = localStorage.getItem("selectedFlight");
    if (!flightDetailsString) {
        return null;
    }

    const [flightNo, origin, destination, boardingDate, boardingTime, arrivalDate, arrivalTime, numberOfSeats] =
        flightDetailsString.split(",");

    return {
        flightNo,
        origin,
        destination,
        boardingDate,
        boardingTime,
        arrivalDate,
        arrivalTime,
        numberOfSeats
    };
}

function displayFlightDetails() {
    const flightDetailsDiv = document.getElementById("flight_details");
    const flight = getFlightDetails();

    if (flight) {
        const flightDetailsHTML = `
            <p><strong>Origin:</strong> ${flight.origin} Boarding: ${flight.boardingDate} ${flight.boardingTime} </p>
            <p><strong>Destination:</strong> ${flight.destination} Landing: ${flight.arrivalDate} ${flight.arrivalTime} </p>
        `;
        flightDetailsDiv.innerHTML = flightDetailsHTML;
    } else {
        flightDetailsDiv.innerHTML = "<p>No flight details available.</p>";
    }
}




document.addEventListener("DOMContentLoaded", displayFlightDetails);
//localStorage.clear();
