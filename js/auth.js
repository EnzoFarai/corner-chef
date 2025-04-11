function initAuth() {
    // Check if user is logged in
    updateAuthUI();
    
    // Modal functionality
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.auth-tab-content');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (login(email, password)) {
                modal.style.display = 'none';
                updateAuthUI();
                window.location.reload();
            }
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userData = {
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                username: document.getElementById('regUsername').value,
                password: document.getElementById('regPassword').value,
                gender: document.getElementById('regGender').value,
                dob: document.getElementById('regDob').value
            };
            
            if (register(userData)) {
                modal.style.display = 'none';
                updateAuthUI();
                window.location.reload();
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
            updateAuthUI();
            window.location.reload();
        });
    }
}

function login(email, password) {
    if (email === 'mypretendemail@gmail.com' && password === 'thisisfake') {
        localStorage.setItem('cornerChefUser', JSON.stringify({
            email: email,
            username: 'demoUser',
            loggedIn: true
        }));
        return true;
    }
    alert('Invalid credentials. Use:\nEmail: mypretendemail@gmail.com\nPassword: thisisfake');
    return false;
}

function register(userData) {
    localStorage.setItem('cornerChefUser', JSON.stringify({
        ...userData,
        loggedIn: true
    }));
    return true;
}

function logout() {
    localStorage.removeItem('cornerChefUser');
}
