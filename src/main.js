import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import ru from "vuetify/es5/locale/ru";
import '@mdi/font/css/materialdesignicons.css'
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify({
    lang: {
      locales: {ru},
      current: "ru",
      defaultLocale: "ru",
    }
  }),
  render: (h) => h(App),
}).$mount("#app");
