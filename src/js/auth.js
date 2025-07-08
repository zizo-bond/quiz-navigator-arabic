// Authentication Management

function initializeAuth() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase not loaded!');
        return;
    }

    const auth = firebase.auth();
    const authContainer = document.getElementById('auth-container');

    auth.onAuthStateChanged(user => {
        if (user) {
            displayUserInfo(user, authContainer, auth);
        } else {
            displayLoginButton(authContainer);
        }
    });
}

function displayUserInfo(user, container, auth) {
    const userName = user.displayName || user.email.split('@')[0] || 'مستخدم';
    const userPhoto = user.photoURL;
    
    const avatarHtml = userPhoto ?
        `<img src="${userPhoto}" alt="${userName}" class="w-10 h-10 rounded-full object-cover border-2 border-blue-300">` :
        `<div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">${userName.charAt(0).toUpperCase()}</div>`;

    container.innerHTML = `
        <div class="flex items-center space-x-3 space-x-reverse">
            ${avatarHtml}
            <div class="relative">
                <button id="user-menu-btn" class="text-gray-600 hover:text-blue-600 focus:outline-none p-2 rounded-full hover:bg-gray-100">
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border">
                    <div class="px-4 py-2 border-b">
                        <p class="text-sm font-medium text-gray-900 truncate">${userName}</p>
                        <p class="text-xs text-gray-500 truncate">${user.email}</p>
                    </div>
                    <a href="#" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50">
                        <i class="fas fa-user-circle w-4 h-4 ml-3"></i>
                        الملف الشخصي
                    </a>
                    <button id="logout-btn" class="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                        <i class="fas fa-sign-out-alt w-4 h-4 ml-3"></i>
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </div>
    `;

    setupUserMenu(auth);
}

function displayLoginButton(container) {
    container.innerHTML = `
        <button onclick="showLoginModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            تسجيل الدخول
        </button>
    `;
}

function setupUserMenu(auth) {
    const menuBtn = document.getElementById('user-menu-btn');
    const dropdown = document.getElementById('user-dropdown');
    
    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !menuBtn.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                console.log('User signed out');
            }).catch((error) => {
                console.error('Sign out error:', error);
            });
        });
    }
}

function showLoginModal() {
    // Create login modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">تسجيل الدخول</h2>
                <p class="text-gray-600 mt-2">سجل دخولك للاستفادة من جميع المميزات</p>
            </div>
            
            <div class="space-y-4">
                <button onclick="signInWithGoogle()" class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center">
                    <i class="fab fa-google mr-3"></i>
                    تسجيل الدخول بجوجل
                </button>
                
                <div class="text-center">
                    <span class="text-gray-500">أو</span>
                </div>
                
                <form id="email-login-form" class="space-y-4">
                    <input type="email" id="login-email" placeholder="البريد الإلكتروني" class="form-input" required>
                    <input type="password" id="login-password" placeholder="كلمة المرور" class="form-input" required>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                        تسجيل الدخول
                    </button>
                </form>
                
                <div class="text-center">
                    <button onclick="showRegisterForm()" class="text-blue-600 hover:text-blue-700">
                        ليس لديك حساب؟ سجل الآن
                    </button>
                </div>
            </div>
            
            <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup form submission
    const emailForm = modal.querySelector('#email-login-form');
    emailForm.addEventListener('submit', handleEmailLogin);
}

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log('Google sign in successful');
            closeModal();
        })
        .catch((error) => {
            console.error('Google sign in error:', error);
            alert('حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        });
}

function handleEmailLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log('Email sign in successful');
            closeModal();
        })
        .catch((error) => {
            console.error('Email sign in error:', error);
            alert('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.');
        });
}

function showRegisterForm() {
    // Implementation for registration form
    alert('ميزة التسجيل ستكون متاحة قريباً');
}

function closeModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        document.body.removeChild(modal);
    }
}