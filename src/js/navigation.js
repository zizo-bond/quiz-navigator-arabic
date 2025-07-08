// Navigation Management

function navigateToPage(pageName, data = {}) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });

    // Show target page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('fade-in');
    }

    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Update app state
    currentState.currentPage = pageName;

    // Handle page-specific logic
    switch (pageName) {
        case 'home':
            break;
        case 'grades':
            renderGrades();
            break;
        case 'terms':
            currentState.grade = data.grade;
            renderTerms(data.grade);
            break;
        case 'units':
            currentState.term = data.term;
            renderUnits(data.grade, data.term);
            break;
        case 'lessons':
            currentState.unit = data.unit;
            renderLessons(data.grade, data.term, data.unit);
            break;
        case 'quiz':
            loadQuiz(data.grade, data.term, data.unit, data.lesson);
            break;
        case 'contact':
            break;
    }

    // Close mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

function goBack() {
    switch (currentState.currentPage) {
        case 'terms':
            navigateToPage('grades');
            break;
        case 'units':
            navigateToPage('terms', { grade: currentState.grade });
            break;
        case 'lessons':
            navigateToPage('units', { grade: currentState.grade, term: currentState.term });
            break;
        case 'quiz':
            navigateToPage('lessons', { 
                grade: currentState.grade, 
                term: currentState.term, 
                unit: currentState.unit 
            });
            break;
        default:
            navigateToPage('home');
    }
}

// Initialize navigation event listeners
function initNavigation() {
    // Main navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page) {
                navigateToPage(page);
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        }
    });

    // Handle browser back button
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            navigateToPage(e.state.page, e.state.data);
        } else {
            navigateToPage('home');
        }
    });
}

// Update browser URL (for better UX)
function updateURL(page, data = {}) {
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    
    if (data.grade) url.searchParams.set('grade', data.grade);
    if (data.term) url.searchParams.set('term', data.term);
    if (data.unit) url.searchParams.set('unit', data.unit);
    if (data.lesson) url.searchParams.set('lesson', data.lesson);
    
    window.history.pushState({ page, data }, '', url);
}

// Load page from URL parameters
function loadFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 'home';
    
    const data = {
        grade: urlParams.get('grade'),
        term: urlParams.get('term'),
        unit: urlParams.get('unit'),
        lesson: urlParams.get('lesson')
    };
    
    navigateToPage(page, data);
}