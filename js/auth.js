// Auth state management
let currentUser = JSON.parse(localStorage.getItem('cornerChefUser'));

function showAuthModal(tab = 'login') {
    const modal = document.getElementById('authModal');
    modal.style.display = 'flex';
    
    // Set active tab
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    document.getElementById(`${tab}Tab`).classList.add('active');
    document.getElementById(`${tab}Form`).classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Hardcoded credentials
    if (email === 'mypretendemail@gmail.com' && password === 'thisisfake') {
        currentUser = {
            email: email,
            isLoggedIn: true,
            lastLogin: new Date().toISOString()
        };
        localStorage.setItem('cornerChefUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();
        return;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('cornerChefUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            ...user,
            isLoggedIn: true,
            lastLogin: new Date().toISOString()
        };
        localStorage.setItem('cornerChefUser', JSON.stringify(currentUser));
        updateAuthUI();
        closeAuthModal();
    } else {
        alert('Invalid email or password');
    }
}

function register(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!userData.name || !userData.email || !userData.password) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Save user
    const users = JSON.parse(localStorage.getItem('cornerChefUsers')) || [];
    if (users.some(u => u.email === userData.email)) {
        alert('Email already registered');
        return;
    }
    
    users.push(userData);
    localStorage.setItem('cornerChefUsers', JSON.stringify(users));
    
    // Auto-login
    currentUser = {
        ...userData,
        isLoggedIn: true,
        lastLogin: new Date().toISOString()
    };
    localStorage.setItem('cornerChefUser', JSON.stringify(currentUser));
    updateAuthUI();
    closeAuthModal();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('cornerChefUser');
    updateAuthUI();
}

function updateAuthUI() {
    const authElements = document.querySelectorAll('.auth-element');
    const userElements = document.querySelectorAll('.user-element');
    
    if (currentUser?.isLoggedIn) {
        authElements.forEach(el => el.style.display = 'none');
        userElements.forEach(el => el.style.display = 'block');
        
        // Update user display name if element exists
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay) {
            userDisplay.textContent = currentUser.name || currentUser.email.split('@')[0];
        }
    } else {
        authElements.forEach(el => el.style.display = 'block');
        userElements.forEach(el => el.style.display = 'none');
        
        // Show register prompt after 10 seconds if not shown before
        if (!sessionStorage.getItem('registerPromptShown')) {
            setTimeout(() => {
                if (!currentUser?.isLoggedIn) {
                    showAuthModal('register');
                    sessionStorage.setItem('registerPromptShown', 'true');
                }
            }, 10000);
        }
    }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    // Add auth modal to body if not exists
    if (!document.getElementById('authModal')) {
        const authModal = document.createElement('div');
        authModal.id = 'authModal';
        authModal.className = 'auth-modal';
        authModal.innerHTML = `
            <div class="auth-content">
                <span class="close-auth">&times;</span>
                <div class="auth-tabs">
                    <div class="auth-tab active" id="loginTab">Log In</div>
                    <div class="auth-tab" id="registerTab">Register</div>
                </div>
                
                <form id="loginForm" class="auth-form active" onsubmit="login(event)">
                    <div class="auth-form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" required>
                    </div>
                    <div class="auth-form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit" class="auth-submit">Log In</button>
                    <div class="auth-switch">
                        Don't have an account? <a onclick="showAuthModal('register')">Register</a>
                    </div>
                </form>
                
                <form id="registerForm" class="auth-form" onsubmit="register(event)">
                    <div class="auth-form-group">
                        <label for="regName">Full Name</label>
                        <input type="text" id="regName" name="name" required>
                    </div>
                    <div class="auth-form-group">
                        <label for="regEmail">Email</label>
                        <input type="email" id="regEmail" name="email" required>
                    </div>
                    <div class="auth-form-group">
                        <label for="regUsername">Username</label>
                        <input type="text" id="regUsername" name="username" required>
                    </div>
                    <div class="auth-form-group">
                        <label for="regPassword">Password</label>
                        <input type="password" id="regPassword" name="password" required>
                    </div>
                    <div class="auth-form-group">
                        <label>Gender</label>
                        <div style="display: flex; gap: 1rem;">
                            <label><input type="radio" name="gender" value="male" required> Male</label>
                            <label><input type="radio" name="gender" value="female"> Female</label>
                            <label><input type="radio" name="gender" value="other"> Other</label>
                        </div>
                    </div>
                    <div class="auth-form-group">
                        <label for="regDob">Date of Birth</label>
                        <input type="date" id="regDob" name="dob" required>
                    </div>
                    <button type="submit" class="auth-submit">Register</button>
                    <div class="auth-switch">
                        Already have an account? <a onclick="showAuthModal('login')">Log In</a>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(authModal);
        
        // Add event listeners
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.id.replace('Tab', '');
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${tabId}Form`).classList.add('active');
            });
        });
        
        document.querySelector('.close-auth').addEventListener('click', closeAuthModal);
    }
    
    // Update UI based on auth state
    updateAuthUI();
    
    // Add login/logout links
    const userOptions = document.querySelector('.user-options');
    if (userOptions) {
        const loginLink = userOptions.querySelector('a[href="#"]');
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                showAuthModal('login');
            });
        }
    }
});
