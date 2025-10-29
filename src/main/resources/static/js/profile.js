// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Protect page
    if (typeof protectPage === 'function') {
        protectPage();
    }
    
    // Load user data
    loadUserProfile();
    
    // Profile form handler
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    // Password form handler
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }
    
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
    
    // Delete account handler
    const deleteBtn = document.querySelector('.danger-actions .btn-danger');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', handleDeleteAccount);
    }
});

// Load user profile data
function loadUserProfile() {
    const user = getCurrentUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update sidebar
    const userNameElements = document.querySelectorAll('h3');
    userNameElements.forEach(el => {
        if (el.textContent === 'John Doe') {
            el.textContent = `${user.firstName} ${user.lastName}`;
        }
    });
    
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.textContent = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    
    const universityElement = document.querySelector('.user-university');
    if (universityElement) {
        universityElement.textContent = user.university;
    }
    
    // Populate form fields
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('email').value = user.email;
    document.getElementById('university').value = user.university;
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const university = document.getElementById('university').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const major = document.getElementById('major').value.trim();
    const year = document.getElementById('year').value;
    
    // Validate
    if (!firstName || !lastName || !email || !university) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Get current user
    const currentUser = getCurrentUser();
    
    // Update user data
    const updatedUser = {
        ...currentUser,
        firstName,
        lastName,
        email,
        university,
        bio,
        major,
        year
    };
    
    // Save to storage
    Storage.set('currentUser', updatedUser);
    
    // Update users array
    const users = Storage.get('users') || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        Storage.set('users', users);
    }
    
    showNotification('Profile updated successfully!', 'success');
    
    // Reload to show changes
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Handle password change
function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    // Validate
    if (newPassword.length < 8) {
        showNotification('New password must be at least 8 characters', 'error');
        return;
    }
    
    if (newPassword !== confirmNewPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Get current user
    const currentUser = getCurrentUser();
    const users = Storage.get('users') || [];
    const user = users.find(u => u.id === currentUser.id);
    
    // Verify current password (in real app, this would be done server-side)
    if (user && user.password !== currentPassword) {
        showNotification('Current password is incorrect', 'error');
        return;
    }
    
    // Update password
    if (user) {
        user.password = newPassword;
        Storage.set('users', users);
        showNotification('Password updated successfully!', 'success');
        document.getElementById('passwordForm').reset();
    }
}

// Handle account deletion
function handleDeleteAccount() {
    const confirmation = prompt('This action cannot be undone. Type "DELETE" to confirm:');
    
    if (confirmation === 'DELETE') {
        const currentUser = getCurrentUser();
        const users = Storage.get('users') || [];
        
        // Remove user from users array
        const updatedUsers = users.filter(u => u.id !== currentUser.id);
        Storage.set('users', updatedUsers);
        
        // Clear current user
        Storage.remove('currentUser');
        
        showNotification('Account deleted successfully', 'success');
        
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    } else if (confirmation !== null) {
        showNotification('Account deletion cancelled', 'error');
    }
}

// Helper functions (if not loaded from other scripts)
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
        if (!Storage.get('currentUser')) {
            window.location.href = 'login.html';
        }
    }
}

if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
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
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }
}

