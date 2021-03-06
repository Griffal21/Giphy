// Event listener for all button elements
$(document).on("click", "button", function () {
  // In this case, the "this" keyword refers to the button that was clicked
  var person = $(this).attr("data-person");

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        var gifImg = $("<img>");

        gifImg.attr({
          src: results[i].images.fixed_width_still.url,
          "data-still": results[i].images.fixed_width_still.url,
          "data-animate": results[i].images.fixed_width.url,
          "data-state": "still",
          "class": "gif"
        });

        $("#gifs-appear-here").prepend(gifImg);

      }
    });
});



//this is for the search bar

var input = document.getElementById("search");
var searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var searchTerm = input.value;

  // create button here

  getGifs(searchTerm);
  makeButton();



  function makeButton() {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(searchTerm);
    btn.appendChild(t);
    var att = document.createAttribute("data-person");
    console.log(att);
    att.value = searchTerm;
    btn.setAttributeNode(att);
    document.body.appendChild(btn);
    $("#buttons").append(btn)
  }

  
  
})


function getGifs(searchTerm) {
  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        var gifImg = $("<img>");

        gifImg.attr({
          src: results[i].images.fixed_width_still.url,
          "data-still": results[i].images.fixed_width_still.url,
          "data-animate": results[i].images.fixed_width.url,
          "data-state": "still",
          "class": "gif"
        });

        $("#gifs-appear-here").prepend(gifImg);

      }
    });
}


// this is for having the gifs paused when they appear
$(document).on("click", ".gif", function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  console.log(state);
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    console.log("a");
  } else if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    console.log("s");
  }

})