document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (menuToggle && navMenu && navOverlay) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });

        // Improved Submenu Toggle
        document.querySelectorAll('.has-submenu > a').forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    
                    // Close other open submenus at this level
                    parent.parentElement.querySelectorAll('.has-submenu').forEach(sibling => {
                        if (sibling !== parent) {
                            sibling.classList.remove('active');
                            sibling.querySelector('.submenu').classList.remove('active');
                        }
                    });
                    
                    // Toggle current submenu
                    parent.classList.toggle('active');
                    this.nextElementSibling.classList.toggle('active');
                }
            });
        });
    }

    // Close menu when clicking a link (optional)
    document.querySelectorAll('.nav-menu a:not(.has-submenu > a)').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900) {
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
});
