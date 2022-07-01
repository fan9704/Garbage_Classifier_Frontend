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
      <h4>Tutorials List Firestore Version</h4>
      <v-row
          class="row-list"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
      >
        <v-col class="index" cols="2" md="2">{{index}}</v-col>
        <v-col cols="10" md="10">{{ tutorial.title }}</v-col>

      </v-row>
      <v-row>
        <v-col><v-btn  @click="removeAllTutorials">Remove All</v-btn></v-col>
      </v-row>
    </v-container>
  </v-form>
<!--  Form Data-->
  <v-form class="description-form">
    <v-container>
      <v-row v-if="currentTutorial">
        <v-col cols="12">
          <FirestoreForm
              :tutorial="currentTutorial"
              @refreshList="refreshList"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <p>Please click on a Tutorial...</p>
        </v-col>
      </v-row>
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
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      unsubscribe: null,
      tutorial: {
        title: "",
        description: "",
        published: false
      },
      submitted: false,
      message: ""
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
      console.log(this.tutorials)
    },
    refreshList() {
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
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
