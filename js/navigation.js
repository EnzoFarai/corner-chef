document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (menuToggle && navMenu && navOverlay) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });

        navOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            this.classList.remove('active');
        });

        // Submenu toggle
        const hasSubmenu = document.querySelectorAll('.has-submenu');
        hasSubmenu.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) { // Only on mobile
                    e.preventDefault();
                    this.classList.toggle('active');
                    const submenu = this.querySelector('.submenu');
                    submenu.classList.toggle('active');
                }
            });
        });
    }
});
