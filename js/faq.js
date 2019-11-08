var myArr;
//Loads RSS document
function loadRSS() {
    //Use CORS API website as proxy to retrieve XML file
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var url = "https://api.myjson.com/bins/zvfdk";

    //Declare XMLHttpRequest Object
    var xmlhttp = new XMLHttpRequest();
    //Send a request from Client side to Server to retrieve the xml document
    xmlhttp.open("GET", proxy + url, true);
    xmlhttp.send();
    //Check if the entire xml document has been received? If so, process it.
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
            //Load XML document as XML format and process
            processJSON(myArr);
        }
    };
}

//Finds relevant data in document and displays it on the webpage
function processJSON(arr) {
    var output = "";
    for (var i = 0; i < arr.length; i++) {
        //Display extracted article into the divs
        output += '<div class="advjs"><h3>' + arr[i].question + '</h3><p>' + arr[i].answer + '</p></div>';
    }
    document.getElementById("faqDisplay").innerHTML = output;
}

// search for questions
function searchFunction() {
    var searchTerm = document.getElementById("searchInput").value;
    var results = myArr.filter(function (myArr) {
        return myArr.question.indexOf(searchTerm) > -1;
    });

    //Loop through all results
    var output = "";
    document.getElementById("faqDisplay").innerHTML = "";
    if (results.length == 0) {
        document.getElementById("faqDisplay").innerHTML = "Not found!";
    } else {
        for (var i = 0; i < results.length; i++) {
            //Display extracted article into the divs
            output += '<div class="advjs"><h3>' + results[i].question + '</h3><p>' + results[i].answer + '</p></div>';
        }
        document.getElementById("faqDisplay").innerHTML = output;
        
    }
}