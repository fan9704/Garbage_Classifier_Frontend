import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/auth";
import axios from "axios";

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


const firestore =firebase.firestore();
const realtimeBase=firebase.database();
const messaging=firebase.messaging();
const GitHubAuth = new firebase.auth.GithubAuthProvider();
const firebaseAuth=firebase.auth()

export { GitHubAuth,firebaseAuth,firestore,realtimeBase,messaging };

messaging.getToken({ vapidKey: `${import.meta.env.VITE_VAPID_KEY}` })
    .then(async (currentToken) => {
        if (currentToken) {
            const config = {
                headers: {
                    Authorization: "key=" + `${import.meta.env.VITE_SERVER_KEY}`,
                },
            };

            const url = `${import.meta.env.VITE_FCM_URL}`;

            const data = {
                notification: {
                    title: "PUSH NOTIFICATION FROM POST API",
                    body: "push notification",
                    icon: "firebase-logo.png",
                    click_action:
                        `${import.meta.env.MODE}` === "production"
                            ? `${import.meta.env.VITE_DOMAIN_URL}`
                            : "http://localhost:3000/",
                },
                to: currentToken,
            };
            console.log("currentToken\n", currentToken,"\nConfig:\n",config,"\nURL:\n",url,"\nData:\n",data);
            await axios.post(url, data, config);
        } else {
            console.log("No registration token available");
        }
    })
    .catch((err) => {
        console.log("err", err);
    });