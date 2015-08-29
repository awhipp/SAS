function resizeFunc() {
  $('#inputField').css('top', $('#wrapper').height()/2 -  $('#wrapper').height()/7);
  $('#inputField').css('margin-left', $('#wrapper').width()/2 - $('#wrapper').width()/12);
  $('#inputField').css('height', $('#wrapper').height()/9);
  $('#inputField').css('width', $('#wrapper').width()/6);

  $('#searchButton').css('top', $('#wrapper').height()/2 + $('#wrapper').height()/12);
  $('#searchButton').css('margin-left', $('#wrapper').width()/2 - $('#wrapper').width()/40);
  $('#searchButton').css('width', $('#wrapper').width()/15);
  $('#searchButton').css('height', $('#wrapper').height()/5.5);
}

$( document ).ready(function() {
  $('#searchButton').on('click', function(){
    var link = $('#inputField').val();
    $('#inputField').blur();
    $('#bingFrame').attr('src','http://www.bing.com/search?q='+link);
    $('#bingFrame').css('display','block');
    $('body').css('overflow-y', 'scroll');
    $('html,body').animate({
      scrollTop: $('#bingFrame').offset().top},
      'slow');
    });

    $('#inputField').keypress(function (e) {
      if (e.which == 13) {
        var link = $('#inputField').val();
        $('#inputField').blur();
        $('#bingFrame').attr('src','http://www.bing.com/search?q='+link);
        $('#bingFrame').css('display','block');
        $('body').css('overflow-y', 'scroll');
        $('html,body').animate({
          scrollTop: $('#bingFrame').offset().top},
          'slow');
          return false;
        }
      });

      $('#inputField').val("");
      setTimeout(function(){
        $(this).scrollTop(0);
        resizeFunc();
      }, 100);

      window.onresize = function() {
          resizeFunc();
      }

      var myurl = "http://bingpowered.com/";
      if(myurl != this.referrer){
        window.location = "http://bingpowered.com/";
      }
});
