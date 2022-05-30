<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <transition name="slide">
      <v-container v-show="isShow">
        <h2 class="h2">Login Account</h2>

        <v-dialog scrollable v-model="show_form">
          <transition name="slide">
            <v-card class="forget_card forget_card1" v-show="card_change">
              <v-card-title>
                <span class="text-h4">Forget Password</span>
              </v-card-title>
              <v-alert shaped prominent type="error" v-show="error_email">
                {{ error_email_msg }}
              </v-alert>
              <v-card-text>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="email"
                  required
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="primary"
                  width="49%"
                  @click="show_form = !show_form"
                  >Close</v-btn
                >
                <v-btn color="primary" width="49%" @click="send_email"
                  >Send Email</v-btn
                >
              </v-card-actions>
              <v-btn
                color="primary"
                @click="card_change = !card_change"
                icon="mdi-arrow-down-box"
              ></v-btn>
            </v-card>
          </transition>
          <transition name="slide">
            <v-card class="forget_card forget_card2" v-show="!card_change">
              <v-card-title>
                <span class="text-h4">Enter Authorize Code</span>
              </v-card-title>
              <v-alert shaped prominent type="error" v-show="error_code">
                Authorize Code Error
              </v-alert>
              <v-card-text>
                <v-text-field
                  v-model="captcha"
                  label="Authorize Code"
                  required
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="primary"
                  width="49%"
                  @click="show_form = !show_form"
                  >Close</v-btn
                >
                <v-btn color="primary" width="49%" @click="Authorize"
                  >Authorize</v-btn
                >
              </v-card-actions>
              <v-btn
                color="primary"
                @click="card_change = !card_change"
                icon="mdi-arrow-up-box"
              >
              </v-btn>
            </v-card>
          </transition>
        </v-dialog>

        <transition name="fade">
          <v-alert shaped prominent type="error" class="error" v-show="error">
            {{ error_msg }}
          </v-alert>
        </transition>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="30"
              label="Username"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="password"
              :rules="passwordRules"
              :counter="30"
              label="Password"
              required
              hint="At least 8 characters"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-checkbox
          v-model="save"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Remeber Me?"
          required
        ></v-checkbox>

        <v-btn color="warning" class="mr-4" v-on:click="slidetoggle">
          Haven,t account?Register
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset</v-btn>
        <v-btn color="primary" class="mr-4" @click="show_form = !show_form">
          Forget Password
        </v-btn>
        <v-btn

          color="success"
          class="mr-4"
          prepend-icon="mdi-login"
          @click="login"
        >
          Login
        </v-btn>
      </v-container>
    </transition>

    <!-- Register -->
    <transition name="slide">
      <v-container v-show="!isShow">
        <h2 class="h2">Register Account</h2>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="8">
            <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="30"
              label="Username"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="8">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="30"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="8">
            <v-text-field
              v-model="first_name"
              :rules="nameRules"
              :counter="30"
              label="first name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="8">
            <v-text-field
              v-model="last_name"
              :rules="nameRules"
              :counter="30"
              label="last name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="8">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="email"
              required
            ></v-text-field>
          </v-col>

        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="8">
                      <v-checkbox
            cols="12"
            xs="12"
            sm="12"
            md="8"
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree our policy?"
            required
          ></v-checkbox>
            </v-col>
        </v-row>
        <v-btn color="warning" class="mr-4" v-on:click="slidetoggle"
          >Go to Login</v-btn
        >

        <v-btn color="error" class="mr-4" @click="reset"> Reset</v-btn>
        <v-btn
          color="success"
          class="mr-4"
          @click="register"
        >
          Register
        </v-btn>
      </v-container>
    </transition>
  </v-form>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    error: false,
    error_msg: "",
    isShow: true,
    valid: true,
    username: "",
    password: "",
    first_name:'',
    last_name:'',
    nameRules: [
      (v) => !!v || "Username is required",
      (v) => v.length <= 30 || "Username must be less than 30 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length <= 30 || "Password must be less than 30 characters",
    ],
    save: false, //Agree or not,
    show_form: false,
    error_email: false,
    error_email_msg: "",
    card_change: true,
    captcha: "",
    error_code: false,
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    slidetoggle() {
      this.isShow = !this.isShow;
    },
    login() {
      if (this.username == "" || this.password == "") {
        this.error = true;
        this.error_msg = "Username or Password mustn't be empty";
        setInterval(() => (this.error = false), 2000); //same as CSS
      } else {
        let config = {
          username: this.username,
          password: this.password,
        };
        let url = "/api/login";
        this.axios
          .post(url, config)
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              this.$store.commit("login");
              this.$store.state.user = this.username;
              this.$swal.fire(  'Login Success!!',`Welcome ${this.username} ~ `,'success');
              this.$router.push({ name: "index" });
            } else {
              this.error = true;
              this.error_msg = "Login Failed Username Or Password Error";
              this.$swal.fire(  'Login Failed!!',`Please Login Again `,'error');
              setInterval(() => (this.error = false), 2000); //same as CSS
            }
          })
          .catch((error) => console.log(error));
      }
    },
    register() {
      let config = {
        active: true,
        email: this.email,
        lastName: this.first_name,
        name: this.last_name,
        password: this.password,
        userName: this.username
      };
      let url = "/api/register/";
      this.axios
        .post(url, config)
        .then((response) => {
          console.log(response.data);
          alert("register success");
          this.isShow= !this.isShow
        })
        .catch((error) => console.log(error));
    },
    send_email() {
      let config = {
        email: this.email,
      };
      let url = "/api/accounts/forget/";
      this.axios
        .post(url, config)
        .then((response) => {
          console.log(response.data);
          if (response.data.send) {
            this.error_email = false;
            this.card_change = false;
          } else {
            this.error_email = true;
            this.error_email_msg = "Have Send To Your Email or unvaild Email";
          }
        })
        .catch((error) => console.log(error));
    },
    Authorize() {
      let config = {
        email: this.email,
        captcha: this.captcha,
      };
      let url = "/api/accounts/forget/"; //TODO: update password
      this.axios
        .post(url, config)
        .then((response) => {
          console.log(response.data);
          if (response.data.send) {
            this.error_code = false;
          } else {
            this.error_code = true;
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
.v-container {
  margin-top: 5px;
}
.v-alert .error {
  width: 70%;
}
h2.h2 {
  margin-bottom: 15px;
}
.forget_card {
  /* position: absolute; */
  padding: 20px;
}
.forget_card1 {
  z-index: 1;
}
.forget_card2 {
  z-index: 2;
}
@media screen and (min-width: 960px) {
  .v-container {
    left: 10%;
    right: 10%;
    position: relative;
  }
}
@media screen and (max-width: 960px) {
  .v-form {
    margin-bottom: 200px;
  }
}
.v-form {
  position: relative;
  height: 90vh;
}
.v-container {
  position: absolute;
}
.slide-leave-active,
.slide-enter-active {
  transition: all 0.7s ease;
  transform: opacity;
}
.slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-enter-to {
  /* transform: translateY(-50%); */
  opacity: 1;
}
.slide-leave-from {
  /* transform: translateY(-50%); */
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 2s ease;
  transform: opacity;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>