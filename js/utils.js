function includeHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            // Initialize any header-specific JS after load
            const loginLink = document.getElementById('login-link');
            if (loginLink) {
                loginLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('loginModal').style.display = 'block';
                });
            }
        });
}

function includeFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

function updateAuthUI() {
    const user = localStorage.getItem('cornerChefUser');
    const authElements = document.querySelectorAll('.auth-element');
    const noAuthElements = document.querySelectorAll('.no-auth-element');
    
    if (user) {
        authElements.forEach(el => el.style.display = 'block');
        noAuthElements.forEach(el => el.style.display = 'none');
    } else {
        authElements.forEach(el => el.style.display = 'none');
        noAuthElements.forEach(el => el.style.display = 'block');
    }
}
