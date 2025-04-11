// Auth functions
function checkLogin() {
    const user = localStorage.getItem('cornerChefUser');
    if (!user) {
        document.getElementById('loginModal').style.display = 'block';
        return false;
    }
    return true;
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email === 'mypretendemail@gmail.com' && password === 'thisisfake') {
        localStorage.setItem('cornerChefUser', JSON.stringify({
            email: email,
            loggedIn: true
        }));
        alert('Login successful!');
        window.location.reload();
        return true;
    }
    alert('Invalid credentials');
    return false;
}
