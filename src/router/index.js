import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue"
import Login from "../views/Login.vue"
import GraphView from "../views/Graph.vue"
import MachineList from "../views/MachineList.vue"
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
    //     {
    //         path: "/account/setting",
    //         name: "Settings",
    //         component: Settings,
    //     },
    //     {
    //         path: "/chat",
    //         name: "ChatroomView",
    //         component: ChatroomView,
    //     },
    //     {
    //         path: "/file",
    //         name: "FileConverterView",
    //         component: FileConverterView,
    //     },
    {
        path: "/graph",
        name: "GraphView",
        component: GraphView,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;