import { getDatabase, ref, set, onValue } from "firebase/database";

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
const db = getDatabase();
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    updateStarCount(postElement, data);
});
// const db = getDatabase();
// const db = firebase.ref("/tutorials");
// class TutorialDataService {
//     getAll() {
//         return db;
//     }
//     create(tutorial) {
//         return db.push(tutorial);
//     }
//     update(key, value) {
//         return db.child(key).update(value);
//     }
//     delete(key) {
//         return db.child(key).remove();
//     }
//     deleteAll() {
//         return db.remove();
//     }
// }
export default writeUserData;