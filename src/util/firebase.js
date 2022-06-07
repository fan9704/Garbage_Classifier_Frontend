// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAk7JJfK_omrrPwodG4eDBKBs_VgkfOUQ4",
    authDomain: "garbageclassifierapp.firebaseapp.com",
    projectId: "garbageclassifierapp",
    storageBucket: "garbageclassifierapp.appspot.com",
    messagingSenderId: "46587136702",
    appId: "1:46587136702:web:d824ff53ce105b830a2cef",
    measurementId: "G-322FYWH2NB",
    databaseURL: "https://garbageclassifierapp-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);
// Vue.prototype.$messaging = null
// if (firebase.messaging.isSupported()) {
//     firebase.initializeApp(FCMconfig)
//         // Retrieve Firebase Messaging object, assign to Vue Object
//     Vue.prototype.$messaging = firebase.messaging()
//         // Add the public key generated from the Firebase console
//     Vue.prototype.$messaging.usePublicVapidKey(process.env.VAPID_KEY)
// }

// navigator.serviceWorker.register('/static/firebase-messaging-sw.js')
//     .then((registration) => {
//         Vue.prototype.$swRegistration = registration
//         Vue.prototype.$messaging.useServiceWorker(registration)
//     }).catch(err => {
//         console.log(err)
//     })
export default database;