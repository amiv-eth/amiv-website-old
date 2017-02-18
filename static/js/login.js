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
		if (loginReturn !== true)
		    alert("Wrong credentials!")
	    })
	}
    });
    //$("#LoginModal").modal('toggle');
    //$("#loginHeader").leanModal({
//	top: 100,
//	overlay: 0.6,
//	closeButton: ".modal_close"
  //  });
});
