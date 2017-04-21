$(document).ready(function(){
    $("#loginSubmit").click(function(){
	var user= $("#usernameInput").val();
	var password = $("#passwordInput").val();
	
	if(user =='' || password==''){
	    $('input[type="text"],input[type="password"]').css("border","2px solid red");
	    $('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
	    alert("Please fill all fields!");
	}else {
	    amivcore.login(user, password, function(loginReturn){
		if (loginReturn !== true){
		    alert("Wrong credentials!");
                } else {
                    console.log("Success! Loged in");
                    $("#LoginFormNavbar").attr("style","display:none;");
                    $("#LogoutFormNavbar").removeAttr("style");
                    //$("#LoginModal").modal('hide');
                }
	    })
	}
    });
    $("#LogoutButtonNavbar").click(function(){
        $("#LogoutFormNavbar").attr("style","display:none;");
        $("#LoginFormNavbar").removeAttr("style");
    });
        //$("#loginHeader").leanModal({
//	top: 100,
//	overlay: 0.6,
//	closeButton: ".modal_close"
  //  });
});
