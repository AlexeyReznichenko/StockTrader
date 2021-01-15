import Vue from "vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import App from "./App.vue";

import { routes } from "./routes";
import { store } from "./store/store";

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.root =
  "https://stock-trader-6d6ae-default-rtdb.firebaseio.com/data.json";

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
