document.addEventListener('DOMContentLoaded', function() {
    // Show modal after 10 seconds only on homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        setTimeout(function() {
            const user = localStorage.getItem('cornerChefUser');
            if (!user) {
                document.getElementById('loginModal').style.display = 'flex';
                document.body.classList.add('no-scroll');
            }
        }, 10000); // 10 seconds
    }

    // Close modal functionality
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.classList.remove('no-scroll');
        });
    });

    // Toggle between login and register
    const showRegister = document.getElementById('showRegister');
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('registerModal').style.display = 'flex';
        });
    }

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
                this.reset();
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
                document.body.classList.remove('no-scroll');
                window.location.reload();
            } else {
                alert('Invalid credentials. Try email: mypretendemail@gmail.com and password: thisisfake');
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
            this.reset();
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.classList.remove('no-scroll');
            window.location.reload();
        });
    }
});
