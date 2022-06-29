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
      <h4>Tutorials List</h4>
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
  <v-form class="description-form">
    <v-container>
      <v-row v-if="currentTutorial">
        <v-col cols="12">
          <tutorial-details
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
import {tutorialDataService, tutorialDataService2} from "../services/TutorialDataService";
import TutorialDetails from "./Tutorial.vue";

export default {
  name: "TutorialList",
  components: { TutorialDetails },
  data() {
    return {
      tutorial: {
        title: "",
        description: "",
        published: false
      },
      submitted: false,
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1
    };
  },
  methods: {
    onDataChange(items) {
      let _tutorials = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _tutorials.push({
          key: key,
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
      this.currentIndex = index;
    },

    removeAllTutorials() {
      tutorialDataService2.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveTutorial() {
      const data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        published: false
      };

      tutorialDataService2.create(data)
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
    }
  },
  mounted() {
    tutorialDataService2.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    tutorialDataService2.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
.index{
  text-align: center;
}
.row-list{
  background: linear-gradient(#f6c258, #c4a70e);
  margin: 15px;
  border-radius: 5px;

}
.description-form{
  background: linear-gradient(#f6c258, #c4a70e);
  margin: 15px;
  border-radius: 5px;
}
</style>
