<template>
  <v-container class="Notify">
    <v-row>
      <v-col cols="12">
        <v-btn  @click="onSend" class="d-flex justify-end mb-6"> Send Notification From Background</v-btn>
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
.v-container .Notify{
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 3;
}
.v-container .Notify.v-row{
  position: relative;
  bottom: auto;
  right: auto;
}
</style>