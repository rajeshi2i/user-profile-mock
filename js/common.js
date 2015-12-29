$("#main-side-nav").sideNav();
$('.search-icon').click(function() {
  $('.sub-nav').toggleClass('active');
});

$('.user-profile').click(function() {
  window.location.href = "/profile.html";
});

jQuery(function() {
  $(document).ready(function() {
    for (var i = 0; i <= 100; i++) {
      var random = Math.floor((Math.random() * 7) + 0);
      var string = "<div class='col s12 m3 l2 user-profile'><div class='card'><div class='card-image'><img src='images/" + random + ".jpg'></div><div class='card-action'><div class='head'>Card Title</div><div class='sub-head'>This is a link</div></div></div></div>";
      $('#user-profile').append(string);
      if (i === 100) {
        $('.user-profile').click(function() {
          window.location.href = "/profile.html";
        });
      }
    }
  });
});
