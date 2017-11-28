$(document).ready(function(){
    $.support.cors = true;

    //Register Form Handler
    $('#login-form').submit(function signup(e){
        e.preventDefault();
        $.ajax({
            method: "GET",
            url: "http://127.0.0.1:5000/user/login",
            data: $(this).serializeArray(),
            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
                location.replace('index.html')
            },
            error: function (data) {
                $('#error-message').html('O email e/ou password introduzidos estão incorrectos.');
                console.log('An error occurred.');
                console.log(data);
            }
        })
    });
});