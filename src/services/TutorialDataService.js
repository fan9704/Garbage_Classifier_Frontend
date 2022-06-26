import {realtimeBase,firestore} from "../util/db" ;

const db = realtimeBase.ref("/tutorials");
const db2=firestore.ref("/tutorials");
class TutorialDataService {
    getAll() {
        return db;
    }

    create(tutorial) {
        return db.push(tutorial);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}
const tutorialDataService =new TutorialDataService();
class TutorialDataService2 {
    getAll() {
        return db2;
    }

    create(tutorial) {
        return db2.push(tutorial);
    }

    update(key, value) {
        return db2.child(key).update(value);
    }

    delete(key) {
        return db2.child(key).remove();
    }

    deleteAll() {
        return db2.remove();
    }
}
const tutorialDataService2 =new TutorialDataService2();
export {tutorialDataService2,tutorialDataService};