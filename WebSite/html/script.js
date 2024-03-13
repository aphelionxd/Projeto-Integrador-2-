const images = document.querySelectorAll('.container img');

images.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.parentNode.querySelector('p').style.fontSize = '14px';
    });

    img.addEventListener('mouseleave', () => {
        img.parentNode.querySelector('p').style.fontSize = '16px';
    });
});
