// JOBOFFERS.JS
// Script to fetch joboffer entries in the API
// To publish on the Joboffers page on the website

// Wait for Page to be fully loaded
$( document ).ready(function() { 
    // Wait for AMIVCORE Library to be initialized
    amivcore.on('ready', function() {
        // Send request to fetch only joboffers entries in the API approved for publishing
        amivcore.joboffers.GET({
            data: {
                'max_results': '50',
                'where': {'show_website':true} 
                //page: joboffers.page.cur(),
                //sort: joboffers.sort.cur(),
                //where: joboffers.search.cur()
            }
        }, function(returnJoboffers){
            console.log(returnJoboffers);
            // Break if no job offers are found
            if (returnJoboffers === undefined || returnJoboffers['_items'].length == 0) { 
                console.log('No Data');                        
                return;                                           
            }
            console.log("Got data! Proceeding");
            var meta = returnJoboffers['_meta'];
            //var max = Math.ceil(joboffers.meta.total / joboffers.meta.max_results);
            var counter = 0;
            console.log(returnJoboffers['_items']);
            // Iterate through all fetched joboffer entries
            for(var counter = 0; counter<=meta['total']; counter++) {
                var element = returnJoboffers['_items'][counter];
                console.log(element);
                // Check if they are activated for publishing on website
                if (element['show_website']) {
                    console.log('Published Joboffer');
                    var jobofferTitle= { 'de': element['title_de'], 'en': element['title_en']};
                    var jobofferDescription= {'de': element['description_de'], 'en': element['description_en']};
                    var joboffer_id = element['id'];
                    var jobofferLogoName = element['logo']['name'];
                    var jobofferLogoLink = api_url_config + element['logo']['file'];
                    var jobofferPDFName = element['pdf']['name'];
                    var jobofferPDFLink = api_url_config + element['pdf']['file'];
                    var jobofferCompany = element['company'];
                    var jobofferComplete = "<div class='row'>"
                        + "<div class='col-sm-2 logoJobofferDiv'>"
                        + "<img class='logoJobofferImg' id='logoJobofferImg' src='"+jobofferLogoLink+"'></img>"
                        + "</div>"
                        + "<div class='col-sm-8 glimpseJobofferDiv'>"
                        + "<div class='row'>"
                        + "<div class='col-sm-6 titleJobofferDiv'>"
                        + "<h2 class='titleJobofferH2'>"+jobofferTitle[lang]+"</h2>"
                        + "</div>"
                        + "<div class'col-sm-6 companyJobofferDiv'>"
                        + "<h4 class='companyJobofferH4'>"+jobofferCompany+"</h4>"
                        + "</div>"
                        + "</div>"
                        + "<div class='row'>"
                        + "<p>"+jobofferDescription[lang].substring(0,100)+"...</p>"
                        + "</div>"
                        + "</div>"
                        + "<div class='col-sm-2 expandJobofferDiv'>"
                        + "<button class'btn btn-primary' type='button' data-toggle='collapse' data-target='#joboffer"+counter+"'><i class='fa fa-chevron-circle-down fa-2x'></i></button>"
                        + "</div>"
                        + "</div>"
                        + "<div class='collapse' id='joboffer"+counter+"'>"
                        + "<div class='card card-block'>"
                        + "<p> "+ jobofferDescription[lang] + "</p>"
                        + "<a href='"+jobofferPDFLink+"'><i class='fa fa-file-pdf-o fa-2x'></i> " + jobofferPDFName+"</a>"
                        + "</div>";
                    // Add compiled entry to website content
                    console.log('Compiled! Here it is: '+jobofferComplete);
                    $('.content').append(jobofferComplete);
                }
                
            }
        });
    });
});
