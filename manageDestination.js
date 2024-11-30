document.addEventListener("DOMContentLoaded",()=>{
    const table= document.querySelector("table");
    const destinations = localStorage.getItem("destinations") || "";
    const destinationList = destinations.split("\n");
    destinationList.forEach((destination)=>{
    const[destinationCode,destinationName,airportName,airportUrl,imageUrl]=destination.split(",");
    const row=table.insertRow(-1);
    row.innerHTML=`
    <td>${destinationName}</td> 
    <td>${airportName}</td> 
    <td >${destinationCode}</td> 
    <td><a href="${airportUrl}" target="_blank" width=100 >${airportUrl}</a></td> 
    <td><img src="${imageUrl}" alt="${destinationName}"  style="width:100px;height:auto;"></td> 
     `
    })
    
})



import { destinations } from '../data/destinations.js';

function populateTable() {
    const tableBody = document.querySelector('#destinationsTable tbody'); 
    destinations.forEach(destination => {
        const row = document.createElement('tr');
        row.setAttribute('bgcolor', 'lightgray'); 

        const nameCell = document.createElement('td');
        nameCell.textContent = destination.name;

      
        const airportNameCell = document.createElement('td');
        airportNameCell.textContent = destination.airportName;

        const codeCell = document.createElement('td');
        codeCell.textContent = destination.destinationCode;


        const websiteCell = document.createElement('td');
        const websiteLink = document.createElement('a');
        websiteLink.href = destination.airportWebsite;
        websiteLink.textContent = destination.airportWebsite;
        websiteLink.target = '_blank'; 
        websiteCell.appendChild(websiteLink);

        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = destination.airportImg;
        image.alt = `${destination.name} Airport`;
        image.style.width = '100px';
        image.style.height = 'auto';
        imageCell.appendChild(image);


        row.appendChild(nameCell);
        row.appendChild(airportNameCell);
        row.appendChild(codeCell);
        row.appendChild(websiteCell);
        row.appendChild(imageCell);


        tableBody.appendChild(row);
    });
}


document.addEventListener('DOMContentLoaded', populateTable);
