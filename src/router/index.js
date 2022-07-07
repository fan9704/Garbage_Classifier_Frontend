import {createRouter, createWebHistory} from "vue-router";
import Index from "../views/Index.vue"
import Login from "../views/Login.vue"
import GraphView from "../views/Graph.vue"
import MachineList from "../views/MachineList.vue"
import Settings from "../views/Settings.vue"
import Wallet from "../views/Wallet.vue"
import MachineStorageList from "../views/MachineStorageList.vue"
import Firestore from "../components/Firestore.vue"
import RealtimeBase from "../components/RealtimeBase.vue"
const routes = [{
        path: "/",
        name: "index",
        component: Index,
    }, {
        path: "/account/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/machine/list",
        name: "MachineList",
        component: MachineList,
    },
    {
        path: "/account/setting",
        name: "Settings",
        component: Settings,
    },
    {
        path: "/storage/list",
        name: "MachineStorageList",
        component: MachineStorageList,
    },
    {
        path: "/account/wallet",
        name: "Wallet",
        component: Wallet,
    },
    {
        path: "/graph",
        name: "GraphView",
        component: GraphView,
    },
    {
        path: "/firestore",
        name: "Firestore",
        component: Firestore
    },
    {
        path: "/realtime",
        name: "RealtimeBase",
        component: RealtimeBase
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;