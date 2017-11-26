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
		  $("#dinamicContent").load("bookingForm.html"); //mudar este path no futuro
		  e.preventDefault();
	});

	/*get_all_booking().done(function(data){
		console.log(data);
	});*/

});