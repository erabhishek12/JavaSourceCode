// ==========================================
// ENHANCED CONFIGURATION
// ==========================================

const CONFIG = {
    // Google Sheets Configuration
    COURSES_SHEET_ID: '1gt3LLr9i5Nu888DVSrHyGCZaqHL6uqnDI1X3sMS7Qhg',
    NOTES_SHEET_ID: '1gt3LLr9i5Nu888DVSrHyGCZaqHL6uqnDI1X3sMS7Qhg',
    COURSES_SHEET_NAME: 'Courses',
    NOTES_SHEET_NAME: 'Notes',
    API_URL: 'https://opensheet.elk.sh/',
    
    // Pagination
    ITEMS_PER_PAGE: 9,
    INITIAL_LOAD: 6,
    
    // Features
    ENABLE_VOICE_SEARCH: true,
    ENABLE_ACHIEVEMENTS: true,
    ENABLE_STREAK: true,
    SIMULATE_LIVE_USERS: true,
    
    // Animation Delays
    TYPING_SPEED: 100,
    TYPING_DELETE_SPEED: 50,
    TYPING_PAUSE: 2000,
    
    // Typing Text Rotation
    TYPING_TEXTS: [
        'Master Programming Skills',
        'Learn. Code. Succeed.',
        'Free Premium Education',
        'Join 50,000+ Developers'
    ]
};

// ==========================================
// STATE MANAGEMENT
// ==========================================

const AppState = {
    courses: [],
    notes: [],
    filteredCourses: [],
    displayedCourses: [],
    currentCategory: 'all',
    currentType: 'all',
    currentSort: 'latest',
    searchQuery: '',
    currentView: 'grid',
    currentPage: 1,
    
    // User Data
    bookmarkedCourses: JSON.parse(localStorage.getItem('bookmarks')) || [],
    downloadedNotes: JSON.parse(localStorage.getItem('downloads')) || [],
    visitCount: parseInt(localStorage.getItem('visitCount')) || 0,
    lastVisit: localStorage.getItem('lastVisit') || null,
    streak: parseInt(localStorage.getItem('streak')) || 0,
    achievements: JSON.parse(localStorage.getItem('achievements')) || [],
    
    // Theme
    theme: localStorage.getItem('theme') || 'light',
    
    // Voice Recognition
    recognition: null,
    isListening: false,
    
    // Testimonials
    currentTestimonial: 0,
    testimonialInterval: null
};

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    console.log('%c🚀 JavaSourceCode Enhanced ', 'background: linear-gradient(135deg, #4F46E5, #FF9933); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    
    // Show loading with percentage
    showEnhancedLoading();
    
    // Initialize all features
    await Promise.all([
        initializeTheme(),
        initializeNavbar(),
        initializeUserTracking(),
        initializeVoiceSearch(),
        initializeAnimations(),
        initializeEventListeners(),
        fetchCourses(),
        fetchNotes(),
        initializeTestimonials(),
        initializeFAQ(),
        initializeForms()
    ]);
    
    // Additional initializations
    initializeTypingEffect();
    initializeStreakSystem();
    initializeAchievements();
    simulateLiveUsers();
    
    // Hide loading
    hideEnhancedLoading();
}

// ==========================================
// ENHANCED LOADING SCREEN
// ==========================================

function showEnhancedLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const percentage = document.getElementById('loadingPercentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        percentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 150);
}

function hideEnhancedLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const percentage = document.getElementById('loadingPercentage');
    
    percentage.textContent = '100%';
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 500);
}

// ==========================================
// THEME MANAGEMENT
// ==========================================

function initializeTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    updateThemeIcon();
    
    // Auto dark mode detection
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            AppState.theme = 'dark';
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon();
        }
    }
}

function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    localStorage.setItem('theme', AppState.theme);
    updateThemeIcon();
    
    // Smooth transition
    document.body.style.transition = 'background 0.3s, color 0.3s';
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    icon.className = AppState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ==========================================
// ENHANCED NAVBAR
// ==========================================

function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateProgressBar();
        updateScrollButtons();
        updateActiveSection();
    });
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY / windowHeight;
    progressBar.style.transform = `scaleX(${scrolled})`;
}

function updateScrollButtons() {
    const scrollBtn = document.getElementById('scrollTop');
    const helpBtn = document.getElementById('helpBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    if (window.scrollY > 300) {
        scrollBtn?.classList.add('show');
        helpBtn?.classList.add('show');
        shareBtn?.classList.add('show');
    } else {
        scrollBtn?.classList.remove('show');
        helpBtn?.classList.remove('show');
        shareBtn?.classList.remove('show');
    }
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// USER TRACKING & STREAK SYSTEM
// ==========================================

function initializeUserTracking() {
    AppState.visitCount++;
    localStorage.setItem('visitCount', AppState.visitCount);
    
    const today = new Date().toDateString();
    const lastVisit = AppState.lastVisit;
    
    if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        const daysDiff = Math.floor((new Date(today) - lastVisitDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
            AppState.streak++;
            checkAchievement('week-streak', AppState.streak >= 7);
        } else if (daysDiff > 1) {
            AppState.streak = 1;
        }
    } else {
        AppState.streak = 1;
    }
    
    localStorage.setItem('lastVisit', today);
    localStorage.setItem('streak', AppState.streak);
}

function initializeStreakSystem() {
    const streakCount = document.getElementById('streakCount');
    if (streakCount) {
        animateNumber(streakCount, AppState.streak, 1000);
    }
}

// ==========================================
// TYPING EFFECT
// ==========================================

function initializeTypingEffect() {
    const element = document.getElementById('typingText');
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = CONFIG.TYPING_TEXTS[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? CONFIG.TYPING_DELETE_SPEED : CONFIG.TYPING_SPEED;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = CONFIG.TYPING_PAUSE;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % CONFIG.TYPING_TEXTS.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ==========================================
// VOICE SEARCH
// ==========================================

function initializeVoiceSearch() {
    if (!CONFIG.ENABLE_VOICE_SEARCH || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        document.querySelectorAll('.voice-btn, .voice-search, #heroVoiceBtn').forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    AppState.recognition = new SpeechRecognition();
    AppState.recognition.continuous = false;
    AppState.recognition.interimResults = false;
    AppState.recognition.lang = 'en-US';
    
    AppState.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('searchInput').value = transcript;
        handleSearch({ target: { value: transcript } });
        stopVoiceSearch();
    };
    
    AppState.recognition.onerror = () => {
        stopVoiceSearch();
    };
    
    AppState.recognition.onend = () => {
        stopVoiceSearch();
    };
}

function startVoiceSearch() {
    if (!AppState.recognition) return;
    
    AppState.isListening = true;
    AppState.recognition.start();
    
    document.querySelectorAll('.voice-btn, .voice-search').forEach(btn => {
        btn.classList.add('active');
    });
}

function stopVoiceSearch() {
    if (!AppState.recognition) return;
    
    AppState.isListening = false;
    AppState.recognition.stop();
    
    document.querySelectorAll('.voice-btn, .voice-search').forEach(btn => {
        btn.classList.remove('active');
    });
}

// ==========================================
// ANIMATIONS
// ==========================================

function initializeAnimations() {
    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.course-card, .note-card, .feature-card').forEach(el => {
        scrollObserver.observe(el);
    });
}

function animateNumber(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toString();
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function initializeEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    
    // Voice search buttons
    document.getElementById('voiceSearch')?.addEventListener('click', () => {
        AppState.isListening ? stopVoiceSearch() : startVoiceSearch();
    });
    
    document.getElementById('courseVoiceSearch')?.addEventListener('click', () => {
        AppState.isListening ? stopVoiceSearch() : startVoiceSearch();
    });
    
    document.getElementById('heroVoiceBtn')?.addEventListener('click', () => {
        AppState.isListening ? stopVoiceSearch() : startVoiceSearch();
    });
    
    // Search
    document.getElementById('searchInput')?.addEventListener('input', debounce(handleSearch, 300));
    
    // Filters
    document.getElementById('typeFilter')?.addEventListener('change', handleTypeFilter);
    document.getElementById('sortFilter')?.addEventListener('change', handleSortFilter);
    document.getElementById('viewToggle')?.addEventListener('click', toggleView);
    
    // Scroll to top
    document.getElementById('scrollTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Help modal
    document.getElementById('helpBtn')?.addEventListener('click', () => openModal('helpModal'));
    
    // Share modal
    document.getElementById('shareBtn')?.addEventListener('click', () => openModal('shareModal'));
    
    // Load more
    document.getElementById('loadMoreBtn')?.addEventListener('click', loadMoreCourses);
}

// ==========================================
// FETCH COURSES FROM GOOGLE SHEETS
// ==========================================

async function fetchCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    
    try {
        const url = `${CONFIG.API_URL}${CONFIG.COURSES_SHEET_ID}/${CONFIG.COURSES_SHEET_NAME}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch courses');
        
        const data = await response.json();
        AppState.courses = data;
        AppState.filteredCourses = data;
        
        // Generate dynamic categories
        generateCategoryTabs();
        
        // Display initial courses
        displayCourses();
        
    } catch (error) {
        console.error('Error fetching courses:', error);
        coursesGrid.innerHTML = `
            <div class="loading-courses">
                <i class="fas fa-exclamation-triangle" style="color: #EF4444; font-size: 48px; margin-bottom: 20px;"></i>
                <h3>Unable to load courses</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">Please check your configuration:</p>
                <ul style="text-align: left; color: var(--text-muted); font-size: 14px; max-width: 400px;">
                    <li>✓ Google Sheet ID is correct</li>
                    <li>✓ Sheet is public (Anyone with link can view)</li>
                    <li>✓ Sheet name is exactly "${CONFIG.COURSES_SHEET_NAME}"</li>
                </ul>
            </div>
        `;
    }
}

function generateCategoryTabs() {
    const categories = [...new Set(AppState.courses.map(course => course.Category))];
    const tabsContainer = document.getElementById('categoryTabs');
    
    // Keep "All Courses" button
    const allBtn = tabsContainer.querySelector('[data-category="all"]');
    
    // Add category buttons
    categories.forEach(category => {
        if (category) {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.category = category;
            btn.innerHTML = `
                <i class="fas fa-folder"></i>
                <span>${category}</span>
            `;
            btn.addEventListener('click', () => handleCategoryFilter(btn));
            tabsContainer.appendChild(btn);
        }
    });
}

// ==========================================
// FETCH NOTES FROM GOOGLE SHEETS
// ==========================================

async function fetchNotes() {
    const notesGrid = document.getElementById('notesGrid');
    
    try {
        const url = `${CONFIG.API_URL}${CONFIG.NOTES_SHEET_ID}/${CONFIG.NOTES_SHEET_NAME}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch notes');
        
        const data = await response.json();
        AppState.notes = data;
        
        renderNotes(data);
        
    } catch (error) {
        console.error('Error fetching notes:', error);
        notesGrid.innerHTML = `
            <div class="loading-courses">
                <i class="fas fa-exclamation-triangle" style="color: #EF4444; font-size: 48px; margin-bottom: 20px;"></i>
                <h3>Unable to load notes</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">Please check your configuration:</p>
                <ul style="text-align: left; color: var(--text-muted); font-size: 14px; max-width: 400px;">
                    <li>✓ Google Sheet ID is correct</li>
                    <li>✓ Sheet is public</li>
                    <li>✓ Sheet name is "${CONFIG.NOTES_SHEET_NAME}"</li>
                </ul>
            </div>
        `;
    }
}

function renderNotes(notes) {
    const notesGrid = document.getElementById('notesGrid');
    
    if (notes.length === 0) {
        notesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No notes available yet.</p>';
        return;
    }
    
    notesGrid.innerHTML = notes.map(note => createNoteCard(note)).join('');
    
    // Add event listeners
    document.querySelectorAll('.note-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const noteId = link.dataset.id;
            downloadNote(noteId);
        });
    });
    
    // Notes filter buttons
    document.querySelectorAll('.notes-filter .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.notes-filter .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const filtered = filter === 'all' ? notes : notes.filter(n => n.Category === filter);
            notesGrid.innerHTML = filtered.map(note => createNoteCard(note)).join('');
        });
    });
}

function createNoteCard(note) {
    const isDownloaded = AppState.downloadedNotes.includes(note.ID);
    const iconClass = getSubjectIcon(note.Subject);
    
    return `
        <div class="note-card glass-morphism" data-category="${note.Category}">
            <div class="note-icon">
                <i class="${iconClass}"></i>
            </div>
            <h3>${note.Subject}</h3>
            <div class="note-topics">
                ${note.Topics ? note.Topics.split(',').map(topic => 
                    `<span class="topic-tag">${topic.trim()}</span>`
                ).join('') : ''}
            </div>
            <p class="note-desc">${note.Description}</p>
            <div class="note-stats">
                <span><i class="fas fa-file-pdf"></i> ${note.Pages || 'N/A'} pages</span>
                <span><i class="fas fa-download"></i> ${note.Downloads || '0'} downloads</span>
            </div>
            <a href="#" class="note-link ${isDownloaded ? 'downloaded' : ''}" data-id="${note.ID}">
                <i class="fas fa-${isDownloaded ? 'check-circle' : 'download'}"></i>
                ${isDownloaded ? 'Downloaded' : 'Download Notes'}
            </a>
        </div>
    `;
}

function getSubjectIcon(subject) {
    const icons = {
        'C Programming': 'fas fa-file-code',
        'C++': 'fab fa-cuttlefish',
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'JavaScript': 'fab fa-js',
        'DSA': 'fas fa-project-diagram',
        'DBMS': 'fas fa-database',
        'SQL': 'fas fa-database'
    };
    
    for (let key in icons) {
        if (subject.includes(key)) return icons[key];
    }
    
    return 'fas fa-book';
}

function downloadNote(noteId) {
    const note = AppState.notes.find(n => n.ID === noteId);
    if (!note || !note.Link) {
        alert('Download link not available. Please contact admin.');
        return;
    }
    
    // Track download
    if (!AppState.downloadedNotes.includes(noteId)) {
        AppState.downloadedNotes.push(noteId);
        localStorage.setItem('downloads', JSON.stringify(AppState.downloadedNotes));
        
        // Check achievement
        checkAchievement('note-collector', AppState.downloadedNotes.length >= 5);
    }
    
    // Open link
    window.open(note.Link, '_blank');
    
    // Update UI
    const linkElement = document.querySelector(`[data-id="${noteId}"]`);
    if (linkElement) {
        linkElement.classList.add('downloaded');
        linkElement.innerHTML = '<i class="fas fa-check-circle"></i> Downloaded';
    }
}

// ==========================================
// DISPLAY & FILTER COURSES
// ==========================================

function displayCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    const noResults = document.getElementById('noResults');
    const loadMoreSection = document.getElementById('loadMoreSection');
    
    // Apply filters
    let filtered = [...AppState.courses];
    
    // Category filter
    if (AppState.currentCategory !== 'all') {
        filtered = filtered.filter(c => c.Category === AppState.currentCategory);
    }
    
    // Type filter
    if (AppState.currentType !== 'all') {
        filtered = filtered.filter(c => c.Type === AppState.currentType);
    }
    
    // Search filter
    if (AppState.searchQuery) {
        const query = AppState.searchQuery.toLowerCase();
        filtered = filtered.filter(c => 
            c.Title?.toLowerCase().includes(query) ||
            c.Description?.toLowerCase().includes(query) ||
            c.Category?.toLowerCase().includes(query)
        );
    }
    
    // Sort
    filtered = sortCourses(filtered);
    
    AppState.filteredCourses = filtered;
    
    // Pagination
    const startIndex = 0;
    const endIndex = AppState.currentPage * CONFIG.ITEMS_PER_PAGE;
    AppState.displayedCourses = filtered.slice(startIndex, endIndex);
    
    // Render
    if (filtered.length === 0) {
        coursesGrid.innerHTML = '';
        noResults.classList.add('show');
        loadMoreSection.style.display = 'none';
    } else {
        noResults.classList.remove('show');
        coursesGrid.innerHTML = AppState.displayedCourses.map(course => createCourseCard(course)).join('');
        
        // Show/hide load more button
        if (AppState.displayedCourses.length < filtered.length) {
            loadMoreSection.style.display = 'block';
        } else {
            loadMoreSection.style.display = 'none';
        }
        
        // Add bookmark listeners
        attachBookmarkListeners();
    }
}

function createCourseCard(course) {
    const isBookmarked = AppState.bookmarkedCourses.includes(course.ID);
    const stars = generateStars(parseFloat(course.Rating) || 0);
    const badgeClass = getBadgeClass(course.Type);
    
    return `
        <div class="course-card glass-morphism">
            <img src="${course.Thumbnail || 'https://via.placeholder.com/400x200?text=' + encodeURIComponent(course.Title)}" 
                 alt="${course.Title}" 
                 class="course-thumbnail"
                 onerror="this.src='https://via.placeholder.com/400x200?text=Course'">
            <span class="course-badge ${badgeClass}">${course.Type}</span>
            
            <div class="course-content">
                <span class="course-category">${course.Category}</span>
                <h3 class="course-title">${course.Title}</h3>
                <p class="course-description">${course.Description}</p>
                
                <div class="course-meta">
                    <div class="course-duration">
                        <i class="fas fa-clock"></i>
                        <span>${course.Duration || 'N/A'}</span>
                    </div>
                    <div class="course-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-number">${course.Rating || 'N/A'}</span>
                    </div>
                </div>
                
                <div class="course-footer">
                    <a href="${course.Link}" target="_blank" class="course-btn btn-view" onclick="trackCourseView('${course.ID}')">
                        <i class="fas fa-external-link-alt"></i>
                        View ${course.Type}
                    </a>
                    <button class="course-btn btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" 
                            data-id="${course.ID}"
                            title="${isBookmarked ? 'Remove bookmark' : 'Add bookmark'}">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalf) {
        stars += '★';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

function getBadgeClass(type) {
    const classes = {
        'YouTube': 'badge-youtube',
        'PDF': 'badge-pdf',
        'Link': 'badge-link'
    };
    return classes[type] || 'badge-link';
}

function sortCourses(courses) {
    switch (AppState.currentSort) {
        case 'popular':
            return courses.sort((a, b) => (b.Views || 0) - (a.Views || 0));
        case 'rating':
            return courses.sort((a, b) => (parseFloat(b.Rating) || 0) - (parseFloat(a.Rating) || 0));
        case 'latest':
        default:
            return courses.sort((a, b) => (b.ID || 0) - (a.ID || 0));
    }
}

function loadMoreCourses() {
    AppState.currentPage++;
    displayCourses();
    
    // Scroll to new content
    const coursesGrid = document.getElementById('coursesGrid');
    const firstNewCard = coursesGrid.children[(AppState.currentPage - 1) * CONFIG.ITEMS_PER_PAGE];
    if (firstNewCard) {
        firstNewCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ==========================================
// FILTER HANDLERS
// ==========================================

function handleSearch(e) {
    AppState.searchQuery = e.target.value;
    AppState.currentPage = 1;
    displayCourses();
}

function handleCategoryFilter(button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    AppState.currentCategory = button.dataset.category;
    AppState.currentPage = 1;
    displayCourses();
}

function handleTypeFilter(e) {
    AppState.currentType = e.target.value;
    AppState.currentPage = 1;
    displayCourses();
}

function handleSortFilter(e) {
    AppState.currentSort = e.target.value;
    displayCourses();
}

function toggleView() {
    const coursesGrid = document.getElementById('coursesGrid');
    const viewToggle = document.getElementById('viewToggle');
    const icon = viewToggle.querySelector('i');
    
    AppState.currentView = AppState.currentView === 'grid' ? 'list' : 'grid';
    
    if (AppState.currentView === 'list') {
        coursesGrid.classList.add('list-view');
        icon.className = 'fas fa-th';
    } else {
        coursesGrid.classList.remove('list-view');
        icon.className = 'fas fa-list';
    }
}

function resetFilters() {
    AppState.currentCategory = 'all';
    AppState.currentType = 'all';
    AppState.currentSort = 'latest';
    AppState.searchQuery = '';
    AppState.currentPage = 1;
    
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('sortFilter').value = 'latest';
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
    });
    
    displayCourses();
}

// ==========================================
// BOOKMARKS
// ==========================================

function attachBookmarkListeners() {
    document.querySelectorAll('.btn-bookmark').forEach(btn => {
        btn.addEventListener('click', () => toggleBookmark(btn.dataset.id));
    });
}

function toggleBookmark(courseId) {
    const index = AppState.bookmarkedCourses.indexOf(courseId);
    
    if (index > -1) {
        AppState.bookmarkedCourses.splice(index, 1);
    } else {
        AppState.bookmarkedCourses.push(courseId);
        checkAchievement('first-course', true);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(AppState.bookmarkedCourses));
    
    // Update button
    const button = document.querySelector(`[data-id="${courseId}"]`);
    if (button) {
        button.classList.toggle('bookmarked');
        button.title = button.classList.contains('bookmarked') ? 'Remove bookmark' : 'Add bookmark';
    }
}

function trackCourseView(courseId) {
    console.log('Course viewed:', courseId);
    checkAchievement('first-course', true);
}

// ==========================================
// ACHIEVEMENTS SYSTEM
// ==========================================

function initializeAchievements() {
    if (!CONFIG.ENABLE_ACHIEVEMENTS) return;
    
    updateAchievementBadges();
}

function checkAchievement(achievementId, condition) {
    if (!CONFIG.ENABLE_ACHIEVEMENTS) return;
    if (AppState.achievements.includes(achievementId)) return;
    
    if (condition) {
        AppState.achievements.push(achievementId);
        localStorage.setItem('achievements', JSON.stringify(AppState.achievements));
        unlockAchievement(achievementId);
        updateAchievementBadges();
    }
}

function unlockAchievement(achievementId) {
    const badge = document.querySelector(`[data-achievement="${achievementId}"]`);
    if (badge) {
        badge.classList.remove('locked');
        badge.classList.add('unlocked');
        
        // Show notification
        showNotification(`🎉 Achievement Unlocked: ${badge.querySelector('span').textContent}!`);
    }
}

function updateAchievementBadges() {
    AppState.achievements.forEach(achievementId => {
        const badge = document.querySelector(`[data-achievement="${achievementId}"]`);
        if (badge) {
            badge.classList.remove('locked');
            badge.classList.add('unlocked');
        }
    });
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #4F46E5, #FF9933);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 8px 30px rgba(79, 70, 229, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==========================================
// LIVE USERS SIMULATION
// ==========================================

function simulateLiveUsers() {
    if (!CONFIG.SIMULATE_LIVE_USERS) return;
    
    const liveUsersElement = document.getElementById('liveUsers');
    if (!liveUsersElement) return;
    
    function updateLiveUsers() {
        const baseUsers = 1200;
        const variation = Math.floor(Math.random() * 100) - 50;
        const liveUsers = baseUsers + variation;
        liveUsersElement.textContent = liveUsers.toLocaleString();
    }
    
    updateLiveUsers();
    setInterval(updateLiveUsers, 10000); // Update every 10 seconds
}

// ==========================================
// TESTIMONIALS CAROUSEL
// ==========================================

function initializeTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track) return;
    
    const testimonials = track.children;
    const totalTestimonials = testimonials.length;
    
    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToTestimonial(i));
        dotsContainer.appendChild(dot);
    }
    
    function updateCarousel() {
        track.style.transform = `translateX(-${AppState.currentTestimonial * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === AppState.currentTestimonial);
        });
    }
    
    function goToTestimonial(index) {
        AppState.currentTestimonial = index;
        updateCarousel();
    }
    
    function nextTestimonial() {
        AppState.currentTestimonial = (AppState.currentTestimonial + 1) % totalTestimonials;
        updateCarousel();
    }
    
    function prevTestimonial() {
        AppState.currentTestimonial = (AppState.currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateCarousel();
    }
    
    prevBtn?.addEventListener('click', prevTestimonial);
    nextBtn?.addEventListener('click', nextTestimonial);
    
    // Auto-play
    AppState.testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(AppState.testimonialInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        AppState.testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// ==========================================
// FAQ ACCORDION
// ==========================================

function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ==========================================
// FORMS
// ==========================================

function initializeForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showNotification('✅ Message sent successfully!');
        contactForm.reset();
        
        button.innerHTML = originalText;
        button.disabled = false;
    });
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = newsletterForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showNotification('🎉 Subscribed successfully!');
        newsletterForm.reset();
        
        button.innerHTML = originalText;
        button.disabled = false;
    });
}

// ==========================================
// MODALS
// ==========================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close on backdrop click
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => {
        closeModal(backdrop.closest('.modal').id);
    });
});

// Close buttons
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(btn.closest('.modal').id);
    });
});

// ==========================================
// SHARE FUNCTIONALITY
// ==========================================

function copyShareLink() {
    const input = document.getElementById('shareLink');
    input.select();
    document.execCommand('copy');
    showNotification('📋 Link copied to clipboard!');
}

// Social share buttons
document.querySelectorAll('.share-btn-social').forEach(btn => {
    btn.addEventListener('click', () => {
        const url = window.location.href;
        const text = 'Check out JavaSourceCode - Free Programming Resources!';
        
        if (btn.classList.contains('whatsapp')) {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        } else if (btn.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        } else if (btn.classList.contains('facebook')) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        } else if (btn.classList.contains('linkedin')) {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        }
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==========================================
// CONSOLE BRANDING
// ==========================================

console.log('%c🎓 JavaSourceCode Enhanced v2.0 ', 'background: linear-gradient(135deg, #4F46E5, #FF9933); color: white; font-size: 16px; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
console.log('%c💻 Developed by Abhishek Kumar', 'color: #FF9933; font-size: 14px; font-weight: bold;');
console.log('%c🔧 Powered by Google Sheets API', 'color: #10B981; font-size: 12px;');
console.log('%c⚡ Features: Voice Search, Achievements, Live Stats, Auto Dark Mode', 'color: #4F46E5; font-size: 11px;');

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);