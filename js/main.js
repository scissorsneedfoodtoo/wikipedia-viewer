$(document).ready(function() {

  var searchTerm = "";
  var url = "";

  $("form").on('submit', function(event) {

    searchTerm = $('#search-box').val(); // gets the value from search box

    url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";

    event.preventDefault(); // prevents the page from reloading when form is submitted

    if ( $('#inputs').hasClass('inputs') ) { // checks for inputs class with center-page styling
      $(".inputs").removeClass('inputs', 300, function() { // removes stylized class and runs jQueryUI animation and searchWiki function when finished
        searchWiki();
      });  
    } else {
      searchWiki(); // else just runs searchWiki function
    };
  });

  function searchWiki() {
    
    var outputHTML = "";

    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data) {

        for (var i = 0; i < data[1].length; i++) { // builds HTML to be displayed on the page
          outputHTML += "<a href=" + data[3][i] + ">";
          outputHTML += "<li><h4>" + data[1][i] + "</h4>";
          outputHTML += "<p>" + data[2][i] + "</p></li></a>";
        };
        // console.log(outputHTML);
        $('#output').hide().html(outputHTML).fadeIn(300); // content needs to first be hidden to then be displayed with the jQuery animation
      },
      error: function(errorMessage) {
        console.log("ERROR")
      }
    });
  }; // end wikiSearch

}); // end ready