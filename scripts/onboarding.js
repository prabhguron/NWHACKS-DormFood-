// onboarding.js

// 1. IMPORT FIREBASE MODULES
// TODO (Teammate): Import your initialized app/auth/db here
// import { auth, db } from './firebaseConfig.js'; 
// import { doc, getDoc } from "firebase/firestore"; 
// import { onAuthStateChanged } from "firebase/auth";

// DOM ELEMENTS
const loadingOverlay = document.getElementById('loading-overlay');
const onboardingContent = document.getElementById('onboarding-content');
const btnJoin = document.getElementById('btn-join-group');
const btnCreate = document.getElementById('btn-create-group');

/* =========================================
   MAIN LOGIC FLOW
   ========================================= */
/*
function init() {
    // TODO (Teammate): Wrap this in onAuthStateChanged(auth, user => { ... })
    
    // MOCK USER FOR TESTING (Remove this when connecting Firebase)
    const mockUser = { uid: "12345", isLoggedIn: true };

    if (mockUser.isLoggedIn) {
        checkUserGroupStatus(mockUser.uid);
    } else {
        // User not logged in? Send back to index
        window.location.href = 'index.html';
    }
}

async function checkUserGroupStatus(uid) {
    try {
        // TODO (Teammate): Query Firestore for the user's profile
        // const userRef = doc(db, "users", uid);
        // const userSnap = await getDoc(userRef);
        
        // MOCK DATA (Replace with: const userData = userSnap.data();)
        const userData = {
            name: "Rodrigo",
            groupId: null // CHANGE THIS TO "dorm_123" TO TEST THE REDIRECT
        };

        // === THE DECISION LOGIC ===
        
        if (userData.groupId) {
            // CASE A: USER HAS A GROUP
            console.log("User is already in a group. Redirecting...");
            
            // Approach: Redirect immediately to Dashboard
            window.location.href = 'dashboard.html';
            
        } else {
            // CASE B: USER HAS NO GROUP
            console.log("No group found. Showing Onboarding Menu.");
            
            // 1. Remove Loader
            loadingOverlay.style.display = 'none';
            
            // 2. Reveal the Menu
            onboardingContent.classList.remove('hidden');
        }

    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("System Error: Could not verify account.");
    }
}

/* =========================================
   BUTTON HANDLERS
   ========================================= */

btnJoin.addEventListener('click', () => {
    // TODO (Teammate): Logic to open "Join Group" Modal or redirect to join.html
    console.log("Clicked Join");
});

btnCreate.addEventListener('click', () => {
    // TODO (Teammate): Logic to open "Create Group" Modal or redirect to create.html
    console.log("Clicked Create");
});

// Run the script
init();