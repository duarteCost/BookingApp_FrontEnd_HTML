function validateEmail(){
    var email = $("[name='email']").val();
    if(!(/^([a-zA-Z0-9])+@student.uma.pt$/).test(email) || !(/^([a-zA-Z0-9])+@staff.uma.pt$/).test(email))
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
    console.log(password + " " + confirm)
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
    //Register Form Handler
    $('#register-form').submit(function signup(e){
        e.preventDefault();
        if(!validateEmail() || !validatePassword()){
            history.back();
            return;
        }
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:5000/user/register",
            data: $(this).serializeArray(),

            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            }
        })
    });
});

