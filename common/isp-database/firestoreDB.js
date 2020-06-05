import { Database } from "./database";

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyD7zIk-8V20QqJNSs0cAV0uNL3qjeqLMdM",
    authDomain: "isptutor.firebaseapp.com",
    projectId: "isptutor"
};

export class FirestoreDB extends Database {

    constructor(classCode, userID) {
        super(classCode, userID);
        this.collectionID = classCode;
        this.userID = userID;

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.store = firebase.firestore();
        this.userRef = this.store.collection(this.collectionID).doc(this.userID);

    }

    getUserData() {
        // returns promise with 'doc' if it exists
        return this.userRef.get()
        .then((doc) => {
            if (doc.exists) {
                return doc.data;
            } else {
                return null;
            }
        });
    }

    getAppData(appDataKey) {
        return this.getUserData()
        .then((userData) => {
            return userData[appDataKey];
        });
    }

    getRQData() {
        return this.getAppData("rqted");
    }

    getCurrHypoTask() {

    }

    getInitialHypoData() {
        return this.getAppData("initialHypo")
        .then((strData))
    }

    getFinalHypoData() {
        return this.getAppData("finalHypo")
    }

    saveValue(varName, value) {
        return this.userRef.set({
            [varName]: value
        });       
    }

    saveJSONValue(varName, value) {
        return this.userRef.set({
            [varName]: JSON.stringify(value)
        });
    }

    getBoolValue(varName) {

    }

    getIntValue(varName) {

    }   
    
    getFloatValue(varName) {

    }

    getTextValue(varName) {

    }

    getJSONValue(varName) {

    }
};