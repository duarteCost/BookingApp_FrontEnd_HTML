
//receive start and end time
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//sen data to parent(createbooking.js)
function sendRooms (arrayRoomID) {
    window.opener.getRooms(arrayRoomID);
}


$(document).ready(function () {
    $.support.cors = true;

    var startTime = getParameterByName('startTime');
    var endTime = getParameterByName('endTime');
    var description = getParameterByName('description');
    $("#startTime").html(startTime);
    $("#endTime").html(endTime);


    var arrayRoomID = '[{"roomId":"3", "roomFloor":"0", "roomNumber":"10", "startTime":"'+startTime+'", "endTime":"'+endTime+'", "description":"'+description+'"},{"roomId":"4", "roomFloor":"0", "roomNumber":"11", "startTime":"'+startTime+'", "endTime":"'+endTime+'", "description":"'+description+'"}]';

    //if user click on  button send data is send to parent
    $('#sendRoom').click(function (e) {
        e.preventDefault();
        sendRooms(arrayRoomID);
        window.close();
    });

});
