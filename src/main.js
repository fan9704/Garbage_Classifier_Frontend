import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { createStore } from 'vuex';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {messaging} from "./util/db";
import { registerSW } from 'virtual:pwa-register'
registerSW({
    onNeedRefresh () {},
    onOfflineReady () {}
})()
loadFonts();
const store = createStore({
    state() {
        return {
            count: 0,
            login: false,
            user: '',
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        login(state) {
            state.login = true
            console.log(state.login)
        },
        logout(state) {
            state.login = false;
            console.log(state.login)
        }
    }
})
const app = createApp(App);
app.config.globalProperties.$messaging=messaging;
app.use(store);
app.use(router);
app.use(vuetify);
app.use(VueAxios, axios);
app.use(loadFonts);
app.use(AOS.init());
app.use(VueSweetalert2);
app.mount("#app");