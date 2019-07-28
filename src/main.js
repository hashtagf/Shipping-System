// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import moment from "vue-moment";
import VueSweetalert2 from "vue-sweetalert2";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
import "material-icons/iconfont/material-icons.css";
import Vuesax from "vuesax";
import VueHtmlToPaper from "vue-html-to-paper";
import VueSession from "vue-session";
Vue.use(VueSession);

import "vuesax/dist/vuesax.css"; //Vuesax styles
Vue.use(Vuesax);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(moment);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};
Vue.use(VueHtmlToPaper, options);
