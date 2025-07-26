// WATCH Trading Platform - Main JavaScript

console.log('🎮 WATCH Trading Platform loaded!');

// Global variables
let currentUser = {
    name: 'Mario Trader',
    portfolio: 15750,
    trades: 203,
    rating: 4.9
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 WATCH Trading Platform initialized');
    
    // Add some Mario-style sound effects (placeholder)
    addMarioEffects();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize coin collection
    initializeCoinCollection();
    

});

// Mario-style effects
function addMarioEffects() {
    // Add click sound effects to buttons
    const buttons = document.querySelectorAll('button, .action-card');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate Mario coin sound
            console.log('🪙 Coin sound!');
        });
    });
}

// Coin collection functionality
function initializeCoinCollection() {
    const coins = document.querySelectorAll('.coin-decoration');
    let coinsCollected = 0;
    
    coins.forEach(coin => {
        coin.addEventListener('click', function() {
            // Add collection animation
            this.style.animation = 'coinCollect 0.5s ease-out forwards';
            this.style.cursor = 'pointer';
            
            // Play coin sound
            console.log('🪙 Coin collected!');
            
            // Update counter
            coinsCollected++;
            
            // Show notification
            showMarioNotification(`🪙 Coin collected! (${coinsCollected}/4)`, 'success');
            
            // Remove coin after animation
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);
        });
        
        // Add hover effect
        coin.style.cursor = 'pointer';
        coin.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        coin.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });
}



// Update portfolio display
function updatePortfolioDisplay() {
    const portfolioElement = document.querySelector('.stat-number');
    if (portfolioElement) {
        portfolioElement.textContent = `$${currentUser.portfolio.toLocaleString()}`;
    }
}

// AI Search functionality (for discovery page)
function performAISearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value;
    console.log('🔍 AI Search:', query);
    
    // Show loading animation
    showLoading();
    
    // Simulate AI processing
    setTimeout(() => {
        hideLoading();
        // Results will be handled by the discovery page
    }, 2000);
}

// Loading animations
function showLoading() {
    const loadingSection = document.getElementById('loadingSection');
    if (loadingSection) {
        loadingSection.style.display = 'block';
    }
}

function hideLoading() {
    const loadingSection = document.getElementById('loadingSection');
    if (loadingSection) {
        loadingSection.style.display = 'none';
    }
}

// Mario-style notifications
function showMarioNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--mario-white);
        color: var(--mario-black);
        padding: 15px 20px;
        border: 3px solid var(--mario-black);
        border-radius: 8px;
        font-family: 'Press Start 2P', cursive;
        font-size: 12px;
        z-index: 1000;
        box-shadow: 5px 5px 0 var(--mario-black);
        animation: slideIn 0.5s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
window.WatchTrading = {
    showNotification: showMarioNotification,
    performAISearch: performAISearch,
    currentUser: currentUser
}; 