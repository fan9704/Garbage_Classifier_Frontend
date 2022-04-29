<template>
  <v-container>
    <h2 class="h2">Account Setting</h2>
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
    <v-row>
      <v-col cols="12" md="8" data-aos="fade-right">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :counter="30"
          label="email"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" data-aos="fade-right">
        <v-text-field
          v-model="first_name"
          :rules="nameRules"
          :counter="30"
          label="first name"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" data-aos="fade-right">
        <v-text-field
          v-model="last_name"
          :rules="nameRules"
          :counter="30"
          label="last name"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row><v-col cols="12">
           <v-btn :disabled="valid" color="success" class="mr-4" @click="UpdateInfo">
      Update Information
    </v-btn> 
        </v-col></v-row>

    <v-row>
      <v-col cols="12" md="8" data-aos="fade-right">
        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          :rules="passwordRules"
          :counter="30"
          label="New Password"
          required
          hint="At least 8 characters"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" data-aos="fade-right">
        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="confirm_password"
          :rules="passwordRules"
          :counter="30"
          label="Confirm Password"
          required
          hint="At least 8 characters"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-checkbox  data-aos="fade-right"
      v-model="checkbox"
      :rules="[(v) => !!v || 'You must agree to continue!']"
      label="Remember Me?"
      required
    ></v-checkbox>

    <v-btn color="warning" class="mr-4" to="/"> Back to Index </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Password</v-btn>
    <v-btn :disabled="valid" color="success" class="mr-4" @click="UpdatePassword">
      Update Password
    </v-btn>
  </v-container>
</template>
<script>
export default {
  name: "Setting",
  data() {
    return {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      confirm_password: "",
      nameRules: [
        (v) => !!v || "Userame is required",
        (v) => v.length <= 30 || "Userame must be less than 30 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length <= 30 || "Password must be less than 30 characters",
        (v) => v == this.confirm_password,
      ],
      checkbox: false, //Agree or notX
      edit_success: false,
      edit_error: false,
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
      this.password='';
      this.confirm_password='';
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
    UpdateInfo(){

    },
    UpdatePassword(){
        let config={
            username:this.username,
            password:this.password
        };
        let url="/api/changePassword";
        this.axios.put(url,config)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    }
  },
  beforeMount() {
    let url = `/api/userinfo/${this.$store.state.user}`;
    this.axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        this.username = res.data.userName;
        this.first_name = res.data.name;
        this.last_name = res.data.lastName;
        this.email = res.data.email;
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
</style>