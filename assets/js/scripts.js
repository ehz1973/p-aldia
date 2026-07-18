//   JavaScript para activar el movimiento
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    toggleBtn.addEventListener('click', function () {
        // Alterna la clase que empuja el sidebar hacia la izquierda
        sidebar.classList.toggle('sidebar-hidden');
    });
});
