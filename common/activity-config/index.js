export function getActivityConfiguration() {
    let currentActivity = JSON.parse(localStorage.getItem("currentActivity"));
    let activityConfig = {
        userID: localStorage.getItem("userID"),
        database: localStorage.getItem("database"),
        homepage: localStorage.getItem("homepage"),
        activityID: currentActivity.id,
        activityKey: currentActivity.key,
        activityFeatures: currentActivity.features.split(":").filter((item) => item !== "")
    };
    console.log(activityConfig);
    return activityConfig;
}