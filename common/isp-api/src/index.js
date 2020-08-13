import { getActivityConfiguration } from "@isptutorproject/activity-config";
import { getDBConnection } from "@isptutorproject/isp-database";


export class IspAPI {
    constructor() {
        this.activityConfig = getActivityConfiguration();
        this.db = getDBConnection(this.activityConfig.database, "study3");
        this.db.setCredentials(this.activityConfig.userID);
    }


    getUserID() {
        return this.activityConfig.userID;
    }

    getFeaturesString() {
        return this.activityConfig.activityFeatures.join(":")
    }

    getAppData(decodeJSON=false) {
        return this.db.getActivityData(this.activityConfig.activityKey, decodeJSON);
    }

    saveAppData(jsonData) {
        return this.db.setActivityData(this.activityConfig.activityKey, jsonData);
    }

    saveAppComplete() {
        return this.db.markActivityAsCompleted(this.activityConfig.activityID);
    }

    goHomePage() {
        top.location.href = this.activityConfig.homepage;
    }
}