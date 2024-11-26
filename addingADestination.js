
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
        alert("Destination Code must be exactly 3 letters.");
        error = true;
    }

    if (!nameRegex.test(destinationName) || !nameRegex.test(airportName)) {
        alert("Destination Name and Airport Name must contain only letters.");
        error = true;
    }

    if (!urlRegex.test(airportUrl) || !urlRegex.test(imageUrl)) {
        alert("Airport URL and Image URL must be valid URLs.");
        error = true;
    }

    if (!error) {
        alert("Details have been received!");
    }
});


