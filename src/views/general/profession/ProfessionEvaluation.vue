<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <GeneralTopBar :showPosition="false"/>
    <main>
      <div class="evaluation-header">
        <div class="job-box margin-20per">
          <div class="job-description">
            <div class="job-name">
              <h1>{{ jobData.job_duty }}</h1>
              <span>{{ jobData.job_salary }}</span>
            </div>
            <div class="job-request">
              <template v-if="jobData.recruit_num">
                <span>招{{ jobData.recruit_num }}人</span>
                <el-divider direction="vertical"></el-divider>
              </template>
              <span>{{ jobData.job_year }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ jobData.education }}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ jobData.job_type }}</span>
            </div>
            <div class="job-tag"><span v-for="(tag,index) in jobData.job_tag" :key="tag + index">{{ tag }}</span></div>
            <div class="user-handle">
              <el-button class="job-collectN" icon="el-icon-star-off" @click="collect" v-if="!isCollect">收藏</el-button>
              <el-button class="job-collectY" icon="el-icon-star-on" @click="collect" v-else>已收藏</el-button>
              <el-button class="job-applyN" icon="el-icon-s-promotion" type="primary" @click="apply" v-if="!isApply">立即投递</el-button>
              <el-button class="job-applyY" icon="el-icon-s-promotion" type="primary" @click="apply" v-else>投递成功</el-button>
            </div>
            <div class="user-share">
              <span>分享</span>
              <span><i class="el-icon-weixin"></i></span>
            </div>
          </div>
        </div>
        <div class="job-tab margin-20per">
          <el-link href="/profession/detail" :class="{'is-active': $route.path === '/profession/detail'}">职位详情</el-link>
          <el-link href="/profession/evaluation" :class="{'is-active': $route.path === '/profession/evaluation'}">面试评价</el-link>
        </div>
      </div>
      <div class="evaluation-main margin-20per">
        <aside ref="aside">
          <div class="company-name">
            <el-link href="/company/detail">
              <img :src="company.company_logo" :alt="company.company_name" :title="company.company_name"
                   style="width: 100px; height: 100px; border-radius: 50%"/>
              <h2>{{ company.company_name }}</h2>
            </el-link>
          </div>
          <div class="company-info">
            <h3>基本信息</h3>
            <p>
              <i class="el-icon-caidan"></i>
              <span>{{ company.company_tag }}</span>
            </p>
            <p>
              <i class="el-icon-zhexiantu"></i>
              <span>{{ company.company_type }}</span>
            </p>
            <p>
              <i class="el-icon-tuanduiguimo"></i>
              <span>{{ company.company_size }}</span>
            </p>
            <p>
              <i class="el-icon-diqiu"></i>
              <span>{{ company.company_website }}</span>
            </p>
          </div>
          <div class="similar-position">
            <h3>相似职位</h3>
            <ul>
              <li v-for="(sim, index) in similarJob" :key="sim.company_name + index">
                <el-link class="sim-company-logo">
                  <img :src="sim.company_logo" :alt="sim.company_name" :title="sim.company_name"
                       style="width: 70px; height: 70px; border-radius: 8px"/>
                </el-link>
                <el-link class="sim-job-info" :title="sim.job_duty">
                  <span>{{ sim.job_duty }}</span>
                </el-link>
                <p class="sim-job-salary">{{ sim.job_salary }}</p>
                <div class="sim-company-info">
                  <el-link class="sim-job-company" :title="sim.company_name">{{ sim.company_name }}</el-link>
                  <span class="office-city">&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{{ sim.office_city }}</span>
                </div>
              </li>
            </ul>
            <el-link class="show-more">查看更多职位<i class="el-icon-arrow-right"></i></el-link>
          </div>
        </aside>
        <div class="evaluation-detail" ref="evaluation_detail">
          <InterviewEvaluation :dataList="evaluation" :isEvaluation="true"/>
        </div>
      </div>
    </main>
    <!-- 底部信息栏 -->
    <GeneralFooter />
  </div>
</template>

<script>
    import GeneralTopBar from "../../../components/GeneralTopBar";
    import GeneralFooter from "../../../components/GeneralFooter";
    import InterviewEvaluation from "../widgets/InterviewEvaluation.vue";
    import setMinHeight from "@/utils/setMinHeight";
    export default {
        name: "ProfessionEvaluation",
        components: { GeneralTopBar, GeneralFooter, InterviewEvaluation},
        mounted() {
            // 设置页面主内容最小高度
            setMinHeight(this, this.$refs.evaluation_detail);
        },
        data() {
            return {
                jobData: {
                    job_duty: "前端开发工程师",
                    job_salary: "10-15K",
                    recruit_num: 5,
                    job_year: "1-3年",
                    education: "本科",
                    job_type: "全职",
                    job_tag: ["JavaScript","Vue","React"],
                    job_benefit: "1、提供在行业中非常具有竞争力的薪水\n2、为员工提供齐全的五险一金\n3、逢年过节有过节福利（包括六一儿童节）\n4、项目奖金、绩效奖、年终奖、体检、多次旅游等\n5、不定期的员工活动\n6、一年有两次调薪机会，表现好会有升职机会",
                    job_description: "1、参与公司中小商户管理软件产品的设计与研发，打造领先的SaaS产品\n2、根据业务需求完成H5/小程序的前端交互开发\n3、持续优化SaaS产品的前端交互体验",
                    job_requirement: "1、1年及以上前端开发经验，有移动Web开发经验或者小程序开发经验\n2、有HybridApp开发经验，熟练使用Angular或Vue经验优先\n3、有大型APP的前端架构部署和实践经验优先4、有责任感，对前端技术有激情，喜欢钻研，能快速接受和掌握新技术",
                    office_address: "深圳南山区郎山路中同方信息港e栋",
                    create_date: "三天前发布",
                    recruiter_name: "王先生",
                    recruiter_avatar: require("@/image/avatar/recruiter_wang.png"),
                    recruiter_duty: "前端组长",
                },
                evaluation: [
                    {
                        applicant_avatar: require("@/image/avatar/applicant_xie.png"),
                        applicant_name: "谢女士",
                        evaluation_title: "面试很顺利，希望可以入职",
                        evaluation_description: "因为疫情，这次安排了视频面试。 HR很负责，前期沟通和面试对接都比较顺畅。 面试官有时间观念，是技术总监，准时上线面试，问的技术问题都在点上。 整体了解下来，是创业型公司，项目是我觉得可以做的，面试官也提到会有加班，我觉得比较诚恳。 希望有后续反馈",
                        score_description: 4,
                        score_recruiter: 4.5,
                        score_environment: 4.7,
                        useful_num: 32,
                        click_num: 0,
                        create_date: "2022-3-18"
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_wang.png"),
                        applicant_name: "王先生",
                        evaluation_title: "面试官很好，交流很顺畅",
                        evaluation_description: "面试过程还是很不错的，面试流程感觉也很好，但是感觉有点难度，感觉是没戏了。想进去要好好看面试题，笔试要手写代码。",
                        score_description: 4.8,
                        score_recruiter: 5,
                        score_environment: 4.8,
                        useful_num: 18,
                        click_num: 0,
                        create_date: "2022-3-15"
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_liu.png"),
                        applicant_name: "刘先生",
                        evaluation_title: "面试要求没有提前说明...",
                        evaluation_description: "面试前电话通知没说需要需要先做题，如果做题没通过是没有面试资格的，而且题目和岗位貌似没什么联系…………心疼自己浪费了一个早上",
                        score_description: 3,
                        score_recruiter: 3.5,
                        score_environment: 4,
                        useful_num: 2,
                        click_num: 0,
                        create_date: "2022-3-12"
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_tong.png"),
                        applicant_name: "童先生",
                        evaluation_title: "面试官是大牛",
                        evaluation_description: "面试官人还是不错的，做事风风火火，很有效率，也比较容易让人亲近。",
                        score_description: 4.5,
                        score_recruiter: 4.5,
                        score_environment: 4.5,
                        useful_num: 13,
                        click_num: 0,
                        create_date: "2022-3-9"
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_wei.png"),
                        applicant_name: "魏女士",
                        evaluation_title: "等的花儿都谢了",
                        evaluation_description: "面到最后说不招人了，无语。",
                        score_description: 1.3,
                        score_recruiter: 3.5,
                        score_environment: 4,
                        useful_num: 5,
                        click_num: 0,
                        create_date: "2022-3-7"
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_zou.png"),
                        applicant_name: "邹先生",
                        evaluation_title: "环境一般般",
                        evaluation_description: "环境一般般，面试的小房间没开空调，在里面做题闷死了。然后面试官主要问的基本都是些网页布局的问题，感觉就是招页面重构的。",
                        score_description: 2.5,
                        score_recruiter: 3.5,
                        score_environment: 3.5,
                        useful_num: 26,
                        click_num: 0,
                        create_date: "2022-3-5"
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_huang.png"),
                        applicant_name: "黄女士",
                        evaluation_title: "等结果心好累~~~",
                        evaluation_description: "一开始面试官带进去休息室那里面试，还问我要不要喝东西很nice。简单提问了简历上的问题和为什么会选择做设计，面试过程很轻松面试官也很nice叫我不用紧张说实习岗位要求也不需要太高，然后叫我回去做份笔试题，交题后大概一两天会收到结果。可是已经等了三天啦啊啊啊还没收到结果啊！真的很希望能加入贵公司，进不进得了希望能来个结果啊，谢谢！！",
                        score_description: 5,
                        score_recruiter: 5,
                        score_environment: 5,
                        useful_num: 133,
                        click_num: 0,
                        create_date: "2022-3-3"
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_zhang.png"),
                        applicant_name: "张先生",
                        evaluation_title: "福利待遇杠杠的，面试官很nice",
                        evaluation_description: "两天前面试的，现在才来评价。面试官低调不错。当时有点小紧张，有些问题只是泛泛而谈，没有更细的展开来说。不知道是薪资问题还是其他原因，可以肯定的是这个方向我经验挺丰富的，而且能力方面绝对可以胜任该岗位。希望能加入！",
                        score_description: 5,
                        score_recruiter: 5,
                        score_environment: 5,
                        useful_num: 55,
                        click_num: 0,
                        create_date: "2022-3-1"
                    }
                ],
                company: {
                    company_name: "迅雷网络",
                    company_logo: require("@/image/company/xunlei.jpg"),
                    company_tag: "移动互联网",
                    company_type: "上市公司",
                    company_size: "1000-5000人",
                    company_website: "www.xunlei.com"
                },
                similarJob: [
                    {
                        job_duty: "Web前端开发工程师",
                        job_salary: "10-20K·13薪",
                        company_name: "KLOOK 客路旅行",
                        office_city: "深圳",
                        company_logo: require("@/image/company/kelu.jpg"),
                    },
                    {
                        job_duty: "中高级前端开发工程师",
                        job_salary: "25-40K",
                        company_name: "美团",
                        office_city: "深圳",
                        company_logo: require("@/image/company/meituan.jpg")
                    },
                    {
                        job_duty: "前端开发工程师",
                        job_salary: "25-40K·15薪",
                        company_name: "字节跳动",
                        office_city: "深圳",
                        company_logo: require("@/image/company/zijie.jpg")
                    },
                    {
                        job_duty: "前端开发工程师",
                        job_salary: "8-14K",
                        company_name: "游戏科学",
                        office_city: "深圳",
                        company_logo: require("@/image/company/youxikexue.jpg")
                    },
                    {
                        job_duty: "Web前端开发工程师",
                        job_salary: "5-10K",
                        company_name: "云麦网络",
                        office_city: "深圳",
                        company_logo: require("@/image/company/yunmai.jpg")
                    }
                ],
                isCollect: false,
                isApply: false
            }
        },
        methods: {
            collect() {
                this.isCollect = !this.isCollect;
            },
            apply() {
                this.isApply = !this.isApply;
            },
            filter(data) {
                return data.split("\n");
            }
        },
    }
</script>

<style lang="less" scoped>
    .el-link-active{
        transition: .3s;
        &:hover{
            color: @mainColor;
        }
        &:active{
            color: @activeColor;
        }
    }
    .text-overflow{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    @mainColor: #5dd5c8;
    @activeColor: #00c2b3;
    @background: #f6f6f8;
    @fontColor: #61687c;
    @salaryColor: #fb670f;
    @promptColor: #8d92a1;
    @borderColor: #dcdfe6;
    .container{
        background: #fff;
    }
    main{
        .evaluation-header{
            background: @background;
            padding-top: 30px;
            overflow: hidden;
            .job-box{
                background: #fff;
                padding: 10px 20px;
                .job-description{
                    position: relative;
                    .job-name{
                        line-height: 45px;
                        h1{
                            display: inline-block;
                            font-size: 32px;
                            font-weight: 500;

                            margin-right: 16px;
                        }
                        span{
                            font-size: 28px;

                            color: @salaryColor;
                        }
                    }
                    .job-request{
                        margin: 10px 0 10px 4px;
                        color: @fontColor;
                    }
                    .job-tag{
                        line-height: 45px;
                        font-size: 12px;
                        span{
                            background: @background;
                            color: @fontColor;
                            display: inline-block;
                            padding: 0 8px;
                            height: 22px;
                            line-height: 22px;
                            border-radius: 3px;
                            & + span{
                                margin-left: 10px;
                            }
                        }
                    }
                    .user-handle{
                        position: absolute;
                        right: 0;
                        top: 30%;
                        transform: translateY(-50%);
                        .el-button{
                            display: inline-block;
                            width: 120px;
                            height: 42px;
                            line-height: 42px;
                            text-align: center;
                            margin: 16px 10px 0;
                            border: 1px solid @mainColor;
                            border-radius: 0;
                            color: @mainColor;
                            transition: .3s;
                            &:hover{
                                color: #fff;
                                background: @mainColor;
                            }
                            &:focus{
                                color: @mainColor;
                                background: transparent;
                            }
                            &:active{
                                background: #00c2b3;
                            }
                            /deep/ [class="el-icon-star-on"]{
                                font-size: 18px;
                                position: relative;
                                top: 2px;
                            }
                            &.el-button--primary{
                                color: #fff;
                                &:focus{
                                    color: #fff;
                                    background: @mainColor;
                                }
                                &:active{
                                    background: #00c2b3;
                                }
                            }
                        }
                        .job-collectY{
                            /deep/ i{
                                color: #F7BA2A;
                            }
                        }
                    }
                    .user-share{
                        color: @promptColor;
                        line-height: 45px;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        font-size: 15px;
                        span + span{
                            margin: 0 10px 0 16px;
                          .el-link-active();
                            cursor: pointer;
                        }
                    }
                }
            }
            .job-tab{
                margin-top: 20px;
                margin-bottom: 20px;
                padding-left: 20px;
                .el-link{
                    width: 160px;
                    padding: 8px 0;
                    font-size: 16px;
                    &.is-active{
                        color: #fff;
                        background: @mainColor;
                        &:hover,&:focus{
                            color: #fff;
                            background: @activeColor;
                            opacity: .8;
                        }
                        &:active{
                            opacity: 1;
                        }
                    }
                    color: @promptColor;
                  .el-link-active();
                }
            }
        }
        .evaluation-main{
            aside{
                width: 300px;
                float: right;
                margin-bottom: 100px;
                padding-left: 40px;
                > div + div{
                    margin-top: 40px;
                }
                h3{
                    font-size: 18px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid @borderColor;
                    margin-bottom: 25px;
                }
                .company-name{
                    margin-top: 50px;
                    text-align: center;
                    h2{
                        color: @fontColor;
                        font-weight: normal;
                        font-size: 20px;
                    }
                }
                .company-info{
                    p{
                        display: flex;
                        margin-bottom: 25px;
                        font-size: 16px;
                        i{
                            font-size: 22px;
                            margin-right: 16px;
                            margin-left: 12px;
                        }
                        span{
                            position: relative;
                            bottom: 2px;
                        }
                    }
                }
                .similar-position{
                    ul li{
                        margin-top: 25px;
                        padding-bottom: 25px;
                        border-bottom: 1px dashed @borderColor;
                        height: 100px;
                        .el-link{
                            margin: 0;
                        }
                        .sim-company-logo{
                            float: right;
                        }
                        .sim-job-info{
                            font-size: 16px;
                            color: @fontColor;
                          .el-link-active();
                          .text-overflow();
                        }
                        .sim-job-salary{
                            font-size: 15px;
                            color: @salaryColor;
                            line-height: 32px;
                        }
                        .sim-company-info{
                            font-size: 13px;
                            .sim-job-company{
                                font-size: inherit;
                                color: @promptColor;
                              .el-link-active();
                                display: inline-block;
                                max-width: 100px;
                              .text-overflow();
                            }
                            .office-city{
                                color: @promptColor;
                            }
                        }
                    }
                    .show-more{
                        color: @fontColor;
                      .el-link-active();
                        background: @background;
                        width: 100%;
                        padding: 10px 0;
                        margin-top: 20px;
                        i{
                            margin-left: 12px;
                        }
                    }
                }
            }
            .evaluation-detail{
                padding: 40px 40px 100px 20px;
                border-right: 20px solid @background;
                margin-right: 300px;
                > div + div{
                    margin-top: 50px;
                }
                h3{
                    margin-bottom: 30px;
                    font-size: 18px;
                    font-weight: bold;
                    padding-bottom: 16px;
                    position: relative;
                    &::after{
                        content: "";
                        display: block;
                        width: 24px;
                        height: 2px;
                        border-radius: 3px;
                        background: @mainColor;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                    }
                }
                .job-recruiter{
                    .content{
                        .recruiter{
                            display: inline-block;
                            margin-left: 16px;
                            position: relative;
                            bottom: 10px;
                            h2{
                                font-size: 20px;
                                font-weight: normal;
                                i{
                                    margin-left: 16px;
                                    color: @salaryColor;
                                }
                            }
                            p{
                                margin-top: 5px;
                                color: @promptColor;
                            }
                        }
                    }
                }
                .job-introduce{
                    h3{
                        margin: 0;
                    }
                    .content,h4{
                        font-size: 14px;
                        font-weight: normal;
                    }
                    .content{
                        h4 {
                            line-height: 45px;
                        }
                        p {
                            margin-bottom: 20px;
                            span {
                                display: block;
                                line-height: 28px;
                            }
                        }
                    }
                }
            }
        }
    }
    footer{
        background: @background;
        margin-top: 0;
    }
</style>