document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const showRegister = document.getElementById('showRegister');
    const closeModals = document.querySelectorAll('.close-modal');

    // Only show on homepage after 10 seconds
    if (window.location.pathname.endsWith('index.html') || 
       window.location.pathname === '/') {
        setTimeout(function() {
            const user = localStorage.getItem('cornerChefUser');
            if (!user && loginModal) {
                loginModal.style.display = 'flex';
                document.body.classList.add('no-scroll');
            }
        }, 10000); // 10 seconds = 10000 milliseconds
    }

    // Modal toggle functionality
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginModal) loginModal.style.display = 'none';
            if (registerModal) registerModal.style.display = 'flex';
        });
    }

    // Close modals
    closeModals.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.classList.remove('no-scroll');
        });
    });

    // Close when clicking outside modal content
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.classList.remove('no-scroll');
        }
    });

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email === 'mypretendemail@gmail.com' && password === 'thisisfake') {
                localStorage.setItem('cornerChefUser', JSON.stringify({
                    email: email,
                    loggedIn: true
                }));
                window.location.reload();
            } else {
                alert('Invalid credentials. Try:\nEmail: mypretendemail@gmail.com\nPassword: thisisfake');
            }
        });
    }

    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userData = {
                name: document.getElementById('registerName').value,
                email: document.getElementById('registerEmail').value,
                username: document.getElementById('registerUsername').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value,
                dob: document.getElementById('registerDob').value,
                loggedIn: true
            };
            
            localStorage.setItem('cornerChefUser', JSON.stringify(userData));
            window.location.reload();
        });
    }

    // Update UI based on login status
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        const user = localStorage.getItem('cornerChefUser');
        if (user) {
            const userData = JSON.parse(user);
            loginBtn.textContent = userData.username || 'My Account';
        }
    }
});
