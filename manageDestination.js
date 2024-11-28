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