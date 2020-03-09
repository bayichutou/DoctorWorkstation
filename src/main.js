import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Print from "vue-print-nb";
import "./plugins/element.js";
import store from "./store";

Vue.config.productionTip = true;
Vue.use(Print);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
