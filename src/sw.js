// import firebase from "firebase/app";
// import "firebase/messaging";
// import { precacheAndRoute } from "workbox-precaching";
// let config = {
//     apiKey: "AIzaSyAk7JJfK_omrrPwodG4eDBKBs_VgkfOUQ4",
//     authDomain: "garbageclassifierapp.firebaseapp.com",
//     projectId: "garbageclassifierapp",
//     storageBucket: "garbageclassifierapp.appspot.com",
//     messagingSenderId: "46587136702",
//     appId: "1:46587136702:web:d824ff53ce105b830a2cef",
//     measurementId: "G-322FYWH2NB",
//     databaseURL: "https://garbageclassifierapp-default-rtdb.firebaseio.com",
// };
// firebase.initializeApp(config);
// const messaging=firebase.messaging();
//
// messaging.onBackgroundMessage(function (payload) {
//     console.log(
//         "[firebase-messaging-sw.js] Received background message ",
//         payload
//     );
//     // Customize notification here
//     const notificationTitle = "Background Message Title";
//     const notificationOptions = {
//         body: "Background Message body.",
//         icon: "/firebase-logo.png",
//     };
//
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
//
//
// self.addEventListener("message", (event) => {
//     if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
// });
// // self.__WB_MANIFEST is default injection point src Version
// precacheAndRoute(self.__WB_MANIFEST);