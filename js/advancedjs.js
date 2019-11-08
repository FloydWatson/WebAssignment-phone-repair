// date picker function
$(function() {
    $("#datepicker").datepicker({});
});

// geo location function
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locationOutput").innerHTML = "GeoLocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("locationOutput").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

// drag and drop function
    function allowDrop(ev) {
        ev.preventDefault();
    }
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

// web storage function
function storeData() {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("name", document.getElementById('storageInput').value);
    }
    document.getElementById('storageInput').value = '';
}

function deleteData() {
    localStorage.removeItem("name");
}

function retrieveData() {
    if (localStorage.getItem("name") != null) {
        alert("Name in storage is: " + localStorage.getItem("name"));
    } else {
        alert("There is currently no name in local storage");
    }
}