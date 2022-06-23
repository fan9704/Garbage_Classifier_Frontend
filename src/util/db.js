import firebase from "firebase/app";
import "firebase/database";

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

export default firebase.database();