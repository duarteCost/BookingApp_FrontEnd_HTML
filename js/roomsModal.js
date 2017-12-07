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


//get available rooms in one floor
function get_floor_available_rooms(floor, startTime, endTime ){
    return $.ajax({
        url: "http://127.0.0.1:5004/rooms/floor/"+floor,
        method: "GET",
        data: true,
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", getCookie("token"));
            xhr.setRequestHeader("startTime", startTime);
            xhr.setRequestHeader("endTime", endTime);
        }
    });
}

//list all available rooms in one floor
function list_room_per_floor(data) {

    $("#floorRooms").empty();
    var aux_position = 0;
    $.each(data, function( key, value ) {
        $("#floorRooms").append("<ul class= 'list-group'>");
        $("#floorRooms").append("<li class= 'list-group-item active'><label>"+value.description+"</li>");
        //$("#floorRooms").append("<li class= 'list-group-item'><label>Andar: </label><span>"+value.floor+"   "+"</span></li>");
        $("#floorRooms").append("<li class= 'list-group-item'><label>Numero:</label><span> </span><span>" +value.number+"</span></li>");
        $("#floorRooms").append("<button type='button'  class='btn btn-secondary btnConfirm' name='"+aux_position+"' data-dismiss='modal'>Escolher</button>");
        $("#floorRooms").append("</ul>");
        $("#floorRooms").append("<br>");
        aux_position = aux_position + 1;

    });

}

function modal_validation(startTime,endTime, descritption) {

    if(startTime=='' || endTime == ''){
        alert("O data e o tempo de inicio/fim de macarcação devem ser definidos!");
        location.reload();
    }
    else if (descritption == ''){
        alert("A descrição deve ser definida!");
        location.reload();
    }
}

$( document ).ready(function() {

    /*if(getCookie("token") === '')
    {
        alert("Para aceder a esta página é necessário realizar o Login");
        location.replace('login.html');
    }*/

    var data_rooms;
    //if user click "Escolher sala" in bookings form
    $("#chooseRoom").click(function () {

        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        var descritption = $("#description").val();
        modal_validation(startTime,endTime, descritption);
        $("#timeInterval").html("Salas disponíveis entre "+startTime+" e às "+endTime+".");
    });

    //inside of modal when user choose a pretended floor
    $(".floor").click(function () {
        var floor = $(this).prop('name');
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        get_floor_available_rooms(floor, startTime, endTime ).done(function(data) {
            data_rooms = data;
            list_room_per_floor(data);
        });

    });

    //when user confirm a pretended room

    $("#floorRooms").on('click', '.btnConfirm', function() {
        var position = $(this).prop('name');
        var room = data_rooms[position];
        console.log(data_rooms[position]);
        $("#showRoomResume").append("<ul class= 'list-group'>");
        $("#showRoomResume").append("<li class= 'list-group-item active'><label>"+room.description+"</li>");
        $("#showRoomResume").append("<li class= 'list-group-item'><label>Andar:</label><span> </span> <span>" +room.floor +"</span></li>");
        $("#showRoomResume").append("<li class= 'list-group-item'><label>Numero:</label><span> </span> <span>" +room.number +"</span></li>");
        $("#showRoomResume").append("</ul>");
        $("#showRoomResume").append("<br>");
        $("#chooseRoom").remove();
        $("#roomId").val(room._id.$oid);
        $("#showRoomResume").append("<input type='submit' class='btn btn-primary' value='Confirmar'>");
        $("#showRoomResume").append("<button style='margin-left: 1%' id = 'discard' type='button'  class='btn btn-primary' >Descartar</button>");


    });




});