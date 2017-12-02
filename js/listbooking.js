function get_all_user_booking(){
    return $.ajax({
        url: "http://127.0.0.1:5000/bookings/1 ",
        method: "GET",
        data: true
    });
}

function get_room_by_id(id) {
    return $.ajax({
        url: "http://127.0.0.1:5001/rooms/"+id,
        method: "GET",
        data: true
    });
}



function showUserBookings(data) {

    $.each( data, function( key, value ) {

        get_room_by_id(value.roomId).done(function (data) {
            console.log(data);
            $("#userBookings").append("<ul class= 'list-group'>");
            $("#userBookings").append("<li class= 'list-group-item active'>"+value.description);
            $("#userBookings").append("<li class= 'list-group-item'><label>Data de início: </label><span>"+value.startTime+"</span></li>");
            //$("#userBookings").append("<br>");
            $("#userBookings").append("<li class= 'list-group-item'><label>Data de fim: </label><span>"+value.endTime+"</span></li>");
            $("#userBookings").append("<li class= 'list-group-item'><label>Andar: </label><span>"+data.floor+"</span></li>");
            $("#userBookings").append("<li class= 'list-group-item'><label>Número: </label><span>"+data.number+"</span></li>");

            $("#userBookings").append("</ul>");
            $("#userBookings").append("<br>");
            $("#userBookings").append(" <div class='btn-group' role='group' aria-label='Basic example'><button id = "+value._id.$oid+" type='button' class='btn btn-secondary'>Eliminar</button></div>");
            $("#userBookings").append("<br>");
            $("#userBookings").append("<br>");
        });
    });
    //$("#userBookings").append("<ul>");
}

$( document ).ready(function() {

    $.support.cors = true;

    get_all_user_booking().done(function(data) {
        getUserBookings = data;
        showUserBookings(getUserBookings);
        console.log(data);
        $(".btn-group").click(function (event) {
            $.ajax({
                url: "http://127.0.0.1:5000/booking/"+event.target.id,
                method: "DELETE",
                data: true,
                success: function (data) {
                    console.log('Submission was successful.');
                    console.log(data);
                    alert(data.responseText);
                    location.reload();
                },
                error: function (data) {
                    console.log('An error occurred.');
                    console.log(data);
                    alert(data.responseText);
                    location.reload();
                }
            });
        });
        //location.reload();
    });



});