$( document ).ready(function() {



	$.support.cors = true;



    $('#addBooking').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "PUT",
            url: "http://127.0.0.1:5000/booking",
            data: $(this).serializeArray(),

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



});