// ==========================================
// FIREBASE v10 MODULAR SETUP
// ==========================================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Your Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCklk9ugj3J4O5zWO1zn46r652vcUPKNDc",
    authDomain: "study-hub-b826d.firebaseapp.com",
    databaseURL: "https://study-hub-b826d-default-rtdb.firebaseio.com",
    projectId: "study-hub-b826d",
    storageBucket: "study-hub-b826d.firebasestorage.app",
    messagingSenderId: "122884916872",
    appId: "1:122884916872:web:39cd7136592a2ef917c13d"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase initialized successfully");
console.log("📊 Firestore instance:", db);

// ==========================================
// SESSION PERSISTENCE & AUTO-REDIRECT
// ==========================================
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("✅ User already logged in:", user.email);
        
        // Prevent back navigation
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };
        
        // Show success modal and redirect
        showSuccessModal(user.displayName || user.email);
        
        setTimeout(() => {
            window.location.replace('dashboard.html');
        }, 2000);
    } else {
        console.log("❌ No user logged in - showing auth forms");
        document.getElementById('authContainer').style.display = 'block';
    }
});

// ==========================================
// TAB SWITCHING
// ==========================================
window.switchTab = function(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const tabIndicator = document.getElementById('tabIndicator');
    
    hideError('loginError');
    hideError('registerError');
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        tabIndicator.style.transform = 'translateX(0)';
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        tabIndicator.style.transform = 'translateX(100%)';
    }
};

// ==========================================
// PASSWORD VISIBILITY TOGGLE
// ==========================================
window.togglePassword = function(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
};

// ==========================================
// REGISTER FORM - FIXED DATABASE STORAGE
// ==========================================
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get all form values
    const fullName = document.getElementById('registerName').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const branch = document.getElementById('registerBranch').value;
    const course = document.getElementById('registerCourse').value;
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    console.log("📝 Form Data Captured:");
    console.log("Name:", fullName);
    console.log("Phone:", phone);
    console.log("Branch:", branch);
    console.log("Course:", course);
    console.log("Email:", email);
    
    // Validation
    if (!fullName || !phone || !branch || !course || !email || !password) {
        showError('registerError', '⚠️ All fields are required!');
        return;
    }
    
    if (!agreeTerms) {
        showError('registerError', '⚠️ Please accept Terms & Conditions');
        return;
    }
    
    if (phone.length !== 10 || isNaN(phone)) {
        showError('registerError', '⚠️ Please enter a valid 10-digit phone number');
        return;
    }
    
    if (password.length < 6) {
        showError('registerError', '⚠️ Password must be at least 6 characters');
        return;
    }
    
    // Show loading
    const submitBtn = document.getElementById('registerBtn');
    submitBtn.classList.add('loading');
    hideError('registerError');
    
    try {
        console.log("🔐 Creating Firebase Auth account...");
        
        // 1. Create Firebase Authentication Account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("✅ Auth account created successfully");
        console.log("User UID:", user.uid);
        
        // 2. Update user profile
        await updateProfile(user, {
            displayName: fullName
        });
        
        console.log("✅ Profile updated with display name");
        
        // 3. Prepare user data object
        const userData = {
            uid: user.uid,
            fullName: fullName,
            email: email,
            phone: phone,
            branch: branch,
            course: course,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            accountStatus: 'active'
        };
        
        console.log("💾 Preparing to save to Firestore:");
        console.log(userData);
        
        // 4. Store in Firestore - FIXED VERSION
        const userDocRef = doc(db, 'students', user.uid);
        
        await setDoc(userDocRef, userData);
        
        console.log("✅ User data saved to Firestore successfully!");
        
        // 5. Verify data was saved
        const savedDoc = await getDoc(userDocRef);
        if (savedDoc.exists()) {
            console.log("✅ VERIFICATION: Data retrieved from Firestore:");
            console.log(savedDoc.data());
        } else {
            console.error("❌ VERIFICATION FAILED: Document does not exist!");
        }
        
        // 6. Trigger animation
        triggerMechanicalAnimation();
        
        // 7. Show success and redirect
        setTimeout(() => {
            showSuccessModal(fullName);
            
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
            
            setTimeout(() => {
                window.location.replace('dashboard.html');
            }, 2500);
        }, 3000);
        
    } catch (error) {
        submitBtn.classList.remove('loading');
        console.error("❌ Registration error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        let errorMessage = '❌ Registration failed. Please try again.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = '⚠️ This email is already registered. Please login.';
                break;
            case 'auth/invalid-email':
                errorMessage = '⚠️ Invalid email format.';
                break;
            case 'auth/weak-password':
                errorMessage = '⚠️ Password is too weak. Use at least 6 characters.';
                break;
            case 'auth/network-request-failed':
                errorMessage = '⚠️ Network error. Check your internet connection.';
                break;
            case 'permission-denied':
                errorMessage = '⚠️ Database permission denied. Please check Firestore rules.';
                break;
        }
        
        showError('registerError', errorMessage);
    }
});

// ==========================================
// LOGIN FORM - FIXED
// ==========================================
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showError('loginError', '⚠️ Please enter email and password');
        return;
    }
    
    const submitBtn = document.getElementById('loginBtn');
    submitBtn.classList.add('loading');
    hideError('loginError');
    
    try {
        console.log("🔐 Attempting login...");
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("✅ User logged in:", user.uid);
        
        // Update last login
        const userDocRef = doc(db, 'students', user.uid);
        await setDoc(userDocRef, {
            lastLogin: serverTimestamp()
        }, { merge: true });
        
        console.log("✅ Last login updated");
        
        // Trigger animation
        triggerMechanicalAnimation();
        
        setTimeout(() => {
            const userName = user.displayName || email;
            showSuccessModal(userName);
            
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
            
            setTimeout(() => {
                window.location.replace('dashboard.html');
            }, 2500);
        }, 3000);
        
    } catch (error) {
        submitBtn.classList.remove('loading');
        console.error("❌ Login error:", error);
        
        let errorMessage = '❌ Login failed. Please try again.';
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = '⚠️ No account found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = '⚠️ Incorrect password. Please try again.';
                break;
            case 'auth/invalid-email':
                errorMessage = '⚠️ Invalid email format.';
                break;
            case 'auth/too-many-requests':
                errorMessage = '⚠️ Too many failed attempts. Try again later.';
                break;
        }
        
        showError('loginError', errorMessage);
    }
});

// ==========================================
// GSAP ANIMATION
// ==========================================
function triggerMechanicalAnimation() {
    const animationOverlay = document.getElementById('mechanicalAnimation');
    animationOverlay.classList.add('show');
    
    const tl = gsap.timeline({
        onComplete: () => {
            animationOverlay.classList.remove('show');
        }
    });
    
    tl.to('#gear1', {
        rotation: 360,
        duration: 1,
        ease: 'power2.inOut',
        transformOrigin: '200px 150px'
    });
    
    tl.to('#gear2', {
        rotation: -360,
        duration: 1,
        ease: 'power2.inOut',
        transformOrigin: '350px 200px'
    }, '-=0.8');
    
    tl.to('#pulley1, #pulley2', {
        rotation: 720,
        duration: 1.2,
        ease: 'power1.inOut',
        stagger: 0.1
    }, '-=0.6');
    
    tl.to('#ball', {
        y: 300,
        duration: 0.8,
        ease: 'bounce.out'
    }, '-=0.5');
    
    tl.fromTo('#sprayCan', 
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
    
    tl.to('.particle', {
        opacity: 1,
        y: -50,
        x: 'random(-30, 30)',
        scale: 'random(1, 2)',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.2');
    
    tl.to('.particle', {
        opacity: 0,
        duration: 0.3
    });
    
    return tl;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function showSuccessModal(userName) {
    const modal = document.getElementById('successModal');
    const heading = modal.querySelector('h2');
    heading.textContent = `Welcome, ${userName}! 🎉`;
    modal.classList.add('show');
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    setTimeout(() => {
        hideError(elementId);
    }, 5000);
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.remove('show');
}

// ==========================================
// INITIAL ANIMATIONS
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    gsap.from('.logo-circle', {
        scale: 0,
        rotation: 360,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
    });
    
    gsap.from('.brand-name', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.tagline', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.auth-box', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.shape', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)'
    });
    
    gsap.from('.floating-icon', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power2.out'
    });
});

// ==========================================
// PHONE VALIDATION
// ==========================================
document.getElementById('registerPhone').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

// ==========================================
// PREVENT BACK NAVIGATION
// ==========================================
window.addEventListener('load', () => {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
});

console.log('%c🎓 Study Hub - Authentication System', 'font-size: 20px; color: #6c5ce7; font-weight: bold;');
console.log('%c✅ Firebase Connected', 'font-size: 14px; color: #00b894;');
console.log('%c🔒 Session Persistence Active', 'font-size: 14px; color: #fdcb6e;');
console.log('%c📊 Firestore Database Ready', 'font-size: 14px; color: #74b9ff;');