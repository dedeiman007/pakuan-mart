import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import helpers from "./helpers";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/scss/app.scss";
import LoginLayout from "./layouts/LoginLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;
Vue.component("login-layout", LoginLayout);
Vue.component("default-layout", DefaultLayout);
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

Object.keys(helpers).forEach((key) => {
  Vue.prototype[key] = helpers[key];
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
