$(function(){
  $('body').transition({opacity: 1}, 3000, 'in-out');

  var image_flag = false;
  var detail_flag = false;

  titleHover('.title');
  titleClick('.title');
  closeDetail('#det_header .logo span');

  function titleHover(title){
    $(title).hover(
      function(){
        var id = $(this).attr('id');
        var id_str = 'img/image0' + id + '.jpg';
        if(!image_flag && !detail_flag){
          console.log('a');
          image_flag = true;
          $('#message').transition({
            opacity: 0
          }, 100, function(){
            $('#rightContent').prepend('<div id="test"></div>');
            $('#test').css("background-image", "url('" + id_str +"')");
            $('#test').transition({
              opacity: 1,
              scale: [1, 1]
            }, 300, 'cubic-bezier(1,0.5,0.38,1)');
          });
        }
      },
      function(){
        if(!detail_flag){
          $('#test').transition({
            opacity: 0,
            scale: [1, 0]
          }, 400, 'cubic-bezier(1,0,0.38,1)', function(){
            $.when($('#test').remove())
            .then($('#message').transition({
              opacity: 1
            }, 200, function(){
              image_flag = false;
            }));
          });
        }
      }
    );
  }

  function titleClick(title){
    $(title).click(function(){
      detail_flag = true;
      $('#test').transition({
        opacity: 0,
        scale: [1, 0]
      }, 400, 'cubic-bezier(1,0,0.38,1)', function(){
        $.when($('#test').remove())
        .then(function(){
          image_flag = false;
          $('header').transition({
            opacity: 0,
          }, 200);
          $('#container').transition({
            opacity: 0,
            scale: [1, 0]
          }, 500, function(){
            detail_indicate();
            $('#detail_container').transition({
              scale: [1, 1],
              opacity: 1,
            }, 500);
          });
        });
      });
    });
  }

  function closeDetail(close){
    $(document).on('click', close, function(){
      $('#detail_container').transition({
        scale: [1, 0],
        opacity: 0
      }, 500, function(){
        $(this).remove();
        $('header').transition({
          opacity: 1,
        }, 200);
        $('#container').transition({
          opacity: 1,
          scale: [1, 1]
        }, 500);
        image_flag = false;
        detail_flag= false;
      });
    });
  }

  function detail_indicate(){
    $('body').prepend('<div id="detail_container"><div id="det_header"><div class="logo"><span>PicaVinchi</span></div></div></div>');
  }

});