// Shared utility functions

// Initialize navigation
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            this.classList.remove('active');
        });
    }
    
    // Initialize submenus
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
}

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('cornerChefUser'));
    return user?.isLoggedIn || false;
}

// Show login required message
function showLoginRequired() {
    alert('Please log in to use this feature');
    showAuthModal('login');
}
