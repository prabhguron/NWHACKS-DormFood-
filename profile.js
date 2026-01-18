// homePage.js - Load user profile and orders from Firebase
import { getUserData } from './firebase.js';
import { getFirestore, collection, onSnapshot, query, orderBy, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { firebaseConfig } from './firebaseConfig.js';

console.log('homePage.js loaded');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log('Firebase initialized');

// Wait for authentication to initialize
onAuthStateChanged(auth, (user) => {
  console.log('Auth state changed:', user);
  
  if (user) {
    // User is signed in
    console.log('User logged in:', user.uid);
    loadUserProfile(user);
    loadOrders();
  } else {
    // No user is signed in
    console.log('No user found, redirecting to login');
    alert('Please log in to view the feed');
    window.location.href = 'login.html?mode=login';
  }
});

// Load user profile
async function loadUserProfile(user) {
  console.log('Loading user profile for:', user.uid);
  
  if (!user) return;
  
  let result = await getUserData(user.uid);
  console.log('User data result:', result);
  
  // If user data doesn't exist, create it
  if (!result.success || result.error === "No user data found") {
    console.log('User data not found, creating...');
    
    // Prompt for name or use email
    const name = prompt('Please enter your name:', user.email.split('@')[0]);
    
    if (name) {
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        createdAt: new Date().toISOString()
      });
      
      // Reload user data
      result = await getUserData(user.uid);
      console.log('User data created:', result);
    }
  }
  
  if (result.success) {
    const userData = result.data;
    console.log('User data:', userData);
    
    // Get initials from name
    const initials = userData.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    console.log('Initials:', initials);
    
    // Update user widget
    const avatarEl = document.querySelector('.user-avatar');
    const nameEl = document.querySelector('.user-name');
    
    console.log('Avatar element:', avatarEl);
    console.log('Name element:', nameEl);
    
    if (avatarEl) avatarEl.textContent = initials;
    if (nameEl) nameEl.textContent = userData.name;
    
    console.log('Profile updated');
  } else {
    console.error('Failed to load user data:', result.error);
  }
}

// Load orders/runs from Firebase
function loadOrders() {
  console.log('Loading orders...');
  
  const ticketList = document.querySelector('.ticket-list');
  console.log('Ticket list element:', ticketList);
  
  // Query orders, ordered by creation time
  const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  
  onSnapshot(ordersQuery, (snapshot) => {
    console.log('Orders snapshot received, size:', snapshot.size);
    
    ticketList.innerHTML = '';
    
    if (snapshot.empty) {
      ticketList.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No active runs yet. Be the first to start one!</p>';
      return;
    }
    
    snapshot.forEach((doc) => {
      const order = doc.data();
      const orderId = doc.id;
      console.log('Processing order:', orderId, order);
      
      // Get initials from userName
      const initials = order.userName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      
      // Create ticket card
      const ticket = document.createElement('article');
      ticket.className = 'ticket';
      ticket.innerHTML = `
        <div class="ticket-left">
          <div class="avatar-circle">${initials}</div>
          <div class="runner-meta">
            <span class="runner-name">${order.userName}</span>
            <span class="group-tag">Dorm 4</span>
          </div>
        </div>
        
        <div class="ticket-split"></div>
        
        <div class="ticket-right">
          <div class="trip-info">
            <span class="label-small">I'm going to...</span>
            <h2 class="store-large">${order.store.toUpperCase()}</h2>
            <div class="meta-row">
              <span><i class="ph ph-clock"></i> ${order.eta}</span>
              <span><i class="ph ph-package"></i> ${order.capacity} Items Max</span>
            </div>
          </div>
          <div class="trip-action">
            <div class="slot-counter">${order.items?.length || 0}/${order.capacity} slots full</div>
            <button class="btn-request" data-order-id="${orderId}">Request</button>
          </div>
        </div>
      `;
      
      ticketList.appendChild(ticket);
    });
    
    console.log('Orders loaded, count:', snapshot.size);
    
    // Add event listeners to request buttons
    document.querySelectorAll('.btn-request').forEach(btn => {
      btn.addEventListener('click', function() {
        const orderId = this.getAttribute('data-order-id');
        handleRequest(orderId);
      });
    });
  });
}

// Handle request button click
function handleRequest(orderId) {
  console.log('Request clicked for order:', orderId);
  // Redirect to orders page or show modal to add item
  window.location.href = `orders.html?highlight=${orderId}`;
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tickets = document.querySelectorAll('.ticket');
    
    tickets.forEach(ticket => {
      const store = ticket.querySelector('.store-large').textContent.toLowerCase();
      if (store.includes(searchTerm)) {
        ticket.style.display = '';
      } else {
        ticket.style.display = 'none';
      }
    });
  });
}