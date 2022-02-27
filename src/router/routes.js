const common = [
    {
        path: "/login", name: "登录", component: () => import("../views/Login.vue")
    }
];

const general = [
    {
        path : "/", redirect: "/home"
    },
    {
        path: "/home", name: "首页", component: () => import("../views/general/Home.vue")
    },
    {
        path: "/profession", name: "职业", component: () => import("../views/general/Profession.vue")
    },
    {
        path: "/usersetting", name: "个人中心", component: () => import("../views/general/UserSetting.vue")
    }
];

const admin = [

];

const routes = [...common, ...general, ...admin];

export default routes;
