$(window).load(function(){
  $('body').transition({opacity: 1}, 1000, 'in-out');

  var articles = {};

  $.ajax({
    url: "json/article.json",
    dataType: "json",
    async: false,
    success: function(json) {
      articles = json;
    }
  });

  var id = 0;
  for (var article of articles) {
    id++;
    $('#leftContent').append('<section class="works"><h1 class="title"><span id="'+ id +'">'+ article["work_title"] +'</span></h1><p>0'+ id +'</p></section>');
  }

  var stickyFlag = false;
  $(window).scroll(function(){
    if($(this).scrollTop() > 50){
      if(!stickyFlag){
        $('#message').transition({
          opacity: 0
        },200);
        stickyFlag = true;
      }
    } else {
      if(stickyFlag){
        $('#message').transition({
          opacity: 1
        },200);
        stickyFlag = false;
      }
    }
  });

  $('.title span').click(function(){
    titleClick(this);
  });
  closeDetail('#close span');

  function titleClick(title){
    var id = $(title).attr('id');
    detail_flag = true;
    image_flag = false;
    $('header').transition({
      opacity: 0,
    }, 200);
    $('#container').transition({
      opacity: 0,
    }, 500, function(){
      detail_indicate(id);
      $('#detail_container').transition({
        scale: [1, 1],
        opacity: 1,
      }, 300);
    });
  }

  function closeDetail(close){
    $(document).on('click', close, function(){
      $('#detail_container').transition({
        scale: [1, 0],
        opacity: 0
      }, 300, function(){
        $(this).remove();
        $('header').transition({
          opacity: 1,
        }, 200);
        $('#container').transition({
          opacity: 1,
        }, 500);
        image_flag = false;
        detail_flag= false;
      });
    });
  }

  function detail_indicate(num){
    var detail = articles[num-1];
    console.log(detail);
    $('body').prepend('<div id="detail_container"><div id="det_header"><div id="det_logo"><span>PicaVinci</span></div><div id="close"><span>close</span><div></div></div>');
    $('#detail_container').append('<div id="det_main"><div id="movie"><iframe width="853" height="480" src="' + detail["movie"] + '" frameborder="0" allowfullscreen></iframe></div></div>');
    $('#det_main').append('<div id="work"><div id="work_title"><h2>' + detail["work_title"] + '</h2></div><div id="description"></div></div>');
    for(var i=0; i<detail["str"].length; i++){
      $('#description').append('<p>'+ detail["str"][i] +'</p>');
    }
  }

});