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

  //botão rolar para cima
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > window.innerHeight / 2 || document.documentElement.scrollTop > window.innerHeight / 2) {
      document.getElementById("btnTopo").style.display = "block";
    } else {
      document.getElementById("btnTopo").style.display = "none";
    }
  }

  // Função para rolar suavemente para o topo
  function topFunction() {
    document.body.scrollTop = 0; // Para navegadores da web
    document.documentElement.scrollTop = 0; // Para Safari, Chrome, Firefox, IE e Opera
  }