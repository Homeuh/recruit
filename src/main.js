import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icons/iconfont.css'
import './assets/style/app.css'
import $ from "jquery";

Vue.prototype.$ = $;

Vue.config.productionTip = false

import {
    Button,
    Carousel,
    CarouselItem,
    Dialog,
    Divider,
    Form,
    FormItem,
    Link,
    Menu,
    MenuItem,
    Submenu,
    Rate,
    Pagination,
    Input,
} from 'element-ui'

Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Link)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Rate)
Vue.use(Pagination)
Vue.use(Input)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
