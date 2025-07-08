// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyApcUgv9VkkfFzSsMZ5w6wf9qSmRag0zPU",
    authDomain: "last-ea299.firebaseapp.com",
    projectId: "last-ea299",
    storageBucket: "last-ea299.firebasestorage.app",
    messagingSenderId: "1062187066842",
    appId: "1:1062187066842:web:ce6b77c33023d7690f4ce3",
    measurementId: "G-BB6RKTGBTZ"
};

// Grade Structure
const gradeStructure = {
    primary: [
        { id: 1, name: "الصف الأول الابتدائي", color: "bg-blue-100 text-blue-800" },
        { id: 2, name: "الصف الثاني الابتدائي", color: "bg-blue-100 text-blue-800" },
        { id: 3, name: "الصف الثالث الابتدائي", color: "bg-blue-100 text-blue-800" },
        { id: 4, name: "الصف الرابع الابتدائي", color: "bg-blue-100 text-blue-800" },
        { id: 5, name: "الصف الخامس الابتدائي", color: "bg-blue-100 text-blue-800" },
        { id: 6, name: "الصف السادس الابتدائي", color: "bg-blue-100 text-blue-800" }
    ],
    preparatory: [
        { id: 7, name: "الصف الأول الإعدادي", color: "bg-green-100 text-green-800" },
        { id: 8, name: "الصف الثاني الإعدادي", color: "bg-green-100 text-green-800" },
        { id: 9, name: "الصف الثالث الإعدادي", color: "bg-green-100 text-green-800" }
    ],
    secondary: [
        { id: 10, name: "الصف الأول الثانوي", color: "bg-purple-100 text-purple-800" },
        { id: 11, name: "الصف الثاني الثانوي", color: "bg-purple-100 text-purple-800" },
        { id: 12, name: "الصف الثالث الثانوي", color: "bg-purple-100 text-purple-800" }
    ]
};

// Terms
const terms = [
    { id: 1, name: "الفصل الدراسي الأول", icon: "fas fa-leaf", color: "bg-green-100 text-green-800" },
    { id: 2, name: "الفصل الدراسي الثاني", icon: "fas fa-sun", color: "bg-yellow-100 text-yellow-800" }
];

// Units (placeholder - these would typically come from Firebase)
const unitsStructure = {
    // Grade -> Term -> Units
    // This will be populated dynamically based on the quiz files
};

// Firebase Storage URLs for quiz files
const quizBaseUrl = "https://firebasestorage.googleapis.com/v0/b/last-ea299.firebasestorage.app/o/";

// App State
let currentState = {
    grade: null,
    term: null,
    unit: null,
    lesson: null,
    currentPage: 'home'
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}