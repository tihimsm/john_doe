$(function(){
  var windowSt = $(window);
  var number = ['first', 'second', 'third'];
  var elements = [];
  var animateFlag = true;
  var save  = 0; // タイムスタンプ保存用
  var clock = 0; // タイムスタンプ比較用

  $('.animsition').animsition({
    inClass: 'fade-in-right-sm',
    outClass: 'fade-out-right-sm',
    inDuration: 1000,
    outDuration: 300,
    linkElement: '.animsition-link',
    loading: false,
    loadingParentElement: 'body',
    loadingClass: 'animsition-loading',
    loadingInner: '',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });

  for (var i = 0; i < number.length; i++) {
    elements[i] = $('#' +number[i]+ '_content');
  }

  $('#about').click(function() {
    scrollContent(0);
  });

  $('#works').click(function() {
    scrollContent(1);
  });

  $('#contact').click(function() {
    scrollContent(2);
  });

  $('body').on('mousewheel', function(e) {
    if (windowSt.scrollTop() == elements[0].offset().top) {
      if (e.deltaY < 0) {
        i = 1;
      } else {
        i = 0;
      }
    } else if (windowSt.scrollTop() == elements[1].offset().top) {
      if (e.deltaY < 0) {
        i = 2;
      } else {
        i = 0;
      }
    } else if (windowSt.scrollTop() == elements[2].offset().top) {
      if (e.deltaY < 0) {
        i = 2;
      } else {
        i = 1;
      }
    }

    clock = e.timeStamp - save;
    save  = e.timeStamp;
    if(clock < 40) return false; // 比較結果が50msより少ない場合はキャンセル

    scrollContent(i);
  });

  function scrollContent(i) {
    if(!animateFlag) return false;
    animateFlag = false;
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = elements[i].offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing", function (){
      animateFlag = true;
    });
    return false;
  }

});