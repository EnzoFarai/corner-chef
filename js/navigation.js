document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    // Submenu toggle for mobile
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    hasSubmenu.forEach(item => {
        const link = item.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Modal handling
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const showRegister = document.getElementById('show-register');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    }

    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.classList.remove('no-scroll');
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});
