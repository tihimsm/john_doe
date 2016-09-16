$(function(){
  $('body').transition({opacity: 1}, 3000, 'in-out');

  var image_flag = false;
  var detail_flag = false;

  titleHover('.title');
  titleClick('.title');

  function titleHover(title){
    $(title).hover(
      function(){
        var id = $(this).attr('id');
        var id_str = 'img/image0' + id + '.jpg';
        if(!image_flag && !detail_flag){
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
          }, 200, function(){
            detail_indicate();
            $('#detail_container').transition({
              marginTop: 0,
              opacity: 1,
            }, 1000, function(){
              $('header').transition({
                scale: 0
              }, 200);
              $('#container').transition({
                height: 0
              }, 200);
            });
          });
        });
      });
    });
  }

  function detail_indicate(){
    $('body').prepend('<div id="detail_container"><div id="det_header"><div id="logo"><span>PicaVinchi</span></div></div></div>');
  }

});