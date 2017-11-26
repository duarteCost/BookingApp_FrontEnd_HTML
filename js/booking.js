function get_all_booking(){
	return $.ajax({
	    url: "http:/127.0.0.1:5000/bookings ",
	    method: "GET",
	    data: true    
	});

}



$( document ).ready(function() {

	$.support.cors = true;

	$( "#bookingCreate" ).click(function(e)
	{
	  $("#dinamicContent").load("bookingForm.html");
	  e.preventDefault();
	});


    $( "#showBookings" ).click(function(e)
    {
        $("#dinamicContent").load("showBookings.html");
        e.preventDefault();

        //$("#all").val("hello");
    });

    $('#addBooking').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "PUT",
            url: "http://127.0.0.1:5000/booking",
            data: $(this).serializeArray(),

            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            }
        });
    });



});