import { STUDY3, Database } from "./database";

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

    getNextUserNum() {
        return this.store.collection("STUDY_3").doc("study_data").update({
            usernum: firebase.firestore.FieldValue.increment(1)
        }).then(() => this.store.collection("STUDY_3").doc("study_data").get())
        .then((doc) => {
            return doc.data().usernum;
        })
        .catch((error) => console.error(error));
    }

    // loginUser(classCode, userID) {
    //     let retVal;
    //     return this.store.collection("STUDY_3")
    //         .where("classCode", "==", classCode)
    //         .where("userID", "==", userID)
    //         .get()
    //         .then((snapshot) => {
    //             if (1 !== snapshot.size) {
    //                 return false;
    //             }
    //             this.userRef = snapshot.docs[0];
    //             return true;
    //         })
    // }

    loginUser(userID) {
        let docRef = this.store.collection("STUDY_3").doc(userID);
        return docRef.get()
        .then((doc) => {
            if (!doc.exists) {
                return false;
            } else {
                this.userRef = docRef;
                return this.getUserData()
            }
        });
    }

    lookupUserID(formData) {
        // returns userID (truthy) or false
        return this.store.collection("STUDY_3")
            .where("classCode", "==", formData.classCode)
            .where("FN",        "==", formData.FN)
            .where("LN",        "==", formData.LN)
            .where("MON",       "==", formData.MON)
            .where("DAY",       "==", formData.DAY)
            .get()
            .then((snapshot) => {
                // console.log(snapshot);
                if (1 !== snapshot.size) {
                    return false;
                } else {
                    console.log('record found');
                    let userID = false;
                    let data = snapshot.docs[0].data();
                    if (data.userID) {
                        userID = data.userID;
                    } else {
                        console.log("no userID field", data);
                    }
                    return userID;
                }
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    registerUser(formData) {
        let userID = false;
        console.log('registering user');
        return this.getNextUserNum()
        .then((userNum) => {
            // if even cond1 if odd cond2
            let conditionNum = (userNum % 2) + 1;
            let conditionStr = `${conditionNum}`;
            userID = `USER${userNum}_${conditionNum}`;
            let activityList = STUDY3.conditionActivities[conditionStr];
            let data = Object.assign(formData, {
                userID: userID,
                condition: conditionStr,
                assignments: JSON.stringify(activityList),
                completedAssignments: JSON.stringify([])
            })
            return this.store.collection("STUDY_3").doc(userID).set(data)
        })
        .then(() => {
            return userID;
        })
        .catch((error) => {
            console.error(error);
            return false;
        })
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