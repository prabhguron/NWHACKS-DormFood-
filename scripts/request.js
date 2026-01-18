function submitItemRequest() {
    const inputEl = document.getElementById('itemRequestInput');
    if (!inputEl) {
        console.error('No element with id itemRequestInput found.');
        alert('Input element not found.');
        return;
    }

    const items = inputEl.value;
    console.log('Item Request Submitted:', items);
    if (!items.trim()) {
        alert('Please enter an item request.');
        return;
    }

    const user = firebase.auth().currentUser;
    if (!user) {
        alert('You must be logged in to submit an item request.');
        return;
    }

    const userId = user.uid;
    const requestData = {
        userId: userId,
        items: items,
        timestamp: new Date().toISOString()
    };

    const firestore = (typeof Db !== 'undefined') ? Db : (typeof db !== 'undefined' ? db : (firebase && firebase.firestore ? firebase.firestore() : null));
    if (!firestore) {
        console.error('Firestore not initialized.');
        alert('Database not initialized.');
        return;
    }

    firestore.collection('itemRequests').add(requestData)
        .then(() => {
            alert('Item request submitted.');
            inputEl.value = '';
        })
        .catch((error) => {
            console.error('Error submitting item request:', error);
            alert('Failed to submit item request.');
        });
}