// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Protect page - redirect if not logged in
    if (typeof protectPage === 'function') {
        protectPage();
    } else if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
    
    // Load user data
    loadUserData();
    
    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                logout();
            }
        });
    }
    
    // Load dashboard data
    loadDashboardData();
});

// Load user data
function loadUserData() {
    const user = getCurrentUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update user name displays
    const userNameElements = document.querySelectorAll('#userName');
    userNameElements.forEach(el => {
        el.textContent = `${user.firstName} ${user.lastName}`;
    });
    
    const userFirstNameElements = document.querySelectorAll('#userFirstName');
    userFirstNameElements.forEach(el => {
        el.textContent = user.firstName;
    });
    
    // Update user avatar
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.textContent = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    
    // Update university
    const universityElement = document.querySelector('.user-university');
    if (universityElement) {
        universityElement.textContent = user.university;
    }
}

// Load dashboard data
function loadDashboardData() {
    // In a real application, this would fetch data from a server
    // For now, we'll use sample data
    
    // You can add more dynamic data loading here
    console.log('Dashboard data loaded');
}

// Helper functions (if not loaded from main.js)
if (typeof Storage === 'undefined') {
    const Storage = {
        set: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: function(key) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        remove: function(key) {
            localStorage.removeItem(key);
        }
    };
}

if (typeof isLoggedIn === 'undefined') {
    function isLoggedIn() {
        return Storage.get('currentUser') !== null;
    }
}

if (typeof getCurrentUser === 'undefined') {
    function getCurrentUser() {
        return Storage.get('currentUser');
    }
}

if (typeof logout === 'undefined') {
    function logout() {
        Storage.remove('currentUser');
        window.location.href = '../index.html';
    }
}

if (typeof protectPage === 'undefined') {
    function protectPage() {
        if (!isLoggedIn()) {
            window.location.href = 'login.html';
        }
    }
}

