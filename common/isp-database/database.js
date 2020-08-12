
export const STUDY3 = {
    conditionActivities: {
        1: [
            "matsPreTest",
            "diPreTest",
            "reSelectBL",
            "hypoWEoneDir",
            "diInstrGR",
            "diCrystalGrowthTest",
            "diPostTest",
            "matsPostTest"
        ],
        2: [
            "matsPreTest",
            "diPreTest",
            "reSelectBL",
            "hypoWEbiDir",
            "diInstrGR",
            "diCrystalGrowthTest",
            "diPostTest",
            "matsPostTest"
        ]
    }
};

// abstract class - interface
export class Database {
    constructor(dbType) {
        this.dbType = dbType;
    }


    }

    setCredentials(classCode, userID) {
        this.classCode = classCode;
        this.userID = userID;
    }

    getUserData() {

    }

    getActivityData(activityKey, decodeJSON = true) {

    }

    setActivityData(activityKey, object) {

    }

    getRQData() {

    }

    getCurrHypoTask() {

    }

    getInitialHypoData() {

    }

    getFinalHypoData() {

    }

    saveValue(varName, value) {

    }

    saveJSONValue(varName, object) {

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


