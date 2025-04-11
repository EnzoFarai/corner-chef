// Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
    }

    // Submenu toggle
    document.querySelectorAll('.has-submenu > a').forEach(link => {
        link.addEventListener('click', function(e) {
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
                submenu.classList.toggle('active');
            }
        });
    });

    // Carousel
    document.querySelectorAll('.carousel-container').forEach(container => {
        const carousel = container.querySelector('.carousel');
        const prevBtn = container.querySelector('.carousel-nav.left');
        const nextBtn = container.querySelector('.carousel-nav.right');
        
        if (carousel) {
            const scrollAmount = 300;
            if (prevBtn) prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
            if (nextBtn) nextBtn.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
        }
    });

    // Video play buttons
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('click', () => alert('Video playback would start here'));
    });
});
