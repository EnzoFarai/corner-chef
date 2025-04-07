// Load header and footer
function loadComponents() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            initNavigation();
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Initialize navigation functionality
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (menuToggle && navMenu && navOverlay) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });

        navOverlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
        });

        // Toggle Submenus
        document.querySelectorAll('.has-submenu > a').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                const submenu = this.nextElementSibling;
                
                // Close all other submenus at the same level
                const siblings = parent.parentElement.querySelectorAll('.has-submenu');
                siblings.forEach(sib => {
                    if (sib !== parent) {
                        sib.classList.remove('active');
                        sib.querySelector('.submenu').classList.remove('active');
                    }
                });
                
                // Toggle current submenu
                parent.classList.toggle('active');
                submenu.classList.toggle('active');
            });
        });
    }

    // Carousel functionality
    function scrollCarousel(direction) {
        const carousel = document.getElementById('recipeCarousel');
        if (carousel) {
            const scrollAmount = 300;
            carousel.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    }
    
    // Video play functionality
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('click', function() {
            alert('Video playback would start here');
        });
    });
    
    // Filter button functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
