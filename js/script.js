$(document).ready(function(){
    /*Initialise variables*/
    var topic, userUrl, $resultsListItems, title, snippet;

    /* Event handler when the search button is clicked*/
    $("#searchBar button").click(function(){
        getData();
    });

    /* Event handler for Enter key press - some browsers use 'keyCode', some use 'which' - 13 is keyCode for Enter */
    $("#topicInput").keydown(function(event){
        if ((event.keyCode || event.which)==13){
            getData();
        }
    });
    
    /*Functions declarations*/
    function getData(){
        topic = $('#topicInput').val();
        userUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+topic+"&srlimit=10&srprop=snippet&callback=?";
        $resultsListItems = $("#resultsList").find("li");
        console.log(userUrl);
        $.getJSON(userUrl, function(data) {
            $resultsListItems.each(function(index){
                title = data.query.search[index].title;
                $(this).find("a").attr("href","https://en.wikipedia.org/wiki/"+encodeURIComponent(title));
                $(this).find("h1").text(title);
                $(this).find("p").html(data.query.search[index].snippet);
            });

        });
    }
});