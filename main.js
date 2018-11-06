const scrollDisplay=()=>{
    /* Every time the window is scrolled ... */
  $(window).scroll(function() {
    AOS.refresh();
    if ($(this).scrollTop()>700){
      $('#topNav').slideDown('fast');
      $('.mainNav').addClass('dropitDown');
     }
    else if ($(this).scrollTop()<700)
     {
       $('#topNav').fadeOut('fast');
       $('.mainNav').removeClass('dropitDown');
     }
 });
}

const skillSelect=()=>{
  $('.skill-head').on('mouseover',function(){
    $('img',this).show();
    if($('h1',this).hasClass('skillshiftLeft') || $('.skill-btn').hasClass('skillshiftLeft')){
      $('.skill-imgs').children().hide();
    }else{
      let index = $(this).index();
      $('.skill-imgs').find(':nth-child('+(index+1)+')').show();
      $('.skill-imgs').find(':nth-child('+(index+1)+')').siblings().hide();
    }
  }).on('mouseleave',function(){
    $('img',this).hide();
  })

  $('.skill-btn').on('click',function(){
    $('#skillExpand').hide();
    $('#skillClose').show();
    $(this).removeClass('skillshiftRight');
    $(this).addClass('skillshiftLeft');
    if($('.skill-btn').hasClass('skillshiftLeft')){
      $('.skill-imgs').children().hide();
    }
    let index = $(this).parent().index();
    console.log(index);
    $('.skill-imgs').children().hide();
    $('.content'+index).removeClass('hide');
    $('.content'+index).delay(300).addClass('show2');
  })

  $('#skillExpand').on('click',function(){
    $('#skillExpand').hide();
    $('#skillClose').show();
    $('.skill-imgs').children().hide();
    $('.skill-content').each(function(){
      $(this).addClass('show2');
    })
    $('.skill-head').each(function(){
      $('h1',this).addClass('skillshiftLeft');
      $('h1',this).removeClass('skillshiftRight');
    })
    $('.skill-content').each(function(){
      $(this).removeClass('hide');
    })
  })

  $('#skillClose').on('click',function(){
    $('#skillExpand').show();
    $('#skillClose').hide();
    $('.skill-imgs').children().show();
    $('.skill-content').each(function(){
      $(this).removeClass('show2');
    })
    $('.skill-head').each(function(){
      $('h1',this).removeClass('skillshiftLeft');
      $('h1',this).addClass('skillshiftRight');
    })
    $('.skill-content').each(function(){
      $(this).addClass('hide');
    })
  })
}

const expSelect=()=>{
  $('.card').on('click',function(){
      $(this).toggleClass('flipped');
  });
}

const flipAll=()=>{
  $('#expExpand').on('click',function(){

    $('.card').each(function(){
      $(this).toggleClass('flipped')
    });
  });
}

const selectContact=()=>{
  $('.icon').on('mouseover',function(){
    $(this).addClass('hover');
  }).on('mouseleave',function(){
    $('.icon').removeClass('hover');
  })

  $('#gmail-b').on('click',function(){
    new jBox('Notice', {
      content: 'fborui@gmail.com',
      color: 'black',
      position: {x:'left',y:'bottom'},
      offset: {x:50,y:-150},
      closeOnClick:false
    }).animate('shake')
  })

  $('#twitter-b').click(function(){
    window.open('https://twitter.com/BoruiF');
    return false;
  });

  $('#linkedin-b').on('click',function(){
    window.open('https://www.linkedin.com/in/borui/');
    return false;
  })

  $('#git-b').on('click',function(){
    window.open('https://github.com/ruige92?tab=repositories');
    return false;
  })

  $('#phone-b').on('click',function(){
    new jBox('Notice', {
      content: '+44 7449592884',
      color: 'black',
      position: {x:'left',y:'bottom'},
      offset: {x:50,y:-150},
      closeOnClick:false
    }).animate('shake')
  })
}

const mobileNavControl=()=>{
  $('#mobileNavOpen').on('click',function(){
    $('#mobileNavClose').fadeIn();
    $('#mobileNavOpen').fadeOut();
    $('.mobile-container').fadeIn();
  })
  $('#mobileNavClose').on('click',function(){
    $('#mobileNavClose').fadeOut();
    $('#mobileNavOpen').fadeIn();
    $('.mobile-container').fadeOut();
  })
}
//
// var scene = document.getElementById('midArea');
// var parallaxInstance = new Parallax(scene);

const main =()=>{
  let gridIndex;
  let previousGridIndex;
  $('.moveImg').each(function(){
    $(this).on('mouseover',function(){
      gridIndex = $(this).index()+1;
      if(gridIndex<previousGridIndex){
        $('.mid'+gridIndex).delay(500).addClass('rightEnter');
        $('.mid'+gridIndex).siblings().removeClass('rightEnter');
        $('.mid'+gridIndex).siblings().removeClass('leftEnter');
      }else if(gridIndex>previousGridIndex){
        $('.mid'+gridIndex).delay(500).addClass('leftEnter');
        $('.mid'+gridIndex).siblings().removeClass('leftEnter');
        $('.mid'+gridIndex).siblings().removeClass('rightEnter');
      }else{
        $('.mid'+gridIndex).delay(500).addClass('moveMid');
      }
      $(this).find('h1').addClass('grayText');
      $(this).siblings().find('h1').removeClass('grayText');
    })
  }).on('mouseleave',function(){
    $('.mid'+gridIndex).removeClass('moveMid')
    if(gridIndex<previousGridIndex){
      $('.mid'+gridIndex).addClass('leftGone');
      $('.mid'+gridIndex).siblings().removeClass('leftGone');
    }else{
      $('.mid'+gridIndex).addClass('rightGone');
      $('.mid'+gridIndex).siblings().removeClass('rightGone');
    }
    previousGridIndex = gridIndex;
  })

  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 800);
    }
  });

  $.fn.scrollView = function () {
    return this.each(function () {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $(this).offset().top
      }, 800);
    });
  }

  $('.moveImg').each(function(){
    $(this).click(function (event) {
      let target = $(this).find('a').attr('href');
      event.preventDefault();
      $(target).scrollView();
    });
  })

  $(document).on('mouseleave',()=>{
    $('.imgs').removeClass('rightEnter');
    $('.imgs').removeClass('leftEnter');
    $('.moveImg').siblings().find('h1').removeClass('hover');
  })


  $('.downArr').on('click',()=>{
    $("html, body").animate({ scrollTop: 0 }, "slow");
  })

  mobileNavControl();
  scrollDisplay();
  skillSelect();
  expSelect();
  flipAll();
  selectContact();
}

$(document).ready(main());


// img2.addEventListener('mouseover',move2);
//
//
// const out=()=>{
//   img1.classList.remove('moveLeft');
// }
// grid2.addEventListener('mouseout',out);
