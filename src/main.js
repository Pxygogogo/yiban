import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element);
Vue.prototype.$axios = axios;
Vue.prototype.$axios = axios.create({
  // baseURL: 'https://notice-api.ngrok.nightingale.top',
  // baseURL: 'http://192.168.31.77:8080',
  // baseURL: 'http://172.20.10.6:8080',
  baseURL: 'http://www.pxygogogo.top:8080',
  timeout: 5000
});
FastClick.attach(document.body);
Vue.config.productionTip = false;
// Vue.use(Router)
new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    const {verify_request} = this._route.query;
    const access_token = sessionStorage.getItem('access_token');
    if (!verify_request && !access_token) {
      window.location.href = 'https://openapi.yiban.cn/oauth/authorize?client_id=363288cd45e5836f&redirect_uri=http://f.yiban.cn/iapp539438&state=STATE';
    }
  }

}).$mount('#app');
