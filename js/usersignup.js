function validateEmail(){
    var email = $("[name='email']").val();
    var filter = /^([a-zA-Z0-9])+@(student|staff).uma.pt$/;

    if(!filter.test(email))
    {
        $("[name='email']").addClass( "invalid-field" );
        return false;
    }
    else{
        $("[name='email']").removeClass( "invalid-field" );
        return true;
    }
}


function validatePassword(){
    var password = $("[name='password']").val();
    var confirm = $("[name='confirm-password']").val();

    if(confirm != password){
        $("[name='confirm-password']").addClass( "invalid-field" );
        return false;
    }
    else{
        $("[name='confirm-password']").removeClass( "invalid-field" );
        return true;
    }
}

$(document).ready(function(){
    $.support.cors = true;

    //Register Form Handler
    $('#register-form').submit(function signup(e){
        e.preventDefault();
        if(!validateEmail() || !validatePassword()){
            return;
        }
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:5011/user_service/user/register",
            data: $(this).serializeArray(),
            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
                location.replace('login.html')
            },
            error: function (data) {
                $('#error-message').html('O utilizador já existe.');
                console.log('An error occurred.');
                console.log(data);
            }
        })
    });
});

