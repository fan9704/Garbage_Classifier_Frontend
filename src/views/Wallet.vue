<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h2 class="h2">Manage Wallet</h2>
        <v-alert shaped prominent type="error" v-show="edit_error">
          Wallet Value Not Found
        </v-alert>
        <v-alert shaped outlined type="success" v-show="edit_success">
          Edit Your Profile Success
        </v-alert></v-col
      >
    </v-row>

    <v-row>
      <v-col cols="12" md="8" data-aos="fade-right">
        <v-text-field
          v-model="username"
          label="Username"
          disabled
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row
      justify="center"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      <v-col cols="12" md="8">
        <v-parallax dark :src="wallet">
          <h1 class="font-weight-thin mb-4 walletValue">${{ walletValue }}</h1>
        </v-parallax></v-col
      >
    </v-row>
  </v-container>
</template>
<script>
import wallet from "../assets/wallet.png"
export default {
  name: "Wallet",
  data() {
    return {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      confirm_password: "",
      checkbox: false, //Agree or notX
      edit_success: false,
      edit_error: false,
      walletValue: 0.0,
      wallet
    };
  },
  methods: {
    edit() {
      if (this.password !== this.confirm_password) {
        this.edit_success = false;
        this.edit_error = true;
      } else {
        let url = "/api/accounts/profile/";
        let config = {
          username: this.username,
          password: this.password,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
        };
        this.axios
          .put(url, config)
          .then((res) => {
            console.log(res.data);
            if (res.data.edit == true) {
              this.edit_success = true;
              this.edit_error = false;
            } else {
              this.edit_success = false;
              this.edit_error = true;
            }
          })
          .catch((error) => console.log(error));
      }
    },
    reset() {
      this.edit_success = false;
      this.edit_error = false;
      this.password = "";
      this.confirm_password = "";
      let url = "/api/accounts/profile/";
      this.axios
        .get(url)
        .then((res) => {
          this.username = res.data.username;
          this.first_name = res.data.first_name;
          this.last_name = res.data.last_name;
          this.email = res.data.email;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    let url = "/api/checkLogin";
    this.axios
      .get(url)
      .then((res) => {
        this.$store.state.user = res.data.userName;
        this.username = res.data.userName;
        this.$store.commit("login");
        url = `/api/walletValue/${this.$store.state.user}`;
        this.axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            this.walletValue = res.data;
          })
          .catch((error) => {
            console.log(error)
            this.edit_error=true;
            });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
h2.h2 {
  margin-bottom: 15px;
}
.v-alert {
  margin: 10px 0px;
}
.walletValue {
  vertical-align: middle;
  font-size: 72px;
  color: white;
  padding: auto;
  margin: auto;
  text-align: center;
  position: relative;
  top: 50%;
}
</style>