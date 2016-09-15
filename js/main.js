$(function(){
  $('body').transition({opacity: 1}, 3000, 'in-out');

  var image_flag = false;
  var menu_flag = true;

  titleHover('.title');

  function titleHover(title){
    $(title).hover(
      function(){
        if(!image_flag){
          image_flag = true;
          $('#message').transition({
            opacity: 0
          }, 100, function(){
            $('#rightContent').prepend('<div id="test"></div>');
            $('#test').transition({
              width: '100%',
              right:0
            }, 300, 'cubic-bezier(1,0,0.38,1)');
          });
        }
      },
      function(){
        $('#test').transition({
          width: 0,
          opacity: 0,
          right: '50%'
        }, 500, function(){
          $.when($('#test').remove())
          .then($('#message').transition({
            opacity: 1
          }, 300, 'cubic-bezier(1,0,0.38,1)', function(){
            image_flag = false;
          }));
        });
      }
    );
  }

  function linkHover() {
    $('#menu_list li a').hover(
      function(){
        $(this).transition({
          color: '#fff'
        });
      },
      function(){
        $(this).transition({
          color: '#000'
        });
      }
    );
  }

  function menuOpen(){
    $('#menu_button').click(function(){
      if(menu_flag){
        menu_flag = false;
        $(this).transition({
          rotate: '90deg',
          left: -150,
          width: 150,
          height: 0,
          opacity: 0
        },function(){
          $.when($(this).remove())
          .then($('#menu_inner').prepend('<ul id="menu_list"></ul>'))
          .then($('#menu_list').transition({
            width: '100%',
            backgroundColor: 'rgba(80, 80, 80, 0.2)'
          }, function(){
            menuHover('#menu_list');
            $.when($('#menu_list').append('<li><a id="aboutLink" class="animsition-link" href="about.html">About</a></li>')
            .append('<li><a href="about.html">Infomation</a></li>')
            .append('<li><a href="about.html">Works</a></li>')
            .append('<li><a href="about.html">Contact</a></li>'))
            .then(
              $('#menu_list li a').transition({
                opacity: 1
              },linkHover())
            );
            body_flag = true;
          }));
        });
      }else{
        return false;
      }
    });
  }

});