

$( document ).ready(function() {



    $("#showRoomResume").on('click', '#discard', function() {
        location.reload();
    });

    $("#addBookingForm").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "PUT",
            url: "http://127.0.0.1:5000/booking",
            data: $(this).serializeArray(),

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