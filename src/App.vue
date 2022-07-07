<template>
  <v-app>
    <v-layout style="overflow: hidden">
      <v-app-bar absolute color="warning">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-white"
          >Intelligence Garbage System</v-toolbar-title
        >
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="warning--text text--accent-4"
          >
            <v-list-item
              prepend-icon="mdi-home"
              title="Home"
              to="/"
            ></v-list-item>
            <v-list-item
              v-if="Drawer"
              prepend-icon="mdi-account"
              title="Account setting"
              to="/account/setting"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-washing-machine"
              title="Machine List"
              to="/machine/list"
            >
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-clipboard-list-outline"
              title="Machine Storage List"
              to="/storage/list"
            >
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-graph"
              title="Graph"
              to="/graph"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-database"
              title="Firestore"
              to="/firestore"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-database"
              title="RealtimeBase"
              to="/realtime"
            ></v-list-item>
            
            <v-list-item
              v-if="!Drawer"
              prepend-icon="mdi-account"
              title="Login/Register"
              to="/account/login"
            ></v-list-item>
            <v-list-item
              v-if="Drawer"
              prepend-icon="mdi-logout"
              title="Logout"
              v-on:click="logout"
            ></v-list-item>
                     <v-list-item
              v-if="Drawer"
              prepend-icon="mdi-account"
              title="Account setting"
              to="/account/setting"
            ></v-list-item>
            <v-list-item
              v-if="Drawer"
              prepend-icon="mdi-cash-check"
              title="Manage Wallet"
              to="/account/wallet"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-refresh"
              title="Refresh"
              v-on:click="refresh"
            ></v-list-item>
            <v-list-item
                prepend-icon="mdi-download-box"
                title="Download App"
                id="download"
                @click="console.log('Download App')"
            ></v-list-item>
            <SendNotification></SendNotification>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid class="main-container">
          <router-view></router-view>

          <web-socket></web-socket>
        </v-container>
        
      </v-main>
         <v-footer app>
      <v-card
        elevation="0"
        rounded="0"
        width="100%"
        class="bg-warning text-center"
      >
        <v-card-text>
          <v-btn class="mx-4" icon="mdi-home" variant="plain" href="/"></v-btn>
          <v-btn
            class="mx-4"
            icon="mdi-email"
            variant="plain"
            mailto="cxz123499@gmail.com"
          ></v-btn>
          <v-btn class="mx-4" icon="mdi-calendar" variant="plain"></v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="text-white">
          {{ new Date().getFullYear() }} — <strong>IM Garbage System</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    </v-layout>

  </v-app>
</template>

<script>
import WebSocket from "./components/WebSocket.vue";
import { reactive, onMounted } from "vue";
import { provide } from 'vue';
import { messaging } from './util/db';
import SendNotification from "./components/SendNotificationComponent.vue";
//const messagingInject = inject("messaging");
const notification = reactive({
  title: '',
  body: ''
})
messaging.onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  notification.title = payload.notification.title
  notification.body = payload.notification.body
});

export default {
    name: "App",
    data: () => ({
        username: "",
        drawer: false,
        group: null,
        logoutform: false,
        Drawer: false
    }),
  //options api
    provide: {
      messaging: messaging
    },
    setup() {
         provide('messaging', messaging)
        const states = reactive({
            deferredPrompt: null,
        });
        onMounted(() => {
            window.addEventListener("beforeinstallprompt", e => {
                e.preventDefault();
                states.deferredPrompt = e;
            });
            window.addEventListener("appinstalled", () => {
                states.deferredPrompt = null;
            });
            document.querySelector("#download").addEventListener("click", () => {
                if (states.deferredPrompt) {
                    states.deferredPrompt.prompt();
                    states.deferredPrompt = null;
                }
            });
        });
    },
    methods: {
        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(";");
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        logout() {
            this.$store.commit("logout");
            this.$swal.fire("Logout Success!!", `GoodBye ${this.$store.state.user} ~ `, "success");
            this.Drawer = false;
            let url = "/api/logout";
            this.axios.get(url)
                .then((res) => { console.log(res.data); })
                .catch((err) => { console.log(err); });
        },
        refresh() {
            let sessionid = this.getCookie("sessionid");
            console.log(sessionid);
            this.axios
                .post("/api/accounts/login/")
                .then((res) => {
                if (res.data.userName != null && res.data.userName != undefined) {
                    this.username = res.data.userName;
                    this.$store.commit("login");
                }
            })
                .catch((err) => console.log(err));
        },
    },
    computed: {
        logincheck() {
            return this.$store.state.login;
        },
    },
    beforeCreate() {
        let url = "/api/checkLogin";
        this.axios.get(url)
            .then((res) => {
            this.$store.state.user = res.data.userName;
            this.$store.commit("login");
            this.Drawer = true;
        })
            .catch((err) => { console.log(err); });
    },
    mounted() {
      console.log("Firebase cloud messaging object",this.$messaging);
    },
    components: {
        WebSocket,
        SendNotification
      }
};
</script>
<style scoped>
.v-footer {
  position: relative;
  margin: 0;
  padding: 0;
}
v-toolbar-title {
  margin: 20px;
}
.logoutform {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #aaa;
}
.form-btn {
  margin: 20px;
}
.main-container {
  margin: 0;
  padding: 0;
}
</style>
