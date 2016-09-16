$(function(){
  $('body').transition({opacity: 1}, 3000, 'in-out');

  var image_flag = false;

  titleHover('.title');

  function titleHover(title){
    $(title).hover(
      function(){
        var id = $(this).attr('id');
        var id_str = 'img/image0' + id + '.jpg';
        if(!image_flag){
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
    );
  }

});