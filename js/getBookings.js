function get_all_booking(){
    return $.ajax({
        url: "http:/127.0.0.1:5000/bookings ",
        method: "GET",
        data: true
    });
}

$( document ).ready(function() {

    get_all_booking().done(function(data){
        console.log(data);
        console.log("jjjjjs");

    });
    $.support.cors = true;
    //console.log("hey there");

    $("#all").val("hello");

});