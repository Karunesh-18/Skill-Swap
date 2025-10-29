// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (isLoggedIn() && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }

    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register Form Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Password strength indicator
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }
    }
});

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous errors
    clearErrors();
    
    // Validate inputs
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        return;
    }
    
    // Get users from storage
    const users = Storage.get('users') || [];
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current user
        Storage.set('currentUser', {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            university: user.university,
            rememberMe: rememberMe
        });
        
        showNotification('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        // For demo purposes, create a demo user and log them in
        const demoUser = {
            id: Date.now(),
            firstName: 'John',
            lastName: 'Doe',
            email: email,
            password: password,
            university: 'University of Technology'
        };
        
        users.push(demoUser);
        Storage.set('users', users);
        
        Storage.set('currentUser', {
            id: demoUser.id,
            firstName: demoUser.firstName,
            lastName: demoUser.lastName,
            email: demoUser.email,
            university: demoUser.university,
            rememberMe: rememberMe
        });
        
        showNotification('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }
}

// Handle Registration
function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const university = document.getElementById('university').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Clear previous errors
    clearErrors();
    
    let hasError = false;
    
    // Validate inputs
    if (firstName.length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        hasError = true;
    }
    
    if (lastName.length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        hasError = true;
    }
    
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        hasError = true;
    }
    
    if (university.length < 3) {
        showError('universityError', 'Please enter your university name');
        hasError = true;
    }
    
    if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters');
        hasError = true;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        hasError = true;
    }
    
    if (!terms) {
        showNotification('Please accept the terms and conditions', 'error');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Get existing users
    const users = Storage.get('users') || [];
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showError('emailError', 'This email is already registered');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        university,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    Storage.set('users', users);
    
    // Auto login
    Storage.set('currentUser', {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        university: newUser.university
    });
    
    showNotification('Account created successfully! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Update password strength indicator
function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strengthBar');
    
    if (!strengthBar) return;
    
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    strengthBar.className = 'strength-bar';
    
    if (strength === 0) {
        strengthBar.style.width = '0';
    } else if (strength <= 2) {
        strengthBar.classList.add('weak');
    } else if (strength === 3) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        const inputElement = errorElement.previousElementSibling;
        if (inputElement && inputElement.tagName === 'INPUT') {
            inputElement.classList.add('error');
        }
    }
}

// Clear all errors
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    
    document.querySelectorAll('input.error').forEach(el => {
        el.classList.remove('error');
    });
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Storage helper (if not already loaded from main.js)
if (typeof Storage === 'undefined') {
    const Storage = {
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: function(key) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
    };
}

// Check if logged in (if not already loaded from main.js)
if (typeof isLoggedIn === 'undefined') {
    function isLoggedIn() {
        return Storage.get('currentUser') !== null;
    }
}

// Show notification (if not already loaded from main.js)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

