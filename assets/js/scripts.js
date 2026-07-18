//   JavaScript para activar el movimiento
document.addEventListener("DOMContentLoaded", function () {
    const botonHomeLink = document.getElementById('boton-home-link');
    const homeLink = document.getElementById('home-link');
    const sidebar = document.getElementById('sidebar');

    botonHomeLink.addEventListener('click', function () {
        // Alterna la clase que empuja el sidebar hacia la izquierda
        sidebar.classList.toggle('sidebar-hidden');
    });
    homeLink.addEventListener('click', function () {
        // Alterna la clase que empuja el sidebar hacia la izquierda
        sidebar.classList.toggle('sidebar-hidden');
    });
});
