<template>
  <v-container>
    <button @click="registerFCM">Register</button>
  </v-container>
</template>
<script>
import { inject } from 'vue'

export default {
  //options api
  inject: ['messaging'],
  mounted () {
    console.log('Firebase cloud messaging object', this.$messaging)
    this.initFCM();
  },
  //composition api
  setup() {
    const messaging = inject('messaging')

    console.log('Firebase cloud messaging object', messaging)
  },
  methods: {
    initFCM () {
      this.$messaging.onTokenRefresh(() => {
        this.$messaging.getToken().then((refreshedToken) => {
          console.log('Token refreshed.')
          this.setTokenSentToServer(false)
          this.sendTokenToServer(refreshedToken)
        })
      })
    },
    registerFCM () {
      this.$messaging.requestPermission().then(() => {
        console.log('Notification permission granted.')
        this.getToken()
      }).catch((err) => {
        console.log('Unable to get permission to notify.', err)
      })
    },
    getToken () {
      this.$messaging.getToken().then((currentToken) => {
        if (currentToken) {
          this.sendTokenToServer(currentToken)
        } else {
          console.log('No Instance ID token available. Request permission to generate one.')
          // Show permission UI.
          this.setTokenSentToServer(false)
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
        this.setTokenSentToServer(false)
      })
    },
    sendTokenToServer (token) {
      // TODO: Send Token To Your Server
    },
    setTokenSentToServer (type) {
      if (type) return
      // TODO: Delete Register Token From Your Server
    }
  }
}
</script>