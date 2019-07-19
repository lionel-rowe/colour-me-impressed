import Vue from "vue";
import App from "./app.vue";
import { router } from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faKey, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPencilAlt, faKey, faCheck);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
