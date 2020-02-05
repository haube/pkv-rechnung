import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueLogger from "vuejs-logger";
import * as moment from "moment";
import VueMoment from "vue-moment";
import "moment/locale/de";
import { dateService } from "@/util/DateService";

Vue.config.productionTip = false;

const isProduction = process.env.NODE_ENV === "production";

const options = {
  isEnabled: true,
  logLevel: isProduction ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true
};
Vue.use(VueLogger, options);

Vue.config.productionTip = false;

// Moment js in Vue einbinden und auf deutsch stellen
moment.locale("de");
console.log("main.ts", " moment.locale()", moment.locale()); // de
Vue.use(VueMoment, { moment });
Vue.prototype.$dateService = dateService;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.$log.info("main.ts finished");
