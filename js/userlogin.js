function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function getStudenNumber(){
    var email = $("[name='email']").val();
    var arr = email.split('@');
    return arr[0];
}

$(document).ready(function(){
    $.support.cors = true;

    //Register Form Handler
    $('#login-form').submit(function signup(e){
        var studenNumber = getStudenNumber();
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:5011/user_service/user/login",
            data: $(this).serializeArray(),
            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
                setCookie("token", data.token, 0.5);
                setCookie("stdentNumber", studenNumber, 0.5);
                console.log(getCookie("token"));
                console.log(getCookie("stdentNumber"));
                location.replace('listbooking.html');
            },
            error: function (data) {
                $('#error-message').html('O email e/ou password introduzidos estão incorrectos.');
                console.log('An error occurred.');
                console.log(data);
            }
        })
    });
});