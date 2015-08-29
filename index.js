$( document ).ready(function() {
  $('#searchButton').on('click', function(){
    var link = $('#inputField').val();
    $('#inputField').blur();
    //window.open('http://www.bing.com/search?q='+link,"_blank");
    $('#bingFrame').attr('src','http://www.bing.com/search?q='+link);
    $('#bingFrame').css('display','block');
    $('html,body').animate({
      scrollTop: $('#bingFrame').offset().top},
      'slow');
    });

    $('#inputField').keypress(function (e) {
      if (e.which == 13) {
        var link = $('#inputField').val();
        $('#inputField').blur();
        //window.open('http://www.bing.com/search?q='+link,"_blank");
        $('#bingFrame').attr('src','http://www.bing.com/search?q='+link);
        $('#bingFrame').css('display','block');
        $('html,body').animate({
          scrollTop: $('#bingFrame').offset().top},
          'slow');
          return false;
        }
      });

      $('#inputField').val("");
      setTimeout(function(){

      $('#textField').css('top', $('#wrapper').height() - $('#wrapper').height()/3);
      $('#textField').css('margin-left', $('#wrapper').width()/20);

      $('#inputField').css('top', $('#wrapper').height()/3);
      $('#inputField').css('margin-left', $('#wrapper').width()/2 - $('#wrapper').width()/7);
      $('#inputField').css('height', $('#wrapper').height()/10);
      $('#inputField').css('width', $('#wrapper').width()/6);

      $('#searchButton').css('top', $('#wrapper').height()/2);
      $('#searchButton').css('margin-left', $('#wrapper').width()/2 - $('#wrapper').width()/12);
      $('#searchButton').css('width', $('#wrapper').width()/15);
      $('#searchButton').css('height', $('#wrapper').height()/5.5);
      
      }, 100);

      window.onresize = function() {
            $('#textField').css('top', $('#wrapper').height() - $('#wrapper').height()/3);
            $('#textField').css('margin-left', $('#wrapper').width()/20);

            $('#inputField').css('top', $('#wrapper').height()/3);
            $('#inputField').css('margin-left', $('#wrapper').width()/2 - $('#wrapper').width()/7);
            $('#inputField').css('height', $('#wrapper').height()/10);
            $('#inputField').css('width', $('#wrapper').width()/6);

            $('#searchButton').css('top', $('#wrapper').height()/2);
            $('#searchButton').css('margin-left', $('#wrapper').width()/2 - $('#wrapper').width()/12);
            $('#searchButton').css('width', $('#wrapper').width()/15);
            $('#searchButton').css('height', $('#wrapper').height()/5.5);
      }

      window.dispatchEvent(new Event('resize'));



    });
