<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md6 offset-sm3 class="text-center">
        <v-text-field solo v-model="caption" label="Caption goes here">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md6 offset-sm3>
        <div>
          <div >
            <v-btn @click="click1">choose a photo</v-btn>
            <input type="file" ref="input1"
                   style="display: none"
                   @change="previewImage" accept="image/*" >
          </div>

          <div v-if="imageData!=null">
            <img class="preview" height="268" width="356" :src="img1">
            <br>
          </div>

        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"  class="text-center">
        <v-btn color="pink" @click="create">upload</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import {fireStorage,realtimeBase} from '../util/db';
export default {
  data () {
    return {
      caption : '',
      imageData:'',
      img1:null,
      uploadValue:'',

    }
  },
  methods: {
    create () {
      const post = {
        photo: this.img1,
        caption: this.caption
      }

      realtimeBase.ref('PhotoGallery').push(post)
          .then((response) => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      console.log(this.caption)
    },

    click1() {
      this.$refs.input1.click()
    },

    previewImage(event) {
      this.uploadValue=0;
      this.img1=null;
      this.imageData = event.target.files[0];
      this.onUpload()
    },

    onUpload(){
      this.img1=null;
      const storageRef=fireStorage.ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.img1 =url;
              console.log(this.img1)
            });
          }
      );
    },
  },
  name:"FireStorage"
}
</script>