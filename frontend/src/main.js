import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from 'socket.io-client';

Vue.config.productionTip = false;

const socket = io("http://localhost:5000/")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
