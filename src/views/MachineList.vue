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
      <v-row>
        <v-col cols="1"></v-col>
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
        <v-text-field label="Machine Location" placeholder="Placeholder" v-model="CreateMachineLocation"></v-text-field
      ></v-col>
      <v-col cols="1"  xs="12" sm="12" md="12" lg="1" class="d-flex">
         <v-btn flat color="success" @click="createMachine">Create Machine</v-btn>
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
    <v-row :key="index" v-for="(cert, index) in certs" class="certs-row" data-aos="flip-right">
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
      <v-col cols="2" sm="4" md="2" lg="2" >
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
        <span v-if="cert.current_user != null">{{
          cert.current_user.userName
        }}</span>
        <span v-else>
          <v-icon color="red darken-2" large> mdi-null </v-icon>
          No User
        </span>
      </v-col>
      <v-col cols="2" sm="4" md="2" data-aos="flip-right">
        <v-btn flat color="warning" @click="showMachineForm(cert.id)">Edit Info</v-btn>
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
      CreateMachineLocation:"",
      MachineInfoForm:false,
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
    createMachine(){
      let url="/api/machine";
      let config={
        location: this.CreateMachineLocation,
        machine_lock: false,
        user_lock: false
      }
      if(this.CreateMachineLocation!=""){
        this.axios.post(url,config)
        .then((res)=>{
          this.$swal.fire(  'Create Machine Success!!',`${this.CreateMachineLocation} ~ `,'success');
        })
      }else{
        this.$swal.fire(  'Create Failed!!',`Please Enter Location Again `,'error');
      }
    },
    showMachineForm(id){
      let url = `/api/machine/${id}`;
      this.axios
        .get(url)
        .then((res) => {
          this.MachineInfoForm= !this.MachineInfoForm;
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  },
  beforeMount() {
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
</style>