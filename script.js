var categories = ['Bernie', 'Donald Trump', 'Barack Obama', 'John Stewart', 'Stephen Colbert'];

function displayInfo(searchTerm, limit, offset, rating) {
  $('#display').empty();

  var params = {
    'q': searchTerm,
    'limit' : limit,
    'offset' : offset,
    'rating' : rating,
  };

  var str = jQuery.param(params);

  var queryURL =  'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&' + str;

  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {

    var data = response.data;

    for (var i = 0; i < data.length; i++) {
      var p = $('<p>');
      p.text(data[i].rating);
      $('#display').append(p);

      var img = $('<img>');
      img.attr('src', data[i].images.fixed_height.url);

      var a = $('<a target="_blank">');
      a.attr('href', data[i].url);
      a.html(img);
      $('#display').append(a);
    }


    // <a href="http://LandingPageURL.com" target="_blank"><img src="http://FileURL" /></a>

  });
};

function renderButtons() {
  $('#categories-view').empty();

  for (var i = 0; i < categories.length; i++) {
    var btn = $('<button>');
    btn.addClass('category btn btn-primary');
    btn.attr('data-name', categories[i]);
    btn.text(categories[i]);
    $('#categories-view').append(btn);
  }
};

$('#add-category').click(function() {
  event.preventDefault();

  var input = $('#search-term').val().trim();
  categories.push(input);
  renderButtons();
});


$(document).on('click', '.category', function() {
  q = $(this).attr('data-name');
  l = $('#limit').val().trim();
  o = $('#offset').val().trim();
  r = $('#rating').val().trim();
  displayInfo(q, l, o, r);
})

renderButtons();
