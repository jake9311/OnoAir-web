
let form = document.getElementById("addingDestinationForm");

form.addEventListener("submit", (event) => {
event.preventDefault();
    let destinationCode = document.getElementById("DestinationCode").value.trim();
    let destinationName = document.getElementById("DestinationName").value.trim();
    let airportName = document.getElementById("AirportName").value.trim();
    let airportUrl = document.getElementById("AirportUrl").value.trim();
    let imageUrl = document.getElementById("ImageUrl").value.trim();

    let error = false;

    const codeRegex = /^[A-Za-z]{3}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;

    if (!codeRegex.test(destinationCode)  ) {
        event.preventDefault();
        alert("Destination Code must be exactly 3 letters.");
        error = true;
    }

    if (!nameRegex.test(destinationName) || !nameRegex.test(airportName)) {
        event.preventDefault();
        alert("Destination Name and Airport Name must contain only letters.");
        error = true;
    }

    if (!urlRegex.test(airportUrl) || !urlRegex.test(imageUrl)) {
        event.preventDefault();
        alert("Airport URL and Image URL must be valid URLs.");
        error = true;
    }
    console.log(localStorage.getItem("destinations"));
    if (!error) {
        alert("Details has received!");
        const destination= `${destinationCode}, ${destinationName}, ${airportName}, ${airportUrl},${imageUrl}`;
        console.log(destination);
        let destinations=localStorage.getItem("destinations") ||"";
        destinations += `\n${destination}`;
        localStorage.setItem("destinations", destinations);
       //  localStorage.removeItem("destinations");
          window.location.href= "manageDestination.html";
    }
   
    

});


