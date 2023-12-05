import { createApp } from "vue";
import { createPinia } from "pinia";
import InstantSearch from "vue-instantsearch/vue3/es";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import { axiosInterceptor } from "./networking/interceptor";
import { UserStore } from "./stores/userStore";
import vfmPlugin from "vue-final-modal";
import { initFacebookSdk } from "./stores/init-facebook";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import LitepieDatepicker from "litepie-datepicker-tw3";
import Gleap from "gleap";
import VueGtag from "vue-gtag";
Gleap.initialize(import.meta.env.VITE_GLEAP_KEY);

const app = createApp(App).use(VueGtag, {
  config: { id: "GTM-TVLSZTD" }
});
const options = {
  position: 'fixed',
  show: true,
  height: '3px'
}
app.use(createPinia());
app.use(router);
app.use(InstantSearch);
app.use(vfmPlugin);
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  },
});
app.use(LitepieDatepicker);

const userStore = UserStore();

app.config.globalProperties.userStore = userStore;

axiosInterceptor();

app.mount("#app");
