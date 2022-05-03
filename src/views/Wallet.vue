<template>
  <v-container>
    <h2 class="h2">Manage Wallet</h2>
    <v-alert shaped prominent type="error" v-show="edit_error">
      Username or Password mustn,t be empty
    </v-alert>
    <v-alert shaped outlined type="success" v-show="edit_success">
      Edit Your Profile Success
    </v-alert>
    <v-row>
      <v-col cols="12" md="8" data-aos="fade-right">
        <v-text-field
          v-model="username"
          :rules="nameRules"
          :counter="30"
          label="Username"
          disabled
          required
        ></v-text-field>
      </v-col>
    </v-row>
     <v-row justify="center"
       data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
    <v-img
    
      lazy-src="/src/assets/wallet.png"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <span class="WalletValue">Wallet Value: ${{walletValue}}</span>
        </div>
      </template>
    </v-img>
  </v-row>
  </v-container>
</template>
<script>
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
      walletValue:0.0,
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
  beforeMount() {
    let url = `/api/walletValue/${this.$store.state.user}`;
    this.axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        this.username=this.$store.state.user;
        this.walletValue=res.data;
      })
      .catch((error) => console.log(error));
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
.WalletValue{
  font-size: 50px;
  color: white;
}
</style>