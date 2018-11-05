// const scrollDisplay=()=>{
    /* Every time the window is scrolled ... */
//   $(window).scroll(function() {
//     AOS.refresh();
//     if ($(this).scrollTop()>700){
//       $('#topNav').slideDown('fast');
//       $('.mainNav').addClass('dropitDown');
//      }
//     else if ($(this).scrollTop()<700)
//      {
//        $('#topNav').fadeOut('fast');
//        $('.mainNav').removeClass('dropitDown');
//      }
//  });
// }

$('.navItem').each(function(){
  $(this).on('mouseover',function(){
    $(this).parent().removeClass('bounce delay-05s delay-06s delay-07s delay-08s')
    $(this).parent().addClass('liftUp fast');
    $(this).parent().siblings().removeClass('liftUp fast');
    // $('.intro-text').addClass('fadeOutNow');
    // $('.intro-text').removeClass('fadeInNow');
  }).on('mouseleave',function(){
    $(this).parent().removeClass('liftUp fast');
  }).on('click',function(){
    $(this).addClass('turnGold');
    $(this).parent().siblings().children().removeClass('turnGold');
    $(this).parent().addClass('stayUp');
    $(this).parent().siblings().removeClass('stayUp');
  })
})

const siteScrolling=()=>{
  // variables
  const $isAnimatedSecond = $('.second .is-animated'),
        $isAnimatedFirst = $('.first .is-animated'),
        $isAnimatedThird = $('.third .is-animated'),
        $isAnimatedFourth = $('.fourth .is-animated');
        $isAnimatedSlide1 = $('.slide1 .is-animated');
        $isAnimatedSlide2 = $('.slide2 .is-animated');
        $isAnimatedSlide3 = $('.slide3 .is-animated');

  // initialize fullPage
  $('#fullpage').fullpage({

    afterSlideLoad: function( section, origin, destination, direction){
      let totalItems = $('.third').find('.fp-slides').find('.fp-slidesContainer').children().length;
      let currentSlideIndex = 0;
      let firstIndex = 0;
      let currentIndex = $('.third').find('.fp-slides').find('.fp-slidesContainer').children().each(function(){
        if($(this).hasClass('active')){
          currentSlideIndex = $(this).index();
        }
      });
      // console.log(currentSlideIndex  + ' / ' + totalItems);
      if((currentSlideIndex == 0 && origin.index == 1 && direction == 'left') ||
        (currentSlideIndex == 0 && origin.index == 2 && direction == 'right') ||
        (firstIndex == 0)){
        // alert("Leaving the fist slide!!");
        $isAnimatedSlide1.addClass('animated fadeInUp');
        $isAnimatedSecond.eq(0).css('animation-delay', '.3s');
        $isAnimatedSecond.eq(1).css('animation-delay', '.6s');
        $isAnimatedSecond.eq(2).css('animation-delay', '.9s');
        $isAnimatedSlide1.removeClass('opacityZero');
        //
        $isAnimatedSlide2.addClass('opacityZero');
        $isAnimatedSlide2.removeClass('animated fadeInUp');
        $isAnimatedSlide3.addClass('opacityZero');
        $isAnimatedSlide3.removeClass('animated fadeInUp');
      }
      if((currentSlideIndex == 1 && origin.index == 0 && direction == 'right') ||
        (currentSlideIndex == 1 && origin.index == 2 && direction == 'left')){
        // alert("Leaving the fist slide!!");
        $isAnimatedSlide2.addClass('animated fadeInUp');
        $isAnimatedSecond.eq(0).css('animation-delay', '.3s');
        $isAnimatedSecond.eq(1).css('animation-delay', '.6s');
        $isAnimatedSecond.eq(2).css('animation-delay', '.9s');
        $isAnimatedSlide2.removeClass('opacityZero');
        //
        $isAnimatedSlide1.addClass('opacityZero');
        $isAnimatedSlide1.removeClass('animated fadeInUp');
        $isAnimatedSlide3.addClass('opacityZero');
        $isAnimatedSlide3.removeClass('animated fadeInUp');
      }
      //leaving the 3rd slide of the 2nd Section to the left
      if((currentSlideIndex == 2 && origin.index == 1 && direction == 'right') ||
        (currentSlideIndex == 2 && origin.index == 0 && direction == 'left')){
        // alert("Leaving the fist slide!!");
        $isAnimatedSlide3.addClass('animated fadeInUp');
        $isAnimatedSecond.eq(0).css('animation-delay', '.3s');
        $isAnimatedSecond.eq(1).css('animation-delay', '.6s');
        $isAnimatedSecond.eq(2).css('animation-delay', '.9s');
        $isAnimatedSlide3.removeClass('opacityZero');
        //
        $isAnimatedSlide1.addClass('opacityZero');
        $isAnimatedSlide1.removeClass('animated fadeInUp');
        $isAnimatedSlide2.addClass('opacityZero');
        $isAnimatedSlide2.removeClass('animated fadeInUp');
      }
      console.log('slideindex:', currentSlideIndex, 'originIndex:', origin.index, 'direction:', direction);
    },
    onLeave: function(index, nextIndex, direction) {
      // if(nextIndex === 1) {
      //   $('.is-animated').addClass('slideOutRight');
      // }
      if((index.index === 1 || index.index ===2 || index.index ===3) && nextIndex.index === 0){
        $isAnimatedFirst.removeClass('hoverAround3 ');
        $isAnimatedFirst.removeClass('animated fadeOutUp');
        $isAnimatedFirst.addClass('animated fadeInUp');
        $('.navItem').removeClass('turnGold');
        $('#homeBtn').addClass('turnGold');
        $('#homeBtn').parent().removeClass('animated bounce delay-05s');
        $('#homeBtn').parent().addClass('stayUp');
      }
      if(index.index === 0){
        $isAnimatedFirst.removeClass('animated fadeInUp ');
        $isAnimatedFirst.addClass('animated fadeOutUp');
        $('#homeBtn').parent().removeClass('stayUp');
      }
      if((index.index === 0 || index.index === 2 || index.index ===3) && nextIndex.index === 1) {
        $isAnimatedSecond.addClass('animated fadeInUp');
        $isAnimatedSecond.eq(0).css('animation-delay', '.3s');
        $isAnimatedSecond.eq(1).css('animation-delay', '.6s');
        $('.navItem').removeClass('turnGold');
        $('#aboutBtn').addClass('turnGold');
        $('#aboutBtn').parent().removeClass('animated bounce delay-06s');
        $('#aboutBtn').parent().addClass('stayUp');
      }
      if(index.index === 1){
        $isAnimatedSecond.removeClass('animated fadeInUp');
        $('#aboutBtn').parent().removeClass('stayUp');
        //first-time entering slider, show content
        $isAnimatedSlide1.addClass('animated fadeInUp');
        $isAnimatedSecond.eq(0).css('animation-delay', '.3s');
        $isAnimatedSecond.eq(1).css('animation-delay', '.6s');
        $isAnimatedSecond.eq(2).css('animation-delay', '.9s');
        $isAnimatedSlide1.removeClass('opacityZero');
      }
      if((index.index === 0 || index.index === 1 || index.index ===3) && nextIndex.index === 2){
        $('.navItem').removeClass('turnGold');
        $('#collabBtn').addClass('turnGold');
        $('#collabBtn').parent().removeClass('animated bounce delay-06s');
        $('#collabBtn').parent().addClass('stayUp');
      }
      if(index.index === 2){
        $('#collabBtn').parent().removeClass('stayUp');
      }
      if((index.index === 0 || index.index === 1 || index.index ===2) && nextIndex.index === 3){
        $('.navItem').removeClass('turnGold');
        $('#contactBtn').addClass('turnGold');
        $('#contactBtn').parent().removeClass('animated bounce delay-06s');
        $('#contactBtn').parent().addClass('stayUp');
      }
      if(index.index === 3){
        $('#contactBtn').parent().removeClass('stayUp');
        //first-time entering slider, show content
        $isAnimatedSlide1.addClass('animated fadeInUp');
        $isAnimatedSecond.eq(0).css('animation-delay', '.3s');
        $isAnimatedSecond.eq(1).css('animation-delay', '.6s');
        $isAnimatedSecond.eq(2).css('animation-delay', '.9s');
        $isAnimatedSlide1.removeClass('opacityZero');
      }

      console.log('index:', index.index, 'nextIndex:', nextIndex.index, 'direction:', direction);
    }
    // afterLoad: function(anchorLink, index) {
    //   $('#text').addClass('animated slideInLeft');
    // }
  })
};


const contactPage=()=>{
  // Get the form.
  var form = $('#ajax-contact');

  // Get the messages div.
  var formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function(event) {
    // Stop the browser from submitting the form.
    event.preventDefault();
    // Serialize the form data.
    var formData = $(form).serialize();
    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    }).done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      $(formMessages).removeClass('error');
      $(formMessages).addClass('success');

      // Set the message text.
      $(formMessages).text(response);

      // Clear the form.
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    }).fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error');

      // Set the message text.
      if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
      } else {
        $(formMessages).text('Oops! An error occured and your message could not be sent.');
      }
      });
  });
};

const main =()=>{
  contactPage();
  siteScrolling();
}

$(document).ready(main());


// img2.addEventListener('mouseover',move2);
//
//
// const out=()=>{
//   img1.classList.remove('moveLeft');
// }
// grid2.addEventListener('mouseout',out);
