import { LocalStorageDB } from "./localStorageDB";
import { FirestoreDB } from "./firestoreDB";

export function getDBConnection(dbType, classCode, userID) {
    let db;
    switch(dbType) {
        case "firestore":
            db = new FirestoreDB(classCode, userID);
            break;
        default:
            db = new LocalStorageDB(classCode, userID);
    }
    return db; 
}
