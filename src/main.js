import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ElementUI from "element-ui"; //element-ui的全部组件
import "element-ui/lib/theme-chalk/index.css"; //element-ui的css
import "highlight.js/styles/atom-one-dark.css";
Vue.use(VueSwiper);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
