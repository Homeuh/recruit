import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icons/iconfont.css'
import "./assets/icons/iconfont.js"
import './assets/style/app.css'
import axios from './api/axios'
Vue.prototype.$axios = axios;

import $ from "jquery";
Vue.prototype.$ = $;

import {
    Button,
    Carousel,
    CarouselItem,
    DatePicker,
    Dialog,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Empty,
    Form,
    FormItem,
    InputNumber,
    Link,
    Message,
    Menu,
    MenuItem,
    Submenu,
    Select,
    Steps,
    Step,
    Switch,
    Option,
    Tag,
    Table,
    TableColumn,
    Timeline,
    TimelineItem,
    Upload,
    Radio,
    Rate,
    Pagination,
    PageHeader,
    Progress,
    Input,
} from 'element-ui'

Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Empty)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(InputNumber)
Vue.use(Link)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Select)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Switch)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(Rate)
Vue.use(Pagination)
Vue.use(PageHeader)
Vue.use(Progress)
Vue.use(Input)

Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
