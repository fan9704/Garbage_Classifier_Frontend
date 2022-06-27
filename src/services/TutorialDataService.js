import {realtimeBase,firestore} from "../util/db" ;

const db = realtimeBase.ref("/tutorials");
const db2=firestore.collection("/tutorials");
class TutorialDataService2 {
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
const tutorialDataService2 =new TutorialDataService2();
class TutorialDataService  {
    getAll() {
        return db2;
    }
    create(tutorial) {
        return db2.add(tutorial);
    }
    update(id, value) {
        return db2.doc(id).update(value);
    }
    delete(id) {
        return db2.doc(id).delete();
    }
}
const tutorialDataService =new TutorialDataService();
export {tutorialDataService2,tutorialDataService};