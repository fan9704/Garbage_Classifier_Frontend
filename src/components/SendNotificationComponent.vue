<template>
  <v-container class="Notify justify-start mb-6">
    <v-row>
      <v-col >
        <v-btn  @click="onSend" >Send Notification</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { inject } from "vue";
import { messaging } from "../util/db";
const messagingInject = inject("messaging");
function onSend(){

  messaging.getToken({ vapidKey: `${import.meta.env.VITE_VAPID_KEY}` })
      .then((currentToken) => {
        if (currentToken) {
          console.log("currentToken", currentToken);
        } else {
          console.log("No registration token available");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  if ("serviceWorker" in navigator) {
    window.navigator.serviceWorker
        .register("/sw.js")
        .then(
            function (registration) {
              const title = 'SEND NOTIFICATION FROM CLICK EVENT'
              const body = 'send background message from click event'
              registration.showNotification(title, {body})
            },
            /*catch*/ function (error) {
              console.log("Service worker registration failed:", error);
            }
        );
  } else {
    console.log("Service workers are not supported.");
  }
}
</script>
<style>
/*.v-container .Notify{*/
/*  position: fixed;*/
/*  bottom: 0;*/
/*  right: 0;*/
/*}*/
/*.v-container .Notify.v-row{*/
/*  position: relative;*/
/*  bottom: auto;*/
/*  right: auto;*/
/*}*/
</style>