translation = {
    'date': {'de': "<b>Datum</b>", 'en': "<b>date</b>"},
    'register_date': {'de': "<b>Anmeldedatum</b>", 'en': '<b>register date</b>'},
    'signup_count': {'de': '<b>Freie Plätze</b>', 'en': '<b>free spots</b>'},
    'signup': {'de': 'Anmelden', 'en': 'signup'},
    'description': {'de': '<b>Beschreibung</b>', 'en': '<b>Description</b>'},
    'close': {'de': 'Schliessen', 'en': 'Close'}
};

$( document ).ready(function() {
    amivcore.on('ready', function() {
	//append the divs to the content
	for (var i = 0; i < 10; i++) {
	    var event_html = "<div class='col-md-6'>"
		+ "<h3 id='title" + i + "'></h3>"
		+ "<p id='descr" + i + "'></p>"
		+ "<p id='date" + i + "'></p>"
		+ "<p id='reg_date" + i + "'></p>"
		+ "<p id='signup_count" + i + "'></p>"
		+ "<button id='signup" + i + "' class='btn btn-default'>"
		+ translation['signup'][lang] + "</button></div>"
		+ "<div class='col-md-6'>"
		+ "<img class='img-responsive' id='poster" + i + "'>"
		+ "</div>";

	    event_html = "<div class='row' id='event_div" + i + "'>" + event_html + "</div>";
	    $(".post-content").append(event_html);
	}
	//append modal to content
	var modal_html  = '<div class="modal" tabindex="-1" role="dialog" id="modal_signup" data-backdrop="false">'
	    + '<div class="modal-dialog" role="document">'
	    + '<div class="modal-content">'
	    + '<div class="modal-header">'
	    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
	    + '<h4 class="modal-title">Modal title</h4></div>'
	    + '<div class="modal-body"></div>'
	    + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal">' + translation['close'][lang] + '</button>'
            + '<button type="button" class="btn btn-primary" id="modal_signup_button">' + translation['signup'][lang] + '</button>'
	    + '</div>'
	    + '</div><!-- /.modal-content -->'
	    + '</div><!-- /.modal-dialog -->'
	    + '</div><!-- /.modal -->';
	$(".post-content").append(modal_html);

	// get all events form the api
	// where show website = true and sorted by start_time
	// d.toISOString returns the miliseconds too. These are cut with slice(0, -5) and then the "Z" is readded at the end
	var d = new Date();
	request = api + '/events?where={"time_advertising_start": {"$lte": "' + d.toISOString().slice(0,-5)
	    + 'Z"}, "time_advertising_end": {"$gte": "' + d.toISOString().slice(0, -5)
	    + 'Z"}, "show_website":true}&sort=-priority,time_advertising_start';
	$.get(request, function(data) {
	    events = data["_items"];

	    printevents(0);

	    // add pagination buttons
	    var pagination_html = "";
	    for (var i = 0; i < Math.ceil(events.length/10); i++) {
		pagination_html += '<a href="#menu-button"><button class="pure-button" onclick="printevents(' + (i*10) + ')">' + (i+1) + '</button></a>';
	    }
	    pagination_html = '<div>' + pagination_html + '</div>';
	    $(".post-content").append(pagination_html);

	});

	//function to update the divs with the correct content
	printevents = function(start_idx) {
	    for (var i = 0; i < 10; i++) {
		if (i + start_idx < events.length){
		    var event_single = events[i + start_idx];
		    $('#event_div' + i).show();
		    $("#title" + i).html(event_single['title_' + lang]);
		    $("#descr" + i).html(event_single['description_' + lang]);
		    $("#date" + i).html(translation['date'][lang] + ": " + event_single['time_start']);
		    $("#req_date" + i).html(translation['register_date'][lang] + ": " + event_single['time_register_start']);
		    $("#signup_count" + i).html(translation['signup_count'][lang] + ": " + event_single['signup_count']);

		    //only show signup button when logged in
		    if(amivcore.authenticated())
			$('#signup' + i).show();
		    else
			$('#signup' + i).hide();
		    $("#signup" + i).attr("onclick", "signup_modal(" + (i+start_idx) + ");");
		    if(event_single['img_poster'] !== undefined )
			$("#poster" + i).attr("src", api + event_single['img_poster']['file']);
		    else if(event_single['img_infoscreen'] !== undefined )
			$("#poster" + i).attr("src", api + event_single['img_infoscreen']['file']);
		    else if(event_single['img_banner'] !== undefined )
			$("#poster" + i).attr("src", api + event_single['img_banner']['file']);
		}
		else {
		    $('#event_div' + i).hide();
		}
	    }
	}
	signup_modal = function(index) {
	    var event_single = events[index];
	    $('.modal-title').html(events[index]['title_' + lang]);
	    var event_text = translation['description'][lang] + ": " + events[index]['description_' + lang]
		+ "<br>" + translation['date'][lang] + ": " + event_single['time_start']
		+ "<br>" + translation['signup_count'][lang] + ": " + event_single['signup_count'];
	    $('.modal-body').html(event_text);
	    $('#modal_signup_button').attr("onclick", "signup_event('" + event_single['_id'] + "');");
	    $('#modal_signup').modal('show');
	}

	signup_event = function(_id) {
	    console.log("YOU WOULD BE SIGNED UP HERE IF LOGIN WORKS");
	    console.log("event: " + _id);
	}
    });
});
