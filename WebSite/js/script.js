const images = document.querySelectorAll('.container img');

images.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.parentNode.querySelector('p').style.fontSize = '14px';
    });

    img.addEventListener('mouseleave', () => {
        img.parentNode.querySelector('p').style.fontSize = '16px';
    });
});


//Mover elementos para dentro da página ao rolar o scroll
$(document).ready(function() {
    $('.animate__animated').each(function() {
      var element = $(this);
      var animation = element.data('animation');
      element.waypoint(function() {
        element.removeClass('invisible').addClass(animation);
      }, {
        offset: '90%'
      });
    });
  });