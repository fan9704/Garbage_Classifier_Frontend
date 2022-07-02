importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
// import { precacheAndRoute } from "workbox-precaching";
let config = {
    apiKey: "AIzaSyAk7JJfK_omrrPwodG4eDBKBs_VgkfOUQ4",
    authDomain: "garbageclassifierapp.firebaseapp.com",
    projectId: "garbageclassifierapp",
    storageBucket: "garbageclassifierapp.appspot.com",
    messagingSenderId: "46587136702",
    appId: "1:46587136702:web:d824ff53ce105b830a2cef",
    measurementId: "G-322FYWH2NB",
    databaseURL: "https://garbageclassifierapp-default-rtdb.firebaseio.com",
};
firebase.initializeApp(config);
const messaging=firebase.messaging();

// 後端推播
messaging.onBackgroundMessage(function(payload) {
    let notification = payload.notification;
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    console.log("self...", self);
// Customize notification here
    const notificationTitle = `${notification.title}`;
    const notificationOptions = {
        body: `${notification.body}`,
        icon: "../src/assets/logo.png",
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

let self

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})
// self.__WB_MANIFEST is default injection point
// precacheAndRoute(self.__WB_MANIFEST)