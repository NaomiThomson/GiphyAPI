var oldURL;
var splitStillURL;
var splitGifURL;
var newURL;
var searchTerm;
var limit;
var offset;
var rating;

var topics = ['Bernie', 'Donald Trump', 'Barack Obama', 'John Stewart', 'Stephen Colbert'];

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

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {

    var data = response.data;

    for (var i = 0; i < data.length; i++) {

      var img = $('<img>');
      img.attr('src', data[i].images.fixed_height_still.url);
      $('#display').append(img);
    }

  });
};

function renderButtons() {
  $('#topics-view').empty();

  for (var i = 0; i < topics.length; i++) {
    var btn = $('<button>');
    btn.addClass('category btn btn-primary');
    btn.attr('data-name', topics[i]);
    btn.text(topics[i]);
    $('#topics-view').append(btn);
  }
};

$('#add-category').click(function() {
  event.preventDefault();

  var input = $('#search-term').val().trim();
  topics.push(input);
  renderButtons();
});


$(document).on('click', '.category', function() {
  searchTerm = $(this).attr('data-name');
  limit = $('#limit').val().trim();
  offset = 0;
  rating = $('#rating').val().trim();
  displayInfo(searchTerm, limit, offset, rating);
});

$(document).on('click', 'img', function() {
  oldURL = $(this).attr('src');
  splitStillURL = oldURL.split('_');

  if (splitStillURL.length > 1) {
    newURL = splitStillURL[0] + '.gif';
  } else {
    splitGifURL = splitStillURL[0].split('.gif');

    newURL = splitGifURL[0] + '_s.gif';
  };
  $(this).attr('src', newURL);
});

renderButtons();
