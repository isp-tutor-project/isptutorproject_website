import { Database } from "./database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7zIk-8V20QqJNSs0cAV0uNL3qjeqLMdM",
    authDomain: "isptutor.firebaseapp.com",
    projectId: "isptutor"
};

export class FirestoreDB extends Database {

    constructor() {
        super("firestore");
        firebase.initializeApp(firebaseConfig);
        this.store = firebase.firestore();
    }

    setCredentials(userID) {
        super.setCredentials(userID);
        this.userRef = this.store.collection("STUDY_3").doc(userID);
    }

    }

    getUserData() {
        // returns promise with 'doc' if it exists, false otherwise
        let userData = false;
        return this.userRef.get()
        .then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                userData = {
                    userID: data.userID,
                    condition: data.condition,
                    assignments: JSON.parse(data.assignments),
                    completedAssignments: JSON.parse(data.completedAssignments)
                }
            }
            return userData;
        });
    }

    markActivityAsCompleted(activityId) {
        // console.log(`markActivityAsCompleted(${activityId})`);
        return this.userRef.get()
        .then((doc) => {
            let data = doc.data();
            return JSON.parse(data.completedAssignments)
        })
        .then((completedAssignments) => {
            // console.log("BEFORE:", completedAssignments);
            if (!completedAssignments.includes(activityId)) {
                completedAssignments.push(activityId);
            }
            // console.log("AFTER", completedAssignments)
            return this.userRef.update({
                completedAssignments: JSON.stringify(completedAssignments)
            });
        });
    }

    getCurrHypoTask() {

    }

    getActivityData(activityKey, decodeJSON=true) {
        return this.userRef.get()
        .then((doc) => doc.data())
        .then((userData) => {
            console.log("userData", userData);
            if (!userData) {
                return null;
            }
            let data = userData[activityKey];
            if (!data) {
                return null;
            }
            if (data && decodeJSON) {
                return JSON.parse(data);
            } else {
                return data;
            }
        }).catch((error) => {
            console.error(error);
            return null;
        });
    }

    setActivityData(activityKey, state) {
        let activityState = JSON.stringify(state);
        return this.userRef.update({
            [activityKey]: activityState
        })
        .then(() => {
            console.log("app data saved successefully")
        }).catch((error) => {
            console.error(error);
        });
    }
    // getRQData() {
    //     return this.getAppData("rqted");
    // }


    // getInitialHypoData() {
    //     return this.getAppData("initialHypo")
    //     .then((strData))
    // }

    // getFinalHypoData() {
    //     return this.getAppData("finalHypo")
    // }

    setValues(object, overwrite=false) {
        // default to {merge: true} option for safety
        return this.userRef.set(object, {merge: !overwrite});       
    }

    updateValues(object) {
        return this.userRef.update(object);
    }

    deleteValue(varName) {
        return this.userRef.update({
            [varName]: firebase.firestore.FieldValue.delete()
        });
    }

    // saveJSONValue(varName, value) {
    //     return this.userRef.set({
    //         [varName]: JSON.stringify(value)
    //     });
    // }

    // getBoolValue(varName) {

    // }

    // getIntValue(varName) {

    // }   
    
    // getFloatValue(varName) {

    // }

    // getTextValue(varName) {

    // }

    // getJSONValue(varName) {

    // }
};