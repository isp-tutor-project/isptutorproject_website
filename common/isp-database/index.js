import { LocalStorageDB } from "./localStorageDB";
import { FirestoreDB } from "./firestoreDB";

export function getDBConnection(dbType) {
    let db;
    switch(dbType) {
        case "firestore":
            db = new FirestoreDB();
            break;
        default:
            db = new LocalStorageDB();
    }
    return db; 
}
