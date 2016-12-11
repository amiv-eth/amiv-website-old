translation = {
    'date': {'de': "<b>Datum</b>", 'en': "<b>date</b>"},
    'register_date': {'de': "<b>Anmeldedatum</b>", 'en': '<b>register date</b>'},
    'signup_count': {'de': '<b>Freie Plätze</b>', 'en': '<b>free spots</b>'},
    'signup': {'de': 'Anmelden', 'en': 'signup'}
};

$( document ).ready(function() {
    //append the divs to the content
    for (var i = 0; i < 10; i++) {
	var event_html = "<h3 id='title" + i + "'></h3>"
	    + "<div class='pure-g'>" + "<div class='pure-u-1-2'>"
	    + "<p id='descr" + i + "'></p>"
	    + "<p id='date" + i + "'></p>"
	    + "<p id='reg_date" + i + "'></p>"
	    + "<p id='signup_count" + i + "'></p>"
	    + "<button id='signup" + i + "' class='pure-button'>"
	    + translation['signup'][lang] + "</button></div>"
	    + "<div class='pure-u-1-2'>"
	    + "<img class='pure-img' id='poster" + i + "'>"
	    + "</div></div>";
	
	event_html = "<div id='event_div" + i + "'>" + event_html + "</div>";
	$(".post-content").append(event_html);
    }
    // get all events form the api
    // where show website = true and sorted by start_time
    $.get(api + '/events?where={"show_website": true}&sort=-time_start', function(data) {
	test = data;
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
		$("#signup" + i).attr("onclick", "signup_for_event(" + (i+start_idx) + ");");
		if(event_single['img_poster'] !== undefined ){
			$("#poster" + i).attr("src", api + event_single['img_poster']);
		}
	    }
	    else {
		$('#event_div' + i).hide();
	    }
	}
    }
    signup_for_event = function(index) {
	console.log("this would sign you up for event with id: " + events[index]['_id']);
    }
});
