// Main Application Initialization

document.addEventListener('DOMContentLoaded', function() {
    console.log('Ikhtibaraty App Loading...');
    
    // Initialize all components
    initializeApp();
});

function initializeApp() {
    try {
        // Initialize Firebase Authentication
        initializeAuth();
        
        // Initialize Navigation
        initNavigation();
        
        // Initialize start quiz button
        initStartQuizButton();
        
        // Load page from URL if present
        loadFromURL();
        
        // Initialize contact form
        initContactForm();
        
        console.log('App initialized successfully');
        
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

function initStartQuizButton() {
    const startBtn = document.getElementById('start-quiz-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            navigateToPage('grades');
        });
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    // For now, just show a success message
    alert('تم إرسال رسالتك بنجاح! سنرد عليك قريباً.');
    
    // Reset form
    e.target.reset();
}

// Global functions that might be called from quiz.js
window.submitQuiz = function() {
    if (typeof submitQuizAnswers === 'function') {
        submitQuizAnswers();
    } else {
        console.error('submitQuizAnswers function not found');
    }
};

window.resetQuiz = function() {
    if (typeof resetQuizData === 'function') {
        resetQuizData();
    } else {
        // Fallback - reload the quiz
        const { grade, term, unit, lesson } = currentState;
        if (grade && term && unit && lesson) {
            loadQuiz(grade, term, unit, lesson);
        }
    }
};

// Global navigation functions
window.navigateToPage = navigateToPage;
window.goBack = goBack;

// Global auth functions
window.showLoginModal = showLoginModal;
window.signInWithGoogle = signInWithGoogle;
window.closeModal = closeModal;

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Service worker registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}