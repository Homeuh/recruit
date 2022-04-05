import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';
// import { Message } from 'element-ui'

Vue.use(VueRouter)

//解决连续点击相同路由导致报错问题(不影响正常操作行为)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: "history",
    routes
})

router.beforeEach((to,from,next) => {
    if(to.path === "/login") {
        next();
    }
    next()
})

export default router


