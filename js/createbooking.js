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

$( document ).ready(function() {

    if(getCookie("token") === '')
    {
        alert("Para aceder a esta página é necessário realizar o Login");
        location.replace('login.html');
    }
    $('#username').html(getCookie("stdentNumber"));
    $("#showRoomResume").on('click', '#discard', function() {
        location.reload();
    });

    $("#addBookingForm").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "PUT",
            url: "http://127.0.0.1:5011/booking_service/booking",
            data: $(this).serializeArray(),
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


});