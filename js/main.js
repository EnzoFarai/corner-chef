// Load header and footer
function loadComponents() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            initNavigation();
        });
    
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

// Initialize navigation functionality
function initNavigation() {
    // Toggle Navigation Menu
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
                
                // Close siblings
                const siblings = parent.parentElement.querySelectorAll('.has-submenu');
                siblings.forEach(sib => {
                    if (sib !== parent) {
                        sib.classList.remove('active');
                        sib.querySelector('.submenu').classList.remove('active');
                    }
                });
                
                // Toggle current
                parent.classList.toggle('active');
                submenu.classList.toggle('active');
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadComponents);
