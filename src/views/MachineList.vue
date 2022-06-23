<template>
  <v-container>
    <v-dialog v-model="progress">
      <v-card class="d-flex justify-center mb-6 progress">
        <v-card-text> Waiting for data </v-card-text>
        <v-progress-circular
          :size="70"
          :width="10"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-card>
    </v-dialog>
    <!--MachineInfoForm  -->
    <v-container v-show="MachineInfoForm" class="MachineInfoForm">
      <v-row
        ><h2>Edit Machine Information</h2>
        <v-btn class="closeButton" color="error" size="small" @click="MachineInfoForm = !MachineInfoForm" >X </v-btn></v-row
      >
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">Machine Location</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
          <v-text-field
            label="Machine Location"
            variant="outlined"
            v-model="MachineLocation"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">User Lock</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
          <v-text-field
            label="User Lock"
            variant="outlined"
            v-model="UserLock"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">Machine Lock</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
          <v-text-field
            label="Machine Lock"
            variant="outlined"
            v-model="MachineLock"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">Current User</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
          <v-text-field
            label="Current User"
            variant="outlined"
            v-model="CurrentUser"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">Picture</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
       <v-img   :src="machinePicture">
         <v-file-input
    label="File input"
    filled
    prepend-icon="mdi-camera"
    v-model="uploadPicture"
    @change="convertPicture"
  ></v-file-input>
       </v-img>
           <input multiple type="file" @change="fileChange">
    <button @click="upload">upload</button>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="4" class="d-flex mb-6 justify-space-around"><v-btn color="secondary" @click="CheckUserValid">Check User Valid</v-btn></v-col>
         <v-col cols="4" class="d-flex mb-6 justify-space-around"><v-btn color="warning" @click="unlinkMachine">Unlink Machine</v-btn></v-col>
        <v-col cols="4" class="d-flex mb-6 justify-space-around"><v-btn color="success" :disabled="MachineInfoBtn" @click="EditMachineInfo">Edit Machine Information</v-btn></v-col>
      </v-row>
    </v-container>
    <!--MachineInfoForm  -->
    <h2>Machine List</h2>
    <v-row>
      <v-col cols="6" xs="12" sm="12" md="12" lg="6" class="d-flex">
        <v-select :items="option" label="Option" outlined />
        <!-- <select
          name="type"
          id="type"
          v-model="select_option"
          @change="list_number"
        >
          <option value="All" selected disabled>Please Select Number</option>
          <option v-bind:value="opt" :key="opt" v-for="opt in option">
            {{ opt }}
          </option>
        </select> -->
      </v-col>
      <v-col cols="5" xs="12" sm="12" md="12" lg="5" class="d-flex">
        <v-text-field
          label="Machine Location"
          placeholder="Placeholder"
          v-model="CreateMachineLocation"
        ></v-text-field
      ></v-col>
      <v-col cols="1" xs="12" sm="12" md="12" lg="1" class="d-flex">
        <v-btn flat color="success" @click="createMachine"
          >Create <br> Machine</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" sm="4" md="2">ID</v-col>
      <v-col cols="2" sm="4" md="2"> Machine Location </v-col>
      <v-col cols="2" sm="4" md="2"> User Lock </v-col>
      <v-col cols="2" sm="4" md="2"> Machine Lock </v-col>
      <v-col cols="2" sm="4" md="2"> Current User </v-col>
      <v-col cols="2" sm="4" md="2"> Operation </v-col>
    </v-row>
    <v-row
      :key="index"
      v-for="(cert, index) in certs"
      class="certs-row"
      data-aos="flip-right"
    >
      <v-col cols="2" sm="4" md="2" lg="2" data-aos="flip-right">
        <!-- {{index + 1 + (page - 1) * select_option}} -->
        {{ cert.id }}
      </v-col>
      <v-col cols="2" sm="4" md="2" lg="2" data-aos="flip-right">
        {{ cert.location }}
      </v-col>
      <v-col cols="2" sm="4" md="2" lg="2" data-aos="flip-right">
        {{ cert.user_lock }}
      </v-col>
      <v-col cols="2" sm="4" md="2" lg="2">
        {{ cert.machine_lock }}
      </v-col>
      <v-col
        cols="2"
        sm="4"
        md="2"
        lg="2"
        data-aos="flip-right"
        justify="space-around"
      >
        <span v-if="cert.current_user != null">
          <span v-if="cert.current_user.userName == 'AnoymousUser'">
          <v-icon color="red darken-2" large> mdi-null </v-icon>
          No User
        </span>
          <span v-else> {{
          cert.current_user.userName
        }}
        </span></span>
         
                <span v-else><v-icon  color="red darken-2" large> mdi-null </v-icon>
          No User</span>
   
      </v-col>
      <v-col cols="2" sm="4" md="2" data-aos="flip-right">
        <v-btn flat color="warning" @click="showMachineForm(cert.id)"
          >Edit Info</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
  <!-- Pagination -->
  <div class="text-center">
    <v-pagination
      v-on:click="list_number"
      v-model="page"
      :length="this.datanumber / this.select_option"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
</template>
<script>
export default {
  name: "Machinelist",
  data() {
    return {
      certs: [],
      option: [20, 50, 100],
      select_option: 20,
      datanumber: 100,
      page: 1,
      progress: true,
      CreateMachineLocation: "",
      MachineInfoForm: false,
      MachineLocation: "",
      UserLock: "",
      MachineLock: "",
      CurrentUser: "",
      MachineInfoBtn:true,
      UserID:0,
      machinePicture:"",
      MachineID:"",
      uploadPicture:"",
      formData: new FormData()
    };
  },
  methods: {
    list_number() {
      let url = "/api/machines/";
      this.axios
        .get(url)
        .then((res) => {
          this.certs = res.data.slice(
            (this.page - 1) * this.select_option,
            this.page * this.select_option
          );
        })
        .catch((error) => console.log(error));
    },
    createMachine() {
      let url = "/api/machine";
      let config = {
        location: this.CreateMachineLocation,
        machine_lock: false,
        user_lock: false,
      };
      if (this.CreateMachineLocation != "") {
        this.axios.post(url, config).then((res) => {
          this.$swal.fire(
            "Create Machine Success!!",
            `${this.CreateMachineLocation} ~ `,
            "success"
          );
        });
      } else {
        this.$swal.fire(
          "Create Failed!!",
          `Please Enter Location Again `,
          "error"
        );
      }
    },
    showMachineForm(id) {
      let url = `/api/machine/${id}`;
      this.axios
        .get(url)
        .then((res) => {
          this.MachineInfoForm = !this.MachineInfoForm;
          console.log(res.data);
          this.MachineID=res.data.id;
          this.MachineLocation = res.data.location;
          this.UserLock = res.data.user_lock;
          this.MachineLock = res.data.machine_lock;
          this.CurrentUser = res.data.current_user.userName;
          this.machinePicture = res.data.machinePicture.binaryStream;
        })
        .catch((error) => console.log(error));
    },
    CheckUserValid(){
            let url = `/api/userinfo/${this.CurrentUser}`;
      this.axios
        .get(url)
        .then((res) => {
          console.log(res.data)
          this.UserID=res.data.id;
          if(res.data["userName"]==this.CurrentUser){
            this.$swal.fire(
            "User is valid!!",
            `${this.CurrentUser} ~ `,
            "success"
          );
          this.MachineInfoBtn=false;
          }
          
        })
        .catch((error) =>{
          console.log(error)
          this.$swal.fire(
          "User invalid!!",
          `${this.CurrentUser} Please Enter User Again `,
          "error"
        );
        } );
    },
    EditMachineInfo(){
        let url = `/api/machine/info/${this.MachineID}`;
        let config={
          current_user: this.CurrentUser,
          location: this.MachineLocation,
          machinePicture: {
            binaryStream: this.machinePicture
          },
          machine_lock: this.MachineLock,
          user_lock: this.UserLock
        }
        console.log(config)
        this.axios
          .patch(url,config)
          .then((res) => {
            this.MachineInfoForm = !this.MachineInfoForm;
            console.log(res.data);
            this.showAllMachine();
          })
          .catch((error) => console.log(error));
    },
    unlinkMachine(){
          let url = `/api/machine/unlink`;
        let config={
            current_user: 0,
            id: this.MachineID
        };
        console.log(config)
        this.axios
          .patch(url,config)
          .then((res) => {
            this.MachineInfoForm = !this.MachineInfoForm;
            console.log(res.data);  
            this.showAllMachine();
          })
          .catch((error) => console.log(error));
    },
    showAllMachine(){
      let url = "/api/machines/";
      this.axios
        .get(url)
        .then((res) => {
          this.datanumber = res.data.length;
          this.certs = res.data.splice(0, 0 + this.select_option);
          setTimeout(() => {
            this.progress = false;
          }, 1000);
        })
        .catch((error) => console.log(error));
      },
      convertPicture(){
        const file =this.uploadPicture.files[0];
        URL.createObjectURL(file)
      },
      fileChange(e) {
          for (var i = 0; i < e.target.files.length; i++) {
            this.formData.append('file', e.target.files[i]) //用迴圈抓出多少筆再append回來
          }
      },
      upload() {
        let config={
            "machinePicture": {
              "binaryStream": this.formData
            }
        }
          this.axios.patch(`/api/machine/picture/${this.MachineID}`,config 
          )
          .then((res)=>{console.log(res.data)})
          .catch((err)=>{console.log(err)})
      }
  },
  beforeMount() {
    this.showAllMachine();
  },
};
</script>
<style scoped>
select {
  padding: 0px 50px;
  width: 30%;
  background: #aaa;
}
option {
  background: #fff;
}
.progress {
  padding: 20px;
}

.certs-row {
  background: linear-gradient(rgb(255, 210, 151), rgb(248, 236, 169));
  border-radius: 5px;
  margin: 15px 0px;
}
.MachineInfoForm {
  border-radius: 10px;
  border: solid 3px rgb(243, 180, 64);
  /* background: linear-gradient(rgb(255, 255, 255), rgb(240, 196, 116)); */
  background-color: rgb(253, 252, 230);
  padding: 30px;
  position: absolute;
  z-index: 2;
}
.MachineInfoForm h2 {
  margin: 15px;
  width: 100%;
  text-align: center;
}
.MachineInfoForm .closeButton {
  position: absolute;
  right: 0;
  top: 0;
}
</style>