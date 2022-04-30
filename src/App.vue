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
              v-if="logincheck"
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
              v-if="!logincheck"
              prepend-icon="mdi-account"
              title="Login/Register"
              to="/account/login"
            ></v-list-item>
            <v-list-item
              v-if="logincheck"
              prepend-icon="mdi-logout"
              title="Logout"
              v-on:click="logout"
            ></v-list-item>
                     <v-list-item
              v-if="logincheck"
              prepend-icon="mdi-account"
              title="Account setting"
              to="/account/setting"
            ></v-list-item>
            <v-list-item
              v-if="logincheck"
              prepend-icon="mdi-cash-check"
              title="Manage Wallet"
              to="/account/wallet"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-refresh"
              title="Refresh"
              v-on:click="refresh"
            ></v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid class="main-container">
          <router-view></router-view
        ></v-container>
      </v-main>
    </v-layout>
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
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    username: "",
    drawer: false,
    group: null,
    logoutform: false,
  }),
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
      this.$swal.fire(
        "Logout Success!!",
        `GoodBye ${this.$store.state.user} ~ `,
        "success"
      );
    },
    refresh() {
      let sessionid = this.getCookie("sessionid");
      console.log(sessionid);
      this.axios
        .post("/api/accounts/login/")
        .then((res) => {
          console.log(res.data);
          if (res.data.User != null && res.data.User != undefined) {
            this.username = res.data.User;
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
};
</script>
<style scoped>
.v-footer {
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
