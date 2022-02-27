import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/app.css'

Vue.config.productionTip = false

import {
    Button,
    Link,
    Input
} from 'element-ui'

Vue.use(Button)
Vue.use(Link)
Vue.use(Input)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
