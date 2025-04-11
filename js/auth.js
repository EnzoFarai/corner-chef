function initAuth() {
    // Check if user is logged in
    const user = localStorage.getItem('cornerChefUser');
    const loginLink = document.getElementById('loginLink');
    
    // Update login link text if logged in
    if (user && loginLink) {
        const userData = JSON.parse(user);
        loginLink.textContent = 'Log Out';
        loginLink.href = '#';
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('cornerChefUser');
            window.location.reload();
        });
    }

    // Modal functionality
    const modal = document.getElementById('authModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.close-modal');
    
    // Show modal when login link clicked
    if (loginLink && !user) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.auth-tab-content');
    
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
                window.location.reload();
            }
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

// Show modal after 10 seconds if not logged in
setTimeout(() => {
    if (!localStorage.getItem('cornerChefUser')) {
        const modal = document.getElementById('authModal');
        if (modal) modal.style.display = 'block';
    }
}, 10000);
