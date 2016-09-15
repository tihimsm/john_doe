$(function(){
  $('body').transition({opacity: 1}, 3000, 'in-out');

  var body_flag = false;
  var menu_flag = true;

  menuHover('#menu_button');
  menuOpen();

  $('body').click(function(e){
    if(body_flag){
      var target = e.target;
      if (target.id === 'menu_list') {
        return false;
      }
      body_flag = false;
      $('#menu_list li a').transition({
        opacity: 0
      }, function(){
        $('#menu_list').transition({
          width: 0,
          backgroundColor: 'rgba(80, 80, 80, 0)'
        },function(){
          menu_flag = true;
          $.when($(this).remove())
          .then($('#menu_inner').prepend('<div id="menu_button" style="left: -150px; background-color: rgba(80, 80, 80, 0); width: 150px; height: 0; transform: rotate(90deg);"></div>'))
          .then($('#menu_button').prepend('<a style="">MENU</a>'))
          .then($('#menu_button').transition({
            rotate: '0deg',
            left: 0,
            width: 300,
            height: 50,
            backgroundColor: 'rgba(80, 80, 80, 0.2)'
          },function(){
            menuHover('#menu_button');
            menuOpen();
          }));
        });
      });
    }else{
      return false;
    }
  });

  function menuHover(menu){
    $(menu).hover(
      function(){
        $(this).transition({
          backgroundColor: 'rgba(80, 80, 80, 0.7)'
        },300,'ease');
        if(menu === '#menu_button') {
          $(this).css("cursor","pointer");
          $('#menu_button a').transition({
            color: '#fff'
          },300,'ease');
        }
      },
      function(){
        $(this).transition({
          backgroundColor: 'rgba(80, 80, 80, 0.2)'
        },300,'ease');
        $('#menu_button a').transition({
          color: '#000'
        },300,'ease');
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