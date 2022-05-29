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
    <v-container v-show="MachineStorageInfoForm" class="MachineInfoForm">
      <v-row
        ><h2>Edit Machine Information</h2>
        <v-btn class="closeButton" color="error" size="small" @click="MachineStorageInfoForm= !MachineStorageInfoForm" >X </v-btn></v-row
      >
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">Machine Location</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
          <v-text-field
            label="Machine Location"
            variant="outlined"
            v-model="MachineLocation"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">Garbage Type</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
          <v-text-field
            label="Garbage Type"
            variant="outlined"
            v-model="UserLock"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">TimeStamp</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
          <v-text-field
            label="TimeStamp"
            variant="outlined"
            v-model="MachineLock"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" xs="3" sm="3" md="1" lg="1">Storage</v-col>
        <v-col cols="9" xs="9" sm="9" md="11" lg="11">
          <v-text-field
            label="Storage"
            variant="outlined"
            v-model="CurrentUser"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row >
         <v-col cols="12" class="d-flex mb-6 justify-space-around"><v-btn color="success" @click="updateMachineStorage(id)">Edit Machine Storage</v-btn></v-col>
      </v-row>
    </v-container>
    <!--MachineInfoForm  -->
    <h2>Machine List</h2>
    <v-row>
      <v-col cols="6" xs="12" sm="12" md="12" lg="6" class="d-flex">
        <v-select :items="option" label="Option" outlined />

      </v-col>
      <v-col cols="6" xs="12" sm="12" md="12" lg="6" class="d-flex">
                <select
          name="type"
          id="type"
          label="Search By Machine"
          v-model="SelectMachine"
          v-on:change="findByMachine"
        >
          <option value="All" selected disabled>Please Select Number</option>
          <option v-bind:value="opt" :key="opt" v-for="opt in MachineList">
            {{ opt }}
          </option>
        </select>
    <!-- <v-select :items="MachineList" label="Search By Machine" v-model="SelectMachine" v-on:change="findByMachine" outlined /> -->
    </v-col>

    </v-row>
    <v-row>
      <v-col cols="2" xs="4" sm="4" md="2">ID</v-col>
      <v-col cols="2" xs="4" sm="4" md="2"> Garbage Type </v-col>
      <v-col cols="2" xs="4" sm="4" md="2"> Time Stamp </v-col>
      <v-col cols="2" xs="4" sm="4" md="2"> Storage </v-col>
      <v-col cols="2" xs="4" sm="4" md="2"> Operation </v-col>
    </v-row>
    <v-row
      :key="index"
      v-for="(cert, index) in certs"
      class="certs-row"
      data-aos="flip-right"
    >
      <v-col cols="2" xs="4" sm="4" md="2" lg="2" data-aos="flip-right">
        {{ cert.id }}
      </v-col>

      <v-col cols="2" xs="4" sm="4" md="2" lg="2" data-aos="flip-right">
        {{ cert.garbageType.type_name }}
      </v-col>
      <v-col cols="2" xs="4" sm="4" md="2" lg="2">
        {{new Date(cert.time_stamp) }}
      </v-col>
      <v-col
        cols="2" xs="4"
        sm="4"
        md="2"
        lg="2"
        data-aos="flip-right"
        justify="space-around"
      >
        <span v-if="cert.storage <= 0.5">{{
          cert.storage*100+"%"
        }}</span>
        <span v-else>
          <v-icon color="red darken-2" large> mdi-null </v-icon>
          {{
          cert.storage*100+"%"
        }}
        </span>
      </v-col>
      <v-col cols="2" xs="4" sm="4" md="2" data-aos="flip-right">
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
  name: "MachineStorageList",
  data() {
    return {
      certs: [],
      option: [20, 50, 100],
      select_option: 20,
      datanumber: 100,
      page: 1,
      progress: true,
      CreateMachineLocation: "",
      MachineStorageInfoForm: false,
      MachineLocation: "",
      UserLock: "",
      MachineLock: "",
      CurrentUser: "",
      MachineInfoBtn:true,
      MachineList:["All"],
      SelectMachine:null,
      SelectMachineId:null,
      SelectGarbageTypeId:null
    };
  },
  methods: {
    list_number() {
      let url = "/api/machines_storage";
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
    findByMachine(){
          if(this.SelectMachine=="All"){
                let url = "/api/machines_storage";
                this.axios
                  .get(url)
                  .then((res) => {
                    this.datanumber = res.data.length;
                    this.certs = res.data.splice(0, 0 + this.select_option);
                  })
              .catch((error) => console.log(error));
          }else{
            let url = `/api/machines/location/?location=${this.SelectMachine}`;
            this.axios
            .get(url)
            .then((res) => {
              this.certs=[];
              for(let i in res.data[0].machineStorages){
                this.certs.push(res.data[0].machineStorages[i]);
              }
            })
            .catch((error) => console.log(error));
          }
    },
    showMachineForm(id) {
      let url = `/api/machine_storage/${id}`;
      this.axios
        .get(url)
        .then((res) => {
          this.MachineStorageInfoForm = !this.MachineStorageInfoForm;
          this.MachineLocation = res.data.machine.location;
          this.UserLock = res.data.garbageType.type_name;
          this.MachineLock = new Date(res.data.time_stamp);
          this.CurrentUser = res.data.storage;
          this.SelectGarbageTypeId=res.data.garbageType.id;
          this.SelectMachineId=res.data.machine.id;
          this.SelectStorage=res.data.id
        })
        .catch((error) => console.log(error));
    },
    updateMachineStorage(){
      let url=`/api/machine_storage`;
      let config={
        garbage_type: this.SelectGarbageTypeId,
        machine_id: this.SelectMachineId,
        storage: this.CurrentUser
      };
      console.log(config)
      this.axios.patch(url,config)
      .then((res)=>{
        this.MachineStorageInfoForm= false;
        this.$swal.fire( 'Update Storage Success!!',`Storage Reach To ${this.CurrentUser} ~ `,'success');
        this.listAllRecord();
      })
      .catch((err)=>console.log(err))
    },
    listAllRecord(){
          let url = "/api/machines_storage";
    this.axios
      .get(url)
      .then((res) => {
        this.datanumber = res.data.length;
        this.certs = res.data.splice(0, 0 + this.select_option);
        setTimeout(() => {
          this.progress = false;
        }, 1000);
        for(let i in this.certs){
          if(! this.MachineList.includes(this.certs[i].machine.location)){
            this.MachineList.push(this.certs[i].machine.location)
          }
        }
      })
      .catch((error) => console.log(error));
    }
  },
  beforeMount() {
    let    url = "/api/machines";
    this.axios
      .get(url)
      .then((res) => {
        for(let i in res.data){
          if(! this.MachineList.includes(res.data[i].location)){
            this.MachineList.push(res.data[i].location)
          }
        }
      })
      .catch((error) => console.log(error));
     url = "/api/machines_storage";
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
  width: 100%;
  background: rgb(184, 175, 175);
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