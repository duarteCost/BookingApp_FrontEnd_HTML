//get available rooms in one floor
function get_floor_available_rooms(floor){
    return $.ajax({
        url: "http://127.0.0.1:5001/rooms/floor/"+floor,
        method: "GET",
        data: true
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

$( document ).ready(function() {

    var data_rooms;
    //if user click "Escolher sala" in bookings form
    $("#chooseRoom").click(function () {
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        var descritption = $("#description").val();
        $("#timeInterval").html("Salas disponíveis entre "+startTime+" e às "+endTime+".");
        $("#bookingDescription").html(descritption);
    });

    //inside of modal when user choose a pretended floor
    $(".floor").click(function () {
        var floor = $(this).prop('name');

        get_floor_available_rooms(floor).done(function(data) {
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
        $("#showRoomResume").append("<input type='submit' class='btn btn-primary' value='Comfirmar'>");
        $("#showRoomResume").append("<button style='margin-left: 1%' id = 'discard' type='button'  class='btn btn-primary' >Descartar</button>");


    });




});