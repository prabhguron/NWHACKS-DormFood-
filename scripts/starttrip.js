addEventListener('startTripBtn', startTrip);

function startTrip() {
    const storeInput = document.getElementById('storeInput');
    const etaInput = document.getElementById('etaInput');
    const limitInput = document.getElementById('limitInput');

    if (!storeInput || !etaInput || !limitInput) {
        alert('Missing input elements in HTML.');
        return;
    }

    const user = firebase.auth().currentUser;
    if (!user) {
        alert('You must be logged in to start a trip.');
        return;
    }

    // 3. Prepare the data
    const tripData = {
        storeName: storeInput.value,
        eta: parseInt(etaInput.value),
        maxUsers: parseInt(limitInput.value),
        hostId: user.uid,
        status: 'active',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // 4. Find the database (using your safety check logic)
    const db = (typeof Db !== 'undefined') ? Db : (firebase && firebase.firestore ? firebase.firestore() : null);

    if (!db) {
        alert('Database not found.');
        return;
    }

    // 5. Upload to Firestore
    db.collection('trips').add(tripData)
        .then((docRef) => {
            alert('Trip started successfully!');
            console.log('Trip ID:', docRef.id);
            storeInput.value = '';
            etaInput.value = '';
            limitInput.value = '';
        })
        .catch((error) => {
            console.error('Error starting trip:', error);
            alert('Failed to start trip.');
        });
}