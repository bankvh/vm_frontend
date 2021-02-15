import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import VendingMachine from "@/views/VendingMachine.vue";

import Admin from "@/views/Admin.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/location/:location",
    name: "VendingMachine",
    component: VendingMachine,
    props: true,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;