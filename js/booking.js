function get_all_booking(){
	return $.ajax({
	    url: "http://127.0.0.1:5000/bookings/2 ",
	    method: "GET",
	    data: true    
	});

}

function showUserBookings(data) {
    $.each( data, function( key, value ) {
        $("#userBookings").append("<label>Descrição: </label><label>'+value+'</label>");
    });
}

var getUserBookings;


$( document ).ready(function() {



	$.support.cors = true;

	/*$( "#bookingCreate" ).click(function(e)
	{

          e.preventDefault();
          $("#dinamicContent").load("bookingForm.html", function() {
          });


	});


    $( "#showBookings" ).click(function(e)
    {
        e.preventDefault();
        $.when($("#dinamicContent").load("showBookings.html")).then(function() {
            $.when(get_all_booking()).then(function(data) {
                getUserBookings = data;
                $("#all").html(getUserBookings);
                showUserBookings(getUserBookings);
                console.log(data);
                //location.reload();
            });
        });

    });*/









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