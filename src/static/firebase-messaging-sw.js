import firebase from "firebase/app";

firebase.initializeApp({
    apiKey: "AIzaSyAk7JJfK_omrrPwodG4eDBKBs_VgkfOUQ4",
    authDomain: "garbageclassifierapp.firebaseapp.com",
    projectId: "garbageclassifierapp",
    storageBucket: "garbageclassifierapp.appspot.com",
    messagingSenderId: "46587136702",
    appId: "1:46587136702:web:d824ff53ce105b830a2cef",
    measurementId: "G-322FYWH2NB",
    databaseURL: "https://garbageclassifierapp-default-rtdb.firebaseio.com",
});
const messaging = firebase.messaging();

// Background Message Handler
messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    var notification = payload.notification;
    var notificationTitle = notification.title;
    var notificationOptions = {
        body: notification.body,
        icon: '/static/images/logo.png'
    };

    const promiseChain = clients
        .matchAll({
            type: 'window',
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(notify);
            }
        })
        .then(() => {
            return self.registration.showNotification(
                notificationTitle,
                notificationOptions
            );
        });
    return promiseChain;
});