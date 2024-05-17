// Detectar el evento de scroll
window.addEventListener('scroll', function() {
    // Obtener la posición actual de desplazamiento
    var scrollPosition = window.scrollY;

    // Obtener el navbar
    var navbar = document.getElementById('navbar');

    // Si la posición de desplazamiento es mayor que 0, agregar la clase 'scrolled', sino, quitarla
    if (scrollPosition > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
