import renderCurRoute from '../utils/renderCurRoute.js'

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
        path: "/home", name: "首页", component: () => import("../views/general/Home.vue"),
    },
    {
        path: "/profession", name: "职位", component: renderCurRoute(() => import("../views/general/Profession.vue")),
        children: [
            {
                path: "detail", name: "职位详情", component: () => import("@/views/general/ProfessionDetail.vue")
            }
        ]
    },
    {
        path: "/company", name: "公司", component: renderCurRoute(() => import("../views/general/Company.vue")),
        children: [
            {
                path: "job", name: "在招职位", component: () => import("../views/general/CompanyJob.vue")
            },
            {
                path: "evaluation", name: "面试评价", component: () => import("../views/general/CompanyEvaluation.vue")
            }
        ]
    },
    {
        path: "/usersetting", name: "个人中心", component: () => import("../views/general/UserSetting.vue")
    }
];

const admin = [

];

const routes = [...common, ...general, ...admin];

export default routes;
