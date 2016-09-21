$(window).load(function(){
  $('body').transition({opacity: 1}, 3000, 'in-out');

  var image_flag = false;
  var detail_flag = false;

  titleHover('.title span');
  titleClick('.title span');
  closeDetail('#close span');

  function titleHover(title){
    $(title).hover(
      function(){
        var id = $(this).attr('id');
        var id_str = 'img/0' + id + '.jpg';
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
            }, 300, 'cubic-bezier(1,0.5,0.38,1)', function(){
            });
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
      var id = $(this).attr('id');
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
            // scale: [1, 0]
          }, 500, function(){
            detail_indicate(id);
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
          // scale: [1, 1]
        }, 500);
        $('#message').transition({
          opacity: 1
        }, 500);
        image_flag = false;
        detail_flag= false;
      });
    });
  }

  function detail_indicate(num){
    num -= 1;

    var work_title = [
      "kujaku 2016AW creation",
      "Sassoon show movie",
      "coming soon",
      "coming soon"
    ];

    var str = [
      [
        "If you really want to hear about it,",
        "the first thing you'll probably want to know is where",
        "I was born,",
        "an what my lousy childhood was like,",
        "and how my parents were occupied and all before",
        "they had me,",
        "and all that David Copperfield kind of crap,",
        "but I don't feel like going into it,",
        "if you want to know the truth."
      ],
      [
        "How happy I am that I am gone!",
        "My dear friend, what a thing is the heart of man!",
        "To leave you, from whom I have been inseparable,",
        "whom I love so dearly, and yet to feel happy!",
        "I know you will forgive me.",
        "Have not other attachments been specially appointed",
        "by fate to torment a head like mine?",
        "Poor Leonora! and yet I was not to blame."
      ],
      [
        "On an exceptionally hot evening early in July",
        "a young man came out of the garret in which he lodged in S.",
        "Place and walked slowly,",
        "as though in hesitation, towards K. bridge.",
        "He had successfully avoided",
        "meeting his landlady on the staircase.",
        "His garret was under the roof of a high,",
        "five-storied house and was more like a cupboard than a room."
      ],
      [
        "If you really want to hear about it,",
        "the first thing you'll probably want to know is where",
        "I was born,",
        "an what my lousy childhood was like,",
        "and how my parents were occupied and all before",
        "they had me,",
        "and all that David Copperfield kind of crap,",
        "but I don't feel like going into it,",
        "if you want to know the truth."
      ]
    ];

    var movie = [
      "<iframe width='853' height='480' src='https://www.youtube.com/embed/PNrXEDKEinI' frameborder='0' allowfullscreen></iframe>",
      "<iframe width='853' height='480' src='https://www.youtube.com/embed/2OwnjfCXBos' frameborder='0' allowfullscreen></iframe>",
      "<iframe width='853' height='480' src='https://www.youtube.com/embed/s1eEFrGUOsw' frameborder='0' allowfullscreen></iframe>",
      "<iframe width='853' height='480' src='https://www.youtube.com/embed/oCrwzN6eb4Q?list=RDoCrwzN6eb4Q' frameborder='0' allowfullscreen></iframe>"
    ]
    $('body').prepend('<div id="detail_container"><div id="det_header"><div id="det_logo"><span>PicaVinci</span></div><div id="close"><span>close</span><div></div></div>');
    $('#detail_container').append('<div id="det_main"><div id="movie">' + movie[num]+ '</div></div>');
    $('#det_main').append('<div id="work"><div id="work_title"><h2>' + work_title[num] + '</h2></div><div id="description"></div></div>');
    for(var i=0; i<str[num].length; i++){
      $('#description').append('<p>'+ str[num][i] +'</p>');
    }
  }

});