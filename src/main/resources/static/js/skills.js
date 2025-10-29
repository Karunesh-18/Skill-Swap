// Skills Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Protect page
    if (typeof protectPage === 'function') {
        protectPage();
    }
    
    // Load user data
    if (typeof loadUserData === 'function') {
        loadUserData();
    }
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Add Skill Modal
    const addSkillBtn = document.getElementById('addSkillBtn');
    const addSkillModal = document.getElementById('addSkillModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelSkillBtn = document.getElementById('cancelSkillBtn');
    const addSkillForm = document.getElementById('addSkillForm');
    
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            addSkillModal.classList.add('active');
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            addSkillModal.classList.remove('active');
            addSkillForm.reset();
        });
    }
    
    if (cancelSkillBtn) {
        cancelSkillBtn.addEventListener('click', function() {
            addSkillModal.classList.remove('active');
            addSkillForm.reset();
        });
    }
    
    // Close modal on outside click
    addSkillModal.addEventListener('click', function(e) {
        if (e.target === addSkillModal) {
            addSkillModal.classList.remove('active');
            addSkillForm.reset();
        }
    });
    
    // Handle Add Skill Form
    if (addSkillForm) {
        addSkillForm.addEventListener('submit', handleAddSkill);
    }
    
    // Handle Edit and Remove buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-danger')) {
            if (confirm('Are you sure you want to remove this skill?')) {
                e.target.closest('.skill-item').remove();
                showNotification('Skill removed successfully', 'success');
            }
        }
        
        if (e.target.textContent === 'Edit') {
            showNotification('Edit functionality coming soon!', 'success');
        }
        
        if (e.target.textContent === 'Find Matches') {
            window.location.href = 'matches.html';
        }
    });
    
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
});

// Handle Add Skill
function handleAddSkill(e) {
    e.preventDefault();
    
    const skillType = document.querySelector('input[name="skillType"]:checked').value;
    const skillName = document.getElementById('skillName').value.trim();
    const skillLevel = document.getElementById('skillLevel').value;
    const skillDescription = document.getElementById('skillDescription').value.trim();
    
    if (!skillName || !skillLevel || !skillDescription) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Create skill object
    const newSkill = {
        id: Date.now(),
        type: skillType,
        name: skillName,
        level: skillLevel,
        description: skillDescription,
        createdAt: new Date().toISOString()
    };
    
    // Get current user's skills
    const user = getCurrentUser();
    const skills = Storage.get('skills') || [];
    
    // Add user ID to skill
    newSkill.userId = user.id;
    
    // Add to skills array
    skills.push(newSkill);
    Storage.set('skills', skills);
    
    // Close modal
    document.getElementById('addSkillModal').classList.remove('active');
    document.getElementById('addSkillForm').reset();
    
    // Show success message
    showNotification('Skill added successfully!', 'success');
    
    // Reload page to show new skill
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Helper functions
function loadUserData() {
    const user = getCurrentUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    const userNameElements = document.querySelectorAll('#userName, h3');
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
}

// Storage and utility functions (if not loaded)
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

