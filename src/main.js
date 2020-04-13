import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./util/http";
import EventBus from "./plugins/event-bus";

/** versão do sistema */
Vue.prototype.$systemVersion = require("../package.json").version;

Vue.config.productionTip = false;

window.http = http;

Vue.use(EventBus);

require("./assets-loader");
require("./util/interceptor");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
