translation = {
    'date': {'de': "Datum", 'en': "date"},
    'register_date': {'de': "Anmeldedatum", 'en': 'register date'},
    'signup_count': {'de': 'Freie Plätze', 'en': 'free spots'}
};

$( document ).ready(function() {
    // get all events form the api
    // where show website = true and sorted by start_time
    $.get(api + '/events?where={"show_website": true}&sort=-time_start', function(data) {
	test = data;
	events = data["_items"];
	
	for (var event of events) {
	    var event_html = "<h3>" + event['title_'+ lang] + "</h3>"
		+ "</div class='pure-g'>" + "<div class='pure-u-1-2'>"
		+ event['description_' + lang] + "<br><b>"
		+ translation['date'][lang] + ":</b> "
		+ event['time_start'] + "<br><b>"
		+ translation['register_date'][lang] + ":</b> "
		+ event['time_register_start'] + "<br><b>"
		+ translation['signup_count'][lang] + ": </b>"
		+ event['signup_count'] + "</div>";
	    event_html += "<div class='pure-u-1-2'>"
		+ "<img src='" + event['img_poster'] + "'>"
		+ "</div></div>";
	    
	    event_html = "<div>" + event_html + "</div>";
	    $(".content").append(event_html);
	}
    });
});
