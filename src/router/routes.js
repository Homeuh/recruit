import renderCurRoute from '../utils/renderCurRoute.js'

const common = [
    {
        path: "/login", name: "登录", component: () => import("../views/Login.vue")
    },
    {
        path: "/register", name: "企业注册", component: () => import("../views/Register.vue")
    }
];

const general = [
    {
        path : "/", redirect: "/home"
    },
    {
        path: "/home", name: "首页", component: () => import("../views/general/home/Home.vue"),
    },
    {
        path: "/profession", name: "职位", component: renderCurRoute(() => import("../views/general/profession/Profession.vue")),
        children: [
            {
                path: "detail", name: "职位详情", component: () => import("@/views/general/profession/ProfessionDetail.vue")
            },
            {
                path: "evaluation", name: "面试评价", component: () =>import("../views/general/profession/ProfessionEvaluation.vue")
            }
        ]
    },
    {
        path: "/company", name: "公司", component: renderCurRoute(() => import("../views/general/company/Company.vue")),
        children: [
            {
                path: "detail", name: "公司主页", component: () => import("../views/general/company/CompanyDetail.vue")
            },
            {
                path: "job", name: "在招职位", component: () => import("../views/general/company/CompanyJob.vue")
            },
            {
                path: "evaluation", name: "面试评价", component: () => import("../views/general/company/CompanyEvaluation.vue")
            }
        ]
    },
    {
        path: "/applicant", name: "求职者个人中心", component: renderCurRoute(() => import("../views/general/applicant/Applicant.vue")),
        children: [
            {
                path: "resume", name: "我的简历", component: () => import("../views/general/applicant/ApplicantResume.vue")
            },
            {
                path: "apply", name: "投递职位", component: () => import("../views/general/applicant/ApplicantApply.vue")
            },
            {
                path: "interview", name: "我的面试", component: () => import("../views/general/applicant/ApplicantInterview.vue")
            },
            {
                path: "collect", name: "职位收藏", component: () => import("../views/general/applicant/ApplicantCollect.vue")
            },
            {
                path: "message", name: "我的消息", component: () => import("../views/general/applicant/ApplicantMessage.vue")
            },
            {
                path: "setting", name: "账号设置", component: () => import("../views/general/applicant/ApplicantSetting.vue")
            },
        ]
    },
    {
        path: "/recruiter", name: "招聘官工作台", component: renderCurRoute(() => import("../views/general/recruiter/Recruiter.vue")),
        children: [
            {
                path: "post", name: "发布职位", component: () => import("../views/general/recruiter/PostJob.vue")
            },
            {
                path: "job", name: "职位管理", component: () => import("../views/general/recruiter/RecruiterJob.vue")
            },
            {
                path: "resume", name: "简历处理", component: () => import("../views/general/recruiter/RecruiterResume.vue")
            },
            {
                path: "interview", name: "面试相关", component: () => import("../views/general/recruiter/RecruiterInterview.vue")
            },
            {
                path: "message", name: "我的消息", component: () => import("../views/general/recruiter/RecruiterMessage.vue")
            },
            {
                path: "setting", name: "账号设置", component: () => import("../views/general/recruiter/RecruiterSetting.vue")
            },
        ]
    },
    {
        path: "/reload", name: "刷新当前路由", component: () => import("../components/ReloadCurRoute.vue")
    }
];

const admin = [

];

const routes = [...common, ...general, ...admin];

export default routes;
