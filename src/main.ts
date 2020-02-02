import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as moment from "moment";
import VueMoment from "vue-moment";
import "moment/locale/de";

Vue.config.productionTip = false;

// Moment js in Vue einbinden und auf deutsch stellen
moment.locale("de");
console.log("main.ts", " moment.locale()", moment.locale()); // de
Vue.use(VueMoment, { moment });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
