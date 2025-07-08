// Grade Management and Quiz Loading

function renderGrades() {
    const primaryContainer = document.getElementById('primary-grades');
    const preparatoryContainer = document.getElementById('preparatory-grades');
    const secondaryContainer = document.getElementById('secondary-grades');

    // Render Primary Grades
    if (primaryContainer) {
        primaryContainer.innerHTML = '';
        gradeStructure.primary.forEach(grade => {
            const gradeCard = createGradeCard(grade);
            primaryContainer.appendChild(gradeCard);
        });
    }

    // Render Preparatory Grades
    if (preparatoryContainer) {
        preparatoryContainer.innerHTML = '';
        gradeStructure.preparatory.forEach(grade => {
            const gradeCard = createGradeCard(grade);
            preparatoryContainer.appendChild(gradeCard);
        });
    }

    // Render Secondary Grades
    if (secondaryContainer) {
        secondaryContainer.innerHTML = '';
        gradeStructure.secondary.forEach(grade => {
            const gradeCard = createGradeCard(grade);
            secondaryContainer.appendChild(gradeCard);
        });
    }
}

function createGradeCard(grade) {
    const card = document.createElement('div');
    card.className = 'grade-card';
    card.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 ${grade.color} rounded-full flex items-center justify-center">
                <i class="fas fa-graduation-cap text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800">${grade.name}</h3>
            <p class="text-gray-600 mt-2">الصف ${grade.id}</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        navigateToPage('terms', { grade: grade.id });
        updateURL('terms', { grade: grade.id });
    });
    
    return card;
}

function renderTerms(gradeId) {
    const container = document.getElementById('terms-container');
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (!container) return;

    // Update breadcrumb
    const gradeName = getGradeName(gradeId);
    if (breadcrumb) {
        breadcrumb.innerHTML = `<span>${gradeName}</span>`;
    }

    // Render terms
    container.innerHTML = '';
    terms.forEach(term => {
        const termCard = createTermCard(term, gradeId);
        container.appendChild(termCard);
    });
}

function createTermCard(term, gradeId) {
    const card = document.createElement('div');
    card.className = 'term-card';
    card.innerHTML = `
        <div class="text-center">
            <div class="w-20 h-20 mx-auto mb-6 ${term.color} rounded-full flex items-center justify-center">
                <i class="${term.icon} text-3xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">${term.name}</h3>
            <p class="text-gray-600">اختر هذا الفصل لبدء الاختبار</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        navigateToPage('units', { grade: gradeId, term: term.id });
        updateURL('units', { grade: gradeId, term: term.id });
    });
    
    return card;
}

function renderUnits(gradeId, termId) {
    const container = document.getElementById('units-container');
    const breadcrumb = document.getElementById('units-breadcrumb');
    
    if (!container) return;

    // Update breadcrumb
    const gradeName = getGradeName(gradeId);
    const termName = getTermName(termId);
    if (breadcrumb) {
        breadcrumb.innerHTML = `<span>${gradeName}</span><span>${termName}</span>`;
    }

    // For now, create sample units (in real app, this would come from Firebase)
    const sampleUnits = [
        { id: 1, name: "Unit 1: Hello World", lessons: 4 },
        { id: 2, name: "Unit 2: My Family", lessons: 4 },
        { id: 3, name: "Unit 3: At School", lessons: 4 },
        { id: 4, name: "Unit 4: My Day", lessons: 4 },
        { id: 5, name: "Unit 5: Amazing Journeys", lessons: 4 },
        { id: 6, name: "Unit 6: Sports and Games", lessons: 4 }
    ];

    container.innerHTML = '';
    sampleUnits.forEach(unit => {
        const unitCard = createUnitCard(unit, gradeId, termId);
        container.appendChild(unitCard);
    });
}

function createUnitCard(unit, gradeId, termId) {
    const card = document.createElement('div');
    card.className = 'unit-card';
    card.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <i class="fas fa-book text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">${unit.name}</h3>
            <p class="text-gray-600">${unit.lessons} دروس</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        navigateToPage('lessons', { grade: gradeId, term: termId, unit: unit.id });
        updateURL('lessons', { grade: gradeId, term: termId, unit: unit.id });
    });
    
    return card;
}

function renderLessons(gradeId, termId, unitId) {
    const container = document.getElementById('lessons-container');
    const breadcrumb = document.getElementById('lessons-breadcrumb');
    
    if (!container) return;

    // Update breadcrumb
    const gradeName = getGradeName(gradeId);
    const termName = getTermName(termId);
    const unitName = `الوحدة ${unitId}`;
    if (breadcrumb) {
        breadcrumb.innerHTML = `<span>${gradeName}</span><span>${termName}</span><span>${unitName}</span>`;
    }

    // Create lessons (4 lessons per unit)
    const lessons = [
        { id: 1, name: "الدرس الأول" },
        { id: 2, name: "الدرس الثاني" },
        { id: 3, name: "الدرس الثالث" },
        { id: 4, name: "الدرس الرابع" }
    ];

    container.innerHTML = '';
    lessons.forEach(lesson => {
        const lessonCard = createLessonCard(lesson, gradeId, termId, unitId);
        container.appendChild(lessonCard);
    });
}

function createLessonCard(lesson, gradeId, termId, unitId) {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.innerHTML = `
        <div class="text-center">
            <div class="w-14 h-14 mx-auto mb-4 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                <i class="fas fa-file-alt text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">${lesson.name}</h3>
            <p class="text-gray-600">بدء الاختبار</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        navigateToPage('quiz', { 
            grade: gradeId, 
            term: termId, 
            unit: unitId, 
            lesson: lesson.id 
        });
        updateURL('quiz', { 
            grade: gradeId, 
            term: termId, 
            unit: unitId, 
            lesson: lesson.id 
        });
    });
    
    return card;
}

async function loadQuiz(gradeId, termId, unitId, lessonId) {
    const quizPage = document.getElementById('quiz-page');
    if (!quizPage) return;

    // Show loading
    quizPage.innerHTML = `
        <div class="text-center py-16">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-xl text-gray-600">جاري تحميل الاختبار...</p>
        </div>
    `;

    try {
        // Construct the quiz file URL
        // Format: questions[grade][term][unit][lesson].js
        const quizFileName = `questions${gradeId}${termId}${unitId}${lessonId}.js`;
        const quizUrl = `${quizBaseUrl}${encodeURIComponent(quizFileName)}?alt=media`;

        // Load quiz file
        const response = await fetch(quizUrl);
        
        if (!response.ok) {
            throw new Error('Quiz file not found');
        }

        const quizScript = await response.text();
        
        // Execute the quiz script to load questions
        eval(quizScript);
        
        // Render the quiz interface
        renderQuizInterface(gradeId, termId, unitId, lessonId);
        
    } catch (error) {
        console.error('Error loading quiz:', error);
        
        // Show error message
        quizPage.innerHTML = `
            <div class="text-center py-16">
                <div class="text-red-500 mb-4">
                    <i class="fas fa-exclamation-triangle text-6xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">عذراً، لم يتم العثور على الاختبار</h2>
                <p class="text-gray-600 mb-8">الاختبار غير متاح حالياً. يرجى المحاولة لاحقاً.</p>
                <button onclick="goBack()" class="btn-primary">
                    <i class="fas fa-arrow-right mr-2"></i>
                    العودة
                </button>
            </div>
        `;
    }
}

function renderQuizInterface(gradeId, termId, unitId, lessonId) {
    const quizPage = document.getElementById('quiz-page');
    if (!quizPage) return;

    const gradeName = getGradeName(gradeId);
    const termName = getTermName(termId);
    const unitName = `الوحدة ${unitId}`;
    const lessonName = `الدرس ${lessonId}`;

    quizPage.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-header text-center">
                <h1 class="text-3xl font-bold mb-2">${unitName}</h1>
                <p class="text-xl">| ${lessonName} |</p>
                <div class="text-sm mt-4 opacity-75">
                    ${gradeName} - ${termName}
                </div>
            </div>
            
            <div id="quiz-questions" class="space-y-6"></div>
            
            <div class="text-center mt-8">
                <button onclick="submitQuiz()" class="bg-purple-700 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition font-semibold text-lg">
                    إرسال الإجابات
                </button>
            </div>
        </div>
        
        <div id="quiz-result" class="hidden quiz-container">
            <h2 class="text-2xl font-bold text-center mb-6">النتائج</h2>
            <div id="result-content"></div>
            <div class="text-center mt-8">
                <button onclick="resetQuiz()" class="btn-primary">إعادة الاختبار</button>
                <button onclick="goBack()" class="btn-secondary mr-4">العودة للدروس</button>
            </div>
        </div>
    `;

    // Load and render questions if questionsData is available
    if (typeof questionsData !== 'undefined' && typeof renderQuestions === 'function') {
        renderQuestions(questionsData);
    }
}

// Utility functions
function getGradeName(gradeId) {
    const allGrades = [...gradeStructure.primary, ...gradeStructure.preparatory, ...gradeStructure.secondary];
    const grade = allGrades.find(g => g.id == gradeId);
    return grade ? grade.name : `الصف ${gradeId}`;
}

function getTermName(termId) {
    const term = terms.find(t => t.id == termId);
    return term ? term.name : `الفصل ${termId}`;
}