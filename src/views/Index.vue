<template>
  <v-container fluid>
    <h1>Welcome Intelligence Garbage System Application</h1>
    <v-fade-transition mode="out-in">
      <v-row>
  <v-carousel 
      height="600"
  :show-arrows="true">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
        
        <v-col cols="6" xs="12" sm="12" md="6" lg="6">
          <v-hover v-slot="{ hover }" open-delay="300">
            <v-card data-aos="zoom-in">
              <v-img
                :src="index1"
                :class="{ 'on-hover': hover }"
                height="450"
                class="grey darken-4"
                v-bind="props"
                cover
              ></v-img>
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="
                    d-flex
                    transition-fast-in-fast-out
                    orange
                    darken-2
                    v-card--reveal
                    text-h2
                    white--text
                  "
                  style="height: 100%"
                >
                  $3200
                </div>
              </v-expand-transition>
              <v-card-title class="text-h6">
                classify garbage correctly</v-card-title
              >
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="6" xs="12" sm="12" md="6" lg="6">
          <v-hover v-slot="{ hover }" open-delay="300">
            <v-card data-aos="zoom-in">
              <v-img
                :src="index2"
                :class="{ 'on-hover': hover }"
                height="450"
                class="grey darken-4"
                v-bind="props"
                cover
              ></v-img>
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="
                    d-flex
                    transition-fast-in-fast-out
                    orange
                    darken-2
                    v-card--reveal
                    text-h2
                    white--text
                  "
                  style="height: 100%"
                >
                  $8000
                </div>
              </v-expand-transition>
              <v-card-title class="text-h6">reduce labor cost </v-card-title>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
import index1 from "../assets/index1.png"
import index2 from "../assets/index2.png"
export default {
  data() {
    return {
      hover4: "",
      props4: "",
      index1,
      index2,
    items: [
 {
            src: index2,
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
    };
  },
  methods() {},
  computed: {
    getImageUrl(name) {
      console.log(`@/assets/${name}`);
      return new URL(`/@/assets/${name}.png`, import.meta.url).href;
    },
    getAssetsHomeFile(url) {
      const path = `@/assets/${url}`;
      const modules = import.meta.globEager("@/assets/*");
      return modules[path].default;
    },
  },
  name: "Index",
};
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.v-container {
  background: linear-gradient(orange, yellow);
  padding: 4%;
}
.v-carousel{
    margin:20px 0px;
}
</style>