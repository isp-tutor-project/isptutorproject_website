
// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyD7zIk-8V20QqJNSs0cAV0uNL3qjeqLMdM",
    authDomain: "isptutor.firebaseapp.com",
    projectId: "isptutor"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;