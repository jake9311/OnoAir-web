let form=document.getElementById("addingFlightForm");


form.addEventListener("submit", (event)=>{
    let flightNo = document.getElementById('flightNo');
let boardingDate = document.getElementById('boardingDate');
let boardingTime = document.getElementById('boardingTime');
let arrivalDate = document.getElementById('Arrival Date');
let arrivalTime = document.getElementById('ArrivalTime');
let seats = document.getElementById('Seats');
let error=false;

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
}

});