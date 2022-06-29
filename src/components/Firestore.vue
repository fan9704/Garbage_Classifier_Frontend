<template>
  <v-form >
    <v-container>
      <v-row>
        <v-col
            cols="12"
            md="5"
        >
          <v-text-field
              v-model="tutorial.title"
              label="Title"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="5"
        >
          <v-text-field
              v-model="tutorial.description"
              label="Description"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="2">
          <v-btn v-if="!submitted"  @click="saveTutorial" class="btn btn-success">
            Submit
          </v-btn>
          <v-btn v-else class="btn btn-success" @click="newTutorial">
            Add
            <h4>You submitted successfully!</h4>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <!--  List Data-->
  <v-form>
    <v-container>
      <div class="list row">
        <div class="col-md-6">
          <h4>Tutorials List</h4>
          <ul class="list-group">
            <li
                class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(tutorial, index) in tutorials"
                :key="index"
                @click="setActiveTutorial(tutorial, index)"
            >
              {{ tutorial.title }}
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <div v-if="currentTutorial">
            <Firestore-Form
                :tutorial="currentTutorial"
                @refreshList="refreshList"
            />
          </div>
          <div v-else>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        </div>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import {tutorialDataService} from "../services/TutorialDataService";
import FirestoreForm from "./FirestoreForm.vue";
export default {
  name: "Firestore",
  components: { FirestoreForm },
  data() {
    return {
      tutorial: {
        title: "",
        description: "",
        published: false,
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        unsubscribe: null
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      let data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        published: false
      };
      tutorialDataService.create(data)
          .then(() => {
            console.log("Created new item successfully!");
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {
        title: "",
        description: "",
        published: false
      };
    },
    onDataChange(items) {
      let _tutorials = [];
      items.forEach((item) => {
        let id = item.id;
        let data = item.data();
        _tutorials.push({
          id: id,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });
      this.tutorials = _tutorials;
    },
    refreshList() {
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      console.log(this.currentTutorial)
      this.currentIndex = index;
    },
  },
  mounted() {
    this.unsubscribe = tutorialDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  },
  beforeDestroy() {
    this.unsubscribe();
  }
};
</script>

<style>

</style>
