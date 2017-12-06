function get_all_user_booking(){
    return $.ajax({
        url: "http://127.0.0.1:5003/bookings/currentUser",
        method: "GET",
        data: true,
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", getCookie("token"));
        }
    });
}

function get_room_by_id(id) {
    return $.ajax({
        url: "http://127.0.0.1:5004/rooms/"+id,
        method: "GET",
        data: true,
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", getCookie("token"));
        }
    });
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
            $("#userBookings").append(" <div class='btn-group deleteBooking' role='group' aria-label='Basic example'><button id = "+value._id.$oid+" type='button' class='btn btn-secondary'>Eliminar</button></div>");
            $("#userBookings").append("<br>");
            $("#userBookings").append("<br>");
        });
    });
    //$("#userBookings").append("<ul>");
}

$( document ).ready(function() {

    if(getCookie("token") === '')
    {
        alert("Para aceder a esta página é necessário realizar o Login");
        location.replace('login.html');
    }
    $.support.cors = true;
    console.log(getCookie("token"));
    get_all_user_booking().done(function(data) {
        showUserBookings(data);
        console.log(data);
        $("#userBookings").on('click', '.deleteBooking', function() {
            $.ajax({
                url: "http://127.0.0.1:5003/booking/"+event.target.id,
                method: "DELETE",
                data: true,
                beforeSend: function (xhr) {
                    /* Authorization header */
                    xhr.setRequestHeader("Authorization", getCookie("token"));
                },
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