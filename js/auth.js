document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Simple login function
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
                alert('Login successful!');
                window.location.reload();
            } else {
                alert('Invalid credentials. Try email: mypretendemail@gmail.com and password: thisisfake');
            }
        });
    }

    // Simple registration function
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
            alert('Registration successful!');
            registerModal.classList.remove('active');
            window.location.reload();
        });
    }

    // Check if user is logged in
    function checkAuth() {
        return localStorage.getItem('cornerChefUser') !== null;
    }

    // Update UI based on auth status
    function updateAuthUI() {
        const user = JSON.parse(localStorage.getItem('cornerChefUser'));
        const loginBtn = document.getElementById('login-btn');
        
        if (user && loginBtn) {
            loginBtn.textContent = user.username || 'My Account';
        }
    }

    updateAuthUI();
});
