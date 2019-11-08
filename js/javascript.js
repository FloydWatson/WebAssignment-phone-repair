$(function() {
    $("#purchasedate").datepicker({});
});

$(function() {
    $("#repairdate").datepicker({});
});

$(document).ready(function() {

    $('form').submit(function(e) {

        e.preventDefault();

        var customerType = $('input[name="customertype"]:checked').val();
        var title = $('#title option:selected').text();
        var firstName = $('input#firstname').val();
        var lastName = $('input#lastname').val();
        var street = $('input#street').val();
        var city = $('input#city').val();
        var postCode = $('input#postcode').val();
        var phoneNumber = $('input#phonenumber').val();
        var email = $('input#email').val();
        var imeiNumber = $('input#imeinumber').val();
        var make = $('#make option:selected').text();
        var faultCategory = $('#faultcategory option:selected').text();
        var description = $('textarea#description').val();

        var d = $('input#purchasedate').val();
        var date = d.split("/");
        var purchaseDate = new Date(date[2], date[0] - 1, date[1]).toLocaleDateString('en');
        d = $('input#repairdate').val();
        date = d.split("/");
        var repairDate = new Date(date[2], date[0] - 1, date[1], 15, 23).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', hour12: true }).toLocaleLowerCase();


        // -------------------------------------------------------------
        // Input checks
        // -------------------------------------------------------------

        // Check customerType has been chosen
        if (customerType == undefined) {

            $('fieldset#customertype').after('<p class="error_message">Please enter a Customer Type</p>')
            return false
        }

        // Check title has been chosen
        if (title == "Select title") {
            $('select#title').after('<p class="error_message">Please enter your Title</p>')
            return false
        }

        // Check firstName is valid and not empty
        var patt = new RegExp(/^[a-zA-Z0-9- ]*$/)
        if (!(patt.test(firstName)) || firstName == "") {
            $('input#firstname').after('<p class="error_message">Please enter a valid first name</p>')
            return false
        }

        // Check lastName  is valid and not empty
        var patt = new RegExp(/^[a-zA-Z0-9- ]*$/)
        if (!(patt.test(lastName)) || lastName == "") {
            $('input#lastname').after('<p class="error_message">Please enter a valid last name</p>')
            return false
        }

        // Check street is not empty
        if (street == "") {
            $('input#street').after('<p class="error_message">Please enter your Street</p>')
            return false
        }

        // Check city is not empty
        if (city == "") {
            $('input#city').after('<p class="error_message">Please enter your City</p>')
            return false
        }

        // Check postCode is between length of 0 - 4
        if (!(postCode.length == 4 || postCode.length == 0)) {
            $('input#postcode').after('<p class="error_message">Please enter a valid postcode</p>')
            return false
        }

        // Check phoneNumber is numbers and not empty
        var patt = new RegExp(/^[0-9-()+ ]*$/)
        if (!(patt.test(phoneNumber)) || phoneNumber == "") {
            $('input#phonenumber').after('<p class="error_message">Please enter a valid Phone Number</p>')
            return false
        }

        // Check email Email address 
        if (email.indexOf("@") > email.indexOf(".") || email.length < 5) {
            //Invalid values
            //Display an error message
            $('input#email').after('<p class="error_message">Please enter a valid Email</p>')
            return false
        }

        // Check purchaseDate
        if (purchaseDate > Date.now() || purchaseDate == "Invalid Date") {
            $('input#purchasedate').after('<p class="error_message">Please enter a valid purchase date</p>')
            return false
        }

        // Check repairDate
        if (repairDate > Date.now() || repairDate < purchaseDate || repairDate == "Invalid Date") {
            $('input#repairdate').after('<p class="error_message">Please enter a valid repair date</p>')
            return false
        }

        // Check imeiNumber is a number and not longer than 15
        var patt = new RegExp(/^[0-9]*$/)
        if (imeiNumber.length != 15 || !(patt.test(imeiNumber))) {
            $('input#imeinumber').after('<p class="error_message">Please enter a valid IMEI number</p>')
            return false
        }

        // Check make chosen
        if (make == "Select make") {
            $('select#make').after('<p class="error_message">Please enter the make</p>')
            return false
        }

        // Check faultCategory chosen
        if (faultCategory == "Select category") {
            $('select#faultcategory').after('<p class="error_message">Please enter the fault category</p>')
            return false
        }

        // Check description not empty
        if (description == "") {
            $('textarea#description').after('<p class="error_message">Please enter a description</p>')
            return false
        }

        // Call to execute a function displayInvoice()
        displayInvoice((title + " " + firstName + " " + lastName), street, ($('input#suburb').val() + ", " + city + ", " + postCode), phoneNumber, email, purchaseDate, repairDate, $('#warranty').is(':checked'), imeiNumber, make, $('input#model').val(), faultCategory, description, $('#itemList').prop('outerHTML'), $('#bond').val(), $('#service').val(), $('#total').val(), $('#gst').val(), $('#grandtotal').val());
    });

    // When users enter data, make all error_messages disapear
    $('input').focus(function() {
        $('p.error_message').hide();
    });

    $('select').focus(function() {
        $('p.error_message').hide();
    });

    $('textarea').focus(function() {
        $('p.error_message').hide();
    });
});

// -------------------------------------------------------------
// Courtesy Phone table
// -------------------------------------------------------------

function addPhone() {
    var item = document.getElementById("itemType").value;
    var cost;
    if (item.includes("iPhone")) {
        cost = 275;
    } else if (item == "Select a phone") {
        return;
    } else {
        cost = 100;
    }
    $("#itemList tbody").append(
        "<tr id='phoneRow'>" +
        "<td id='courtesyPhone'>" + item + "</td>" +
        "<td class='cost'>" + cost + "</td>" +
        "</tr>"
    );

    $('#addPhoneBtn').hide();
    $('.phoneSelection').hide();
    $('#removePhoneBtn').show();
    updateForm();
}

function addCharger() {
    $("#itemList tbody").append(
        "<tr id='chargerRow'>" +
        "<td id='courtesyCXharger'>Charger</td>" +
        "<td class='cost'>30</td>" +
        "</tr>"
    );
    $('#addChargerBtn').hide();
    $('#removeChargerBtn').show();
    updateForm();
}

function removePhone() {
    $('#phoneRow').remove();
    $('#addPhoneBtn').show();
    $('.phoneSelection').show();
    $('#removePhoneBtn').hide();
    updateForm();
}

function removeCharger() {
    $('#chargerRow').remove();
    $('#addChargerBtn').show();
    $('#removeChargerBtn').hide();
    updateForm();
}

function updateForm() {
    // Warranty field
    var d = $('input#purchasedate').val();
    var date = d.split("/");
    var purchaseDate = new Date(date[2], date[0] - 1, date[1]);
    if (((Date.now() - purchaseDate) / 2.628e+9) > 24) {
        $('input#warranty').prop('checked', false);
    } else {
        $('input#warranty').prop('checked', true);
    }

    // Bond field
    var sum = 0;
    if (!document.getElementById('typebusiness').checked) {
        // Total the cost of items in the table
        $('.cost').each(function() {
            var value = $(this).text();
            sum += parseFloat(value);
        });
    }
    document.getElementById("bond").value = convertToMoney(sum);

    // Service Fee field
    if (!document.getElementById("warranty").checked) {
        service = 85;
    } else {
        service = 0;
    }
    document.getElementById("service").value = convertToMoney(service);

    // Total field
    total = sum + service;
    document.getElementById("total").value = convertToMoney(total);

    // GST field
    gst = total * 0.15;
    document.getElementById("gst").value = convertToMoney(gst);

    // Total(+GST) field
    grandTotal = total + gst;
    document.getElementById("grandtotal").value = convertToMoney(grandTotal);
}
// Adds Dollar notation and truncates to 2 decimal points
function convertToMoney(aPrice) {
    return "$" + aPrice.toFixed(2);
}

function openFAQ() {
    window.open("faq.html", "_blank")
}

function clearForm() {
    $("#itemList tbody tr").remove();
    $('p.error_message').hide();
}

// -------------------------------------------------------------------
function displayInvoice(custName, custAddress, custAddress2, custPhone, custEmail, purchaseDate, repairDate, warranty, imei, make, model, fault, description, table, bond, service, total, gst, grandTotal) {
    // Create a "blank page"
    let invoiceWindow = window.open('', '_blank');

    // Declare dates
    let dateNow = new Date();
    let dateFuture = new Date(dateNow);
    dateFuture.setDate(dateNow.getDate() + 5)
    const months = ["January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];

    // Add Head
    invoiceWindow.document.write(
        `
        <html>
        <head>
            <title>Repair Booking Sheet</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="css/invoice-style.css">   
        </head>                    
        `
    );

    // Add body to page
    invoiceWindow.document.write(
        `
        <body>
        <header>
            <h1 class="title-area">Repair Booking</h1>
            <div id="dueDetails">
                <h4>Amount Due</h4>
                <h3>${grandTotal}</h3>
            </div>
        </header>
    
        <main>
            <section id="invoiceInfo">
                <div id="customerInfo">
                    <h3>Customer</h3>
                    <br>
                    <p id="customerDetails">${custName}<br>${custAddress}<br>${custAddress2}<br>${custPhone}<br>${custEmail}</p>
                </div>
                <div id="jobInfo" class="container">
                    <h3>Repair Job</h3>
                    <div class="list">
                        <h4>Job Number:</h4>
                        <p>${Math.floor((Math.random() * 999) + 10000)}</p>
                        <h4>Invoice Date:</h4>
                        <p>${months[dateNow.getMonth()] + " " + dateNow.getDate() + ", " + dateNow.getFullYear() + " - " + dateNow.getHours() + ":" + dateNow.getMinutes()}</p>
                        <h4>Payment Date:</h4>
                        <p>${months[dateFuture.getMonth()] + " " + dateFuture.getDate() + ", " + dateFuture.getFullYear()}</p>    
                    </div>
                </div>
            </section>
            <hr>
            <section id="invoiceDetails">
            <div id="repairInfo" class="container">
                <h2>Repair Details</h2>
                    <div class="list">
                        <h4>Purchase Date:</h4>
                        <p>${purchaseDate}</p>
                        <h4>Repair Date/Time:</h4>
                        <p>${repairDate}</p>
                        <h4>Under Warranty:</h4>
        `
    );
    if (warranty) {
        invoiceWindow.document.write(
            `
            <p>Yes &#10004;</p>            
            `
        )
    } else {
        invoiceWindow.document.write(
            `
            <p>No &#10006;</p>            
            `
        )
    }
    invoiceWindow.document.write(
        `
                        <h4>IMEI Number:</h4>
                        <p>${imei}</p>
                        <h4>Device Make:</h4>
                        <p>${make}</p>
                        <h4>Model Number:</h4>
                        <p>${model}</p>
                        <h4>Fault Category:</h4>
                        <p>${fault}</p>
                        <h4>Description:</h4>
                        <p>${description}</p>
                    </div>
                </div>
        `
    );
    if ($('#itemList tr').length > 1) {
        invoiceWindow.document.write(
            `
                <div id="loanInfo" class="container">
                    <h2>Courtesy Loan Device Details</h2>
                    <div class="list">
                        ${table}
                    </div>
                </div>
        `);
    }
    invoiceWindow.document.write(
        `
                <div id="costInfo" class="container">
                    <h2>Totals</h2>
                    <div class="list">
                        <h4>Bond:</h4>
                        <p>${bond}</p>
                        <h4>Service Fee:</h4>
                        <p>${service}</p>
                        <h4>Total:</h4>
                        <p>${total}</p>
                        <h4>GST:</h4>
                        <p>${gst}</p>
                        <h4>Total(+GST):</h4>
                        <p>${grandTotal}</p>
                    </div>
                </div>
            </section>
        </main>
    
        <!--Footer Section-->
        <footer>
            <div id="companyInfo" class="container">
                <h3>Phone Fix Services</h3>
                <p>123 Fake st<br>
                Faketon<br>
                New Zealand<br>
                4342</p>
            </div>
            <div id="contactInfo" class="container">
                <h3>Contact Us</h3>
                <p><span style="font-weight: bold">Phone: </span>068760248<br>
                <span style="font-weight: bold">Email: </span>fixyaphone@gmail.com</p>
    
            </div>
        </footer>
        </body>
        </html>
        `
    );
}


