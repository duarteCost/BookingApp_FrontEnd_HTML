function popupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//this method is called for popup
function getRooms(arrayRoomsID) {
    setCookie("array_RoomsID", arrayRoomsID, 0.01);
    location.reload();
}

//add rooms in createbooking.html
function bookingResume(data) {

    var dataJSON = JSON.parse(data);

    $.each( dataJSON, function( key, value ) {

        $("#bookingConfirmation").append("<ul class= 'list-group'>");
        $("#bookingConfirmation").append("<li class= 'list-group-item active'><label>"+value.description+"</li>");
        $("#bookingConfirmation").append("<li class= 'list-group-item'><label>Andar: </label><span>"+value.roomFloor+"   "+"</span></li>");
        $("#bookingConfirmation").append("<li class= 'list-group-item'><label> Sala: </label><span>"+value.roomNumber+"</span></li>");
        $("#bookingConfirmation").append("<li class= 'list-group-item'><label>Data de Início: </label><span>"+value.startTime+"</span></li>");
        $("#bookingConfirmation").append("<li class= 'list-group-item'><label>Data de fim: </label><span>"+value.endTime+"</span></li>");
        $("#bookingConfirmation").append("</ul>");
        $("#bookingConfirmation").append("<br>");
    });
    $("#bookingConfirmation").append("<br>");
    $("#bookingConfirmation").append("<button id = 'confirmBooking' type='button' class='btn btn-secondary'>Confirmar</button></div>");
    $("#bookingConfirmation").append("<button style='margin-left:2%' id = 'discardBooking' type='button' class='btn btn-secondary'>Descartar</button></div>");
}

function insertBookingDB(data) {
    var dataJSON = JSON.parse(data);
    $.each( dataJSON, function( key, value ) {
        var dataSerialized = {"userId": "2", "roomId": value.roomId, 'startTime':value.startTime, 'endTime':value.endTime, 'description':value.description};

        $.ajax({

            method: "PUT",
            url: "http://127.0.0.1:5000/booking",
            data:dataSerialized,

            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
                alert(data.responseText);
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
                alert(data.responseText);
            }
        });

    });
    cleanBookingResume();

}

//clear screen off bookings after choose rooms
function cleanBookingResume() {
    setCookie(setCookie("array_RoomsID",'', 0.01));
    location.reload();
}

$( document ).ready(function() {

    //if user not choose rooms yet
    if(getCookie("array_RoomsID") != ''){
        $('#addBookingForm').css({"display": "none"});
        $('#chooseRoom').css({"display": "none"});
        bookingResume(getCookie("array_RoomsID"));
    }


	$.support.cors = true;

	//open popup to choose rooms
    $('#addBookingForm').submit(function (e) {
        e.preventDefault();
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        var description = $('#description').val();
        popupCenter("../pages/roomspopup.html?startTime="+startTime+"&endTime="+endTime+"&description="+description,"Room","900","500");
    });

    //confirm and insert in DB
    $('#confirmBooking').click(function (e) {
        e.preventDefault();
        insertBookingDB(getCookie("array_RoomsID"));
    });

    //clear screen off bookings after choose rooms
    $('#discardBooking').click(function (e) {
        e.preventDefault();
        cleanBookingResume();
    });

});