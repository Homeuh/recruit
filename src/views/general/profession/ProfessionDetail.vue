<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <GeneralTopBar :showPosition="false"/>
    <main>
      <div class="detail-header">
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
      <div class="detail-main margin-20per">
        <aside ref="aside">
          <div class="company-name">
            <el-link href="/company/detail">
              <img :src="!company.company_logo ? require('@/image/illustration/company_logo.png') : company.company_logo"
                   :alt="company.company_name" :title="company.company_name"
                   style="width: 100px; height: 100px"/>
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
              <span :title="company.company_website">{{ company.company_website }}</span>
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
        <div class="job-detail" ref="job_detail">
          <div class="job-recruiter">
            <h3>职位发布者</h3>
            <div class="content">
              <img :src="jobData.recruiter_avatar" :alt="jobData.recruiter_name"
                   style="width: 60px; height: 60px; border-radius: 50%"/>
              <div class="recruiter">
                <h2>
                  <span>{{ jobData.recruiter_name }}</span>
                  <i class="el-icon-yirenzheng"></i>
                </h2>
                <p>
                  <span>{{ jobData.recruiter_duty }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{ jobData.update_date }}发布</span>
                </p>
              </div>
            </div>
          </div>
          <div class="job-introduce">
            <h3>职位描述</h3>
            <div class="content">
              <template v-if="jobData.job_description">
                <h4>工作内容：</h4>
                <!-- 过滤job_description -->
                <p><span v-for="(des,index) in filter(jobData.job_description)" :key="des + index">{{ des }}</span></p>
              </template>
              <template v-if="jobData.job_requirement">
                <h4>岗位要求：</h4>
                <p><span v-for="(req,index) in filter(jobData.job_requirement)" :key="req + index">{{ req }}</span></p>
              </template>
              <template v-if="jobData.job_benefit">
                <h4>薪酬福利：</h4>
                <p><span v-for="(ben,index) in filter(jobData.job_benefit)" :key="ben + index">{{ ben }}</span></p>
              </template>
            </div>
          </div>
          <div class="job-attached" v-if="jobData.attached_info">
            <h3>附加信息：</h3>
            <div class="content">
              <p><span v-for="(att,index) in filter(jobData.attached_info)" :key="att + index">{{ att }}</span></p>
            </div>
          </div>
          <div class="job-interview" v-if="jobData.interview_info">
            <h3>面试信息：</h3>
            <div class="content">
              <p><span v-for="(int,index) in filter(jobData.interview_info)" :key="int + index">{{ int }}</span></p>
            </div>
          </div>
          <div class="office-address" v-if="jobData.office_address">
            <h3>工作地点</h3>
              <Map :address="jobData.office_address"/>
          </div>
          <InterviewEvaluation data-html2canvas-ignore="true" :dataList="evaluation" :showMoreLink="true"/>
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
import Map from "../../../components/Map.vue";
import InterviewEvaluation from "../widgets/InterviewEvaluation.vue";
import setMinHeight from "@/utils/setMinHeight";
export default {
    name: "ProfessionDetail",
    components: { GeneralTopBar, GeneralFooter, Map, InterviewEvaluation},
    data() {
        return {
            jobData: {},
            /*jobData: {
                job_duty: "前端开发工程师",
                job_salary: "10-15K",
                recruit_num: 5,
                job_year: "1年以上",
                education: "本科",
                job_type: "全职",
                job_tag: ["JavaScript","Vue","React"],
                job_benefit: "1、提供在行业中非常具有竞争力的薪水\n" +
                    "2、为员工提供齐全的五险一金\n" +
                    "3、逢年过节有过节福利（包括六一儿童节）\n" +
                    "4、项目奖金、绩效奖、年终奖、体检、多次旅游等\n" +
                    "5、不定期的员工活动\n" +
                    "6、一年有两次调薪机会，表现好会有升职机会",
                job_description: "1、参与公司中小商户管理软件产品的设计与研发，打造领先的SaaS产品\n" +
                    "2、根据业务需求完成H5/小程序的前端交互开发\n" +
                    "3、持续优化SaaS产品的前端交互体验",
                job_requirement: "1、1年及以上前端开发经验，有移动Web开发经验或者小程序开发经验\n" +
                    "2、有HybridApp开发经验，熟练使用Angular或Vue经验优先\n" +
                    "3、有大型APP的前端架构部署和实践经验优先4、有责任感，对前端技术有激情，喜欢钻研，能快速接受和掌握新技术",
                attached_info: "工作时间：早9晚6，周末双休",
                interview_info: "面试方式：到场面试 | 电话面试\n" +
                    "面试轮数：1-2轮\n" +
                    "时间安排：分多次完成\n" +
                    "补充标签：可周末面试 | 可下班后面试",
                office_address: "深圳南山区郎山路中同方信息港e栋",
                update_date: "三天前发布",
                recruiter_name: "王先生",
                recruiter_avatar: require("@/image/avatar/recruiter_wang.png"),
                recruiter_duty: "前端组长",
            },*/
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
                }
            ],
            company: {},
            /*company: {
                company_name: "迅雷网络",
                company_logo: require("@/image/company/xunlei.jpg"),
                company_tag: "移动互联网",
                company_type: "上市公司",
                company_size: "1000-5000人",
                company_website: "www.xunlei.com"
            },*/
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
    async created() {
        this.$store.commit("setLogin");
        await this.initData();

        await this.judgeApply();
    },
    mounted() {
        setMinHeight(this, this.$refs.job_detail);
    },
    methods: {
        async initData() {
            // console.log(this.$route);
            const res = await this.$axios.request({
                url: `/job/info/${this.$route.query.job_id}`,
                method: "get"
            });
            console.log(res);
            if(res.msg === 'success'){
                res.data.jobData.recruiter_avatar = require("@/image/avatar/" + res.data.jobData.recruiter_avatar);
                if(res.data.jobData.job_tag) {
                    res.data.jobData.job_tag = res.data.jobData.job_tag.split(",");
                }
                this.jobData = Object.assign({},{},res.data.jobData);
                
                res.data.company.company_logo = require("@/image/company/" + res.data.company.company_logo);
                this.company = Object.assign({},{},res.data.company);

                // 告知父组件已完成后台数据请求，用于招聘官职位详情预览
                this.$emit("completeUpdate:profession", true);
            }
        },
        collect() {
            if(this.$store.state.login_role === "0") {
                this.isCollect = !this.isCollect;
            } else {
                this.$message.error("请先登录")
            }
        },
        async judgeApply() {
            // 判断是否已投递
            const res = await this.$axios.request({
                url: `/apply/info/${this.$store.state.login_id}/${this.jobData.job_id}`,
                method: "get",
            })
            console.log(res);
            if(res.data.applyCount === 1){
                this.isApply = true;
            }
        },
        async apply() {
            if(!this.$store.state.login_id){
                return this.$message.error("当前状态尚未登录，请先注册登录完善信息！")
            }
            else if(this.$store.state.login_role !== "0") {
                return this.$message.error("角色身份不符，请切换为求职者身份！")
            }
            else {
                // 未投递
                if(!this.isApply) {
                    const validReusme = await this.$axios.request({
                        url: `/applicant/info/${this.$store.state.login_id}`,
                        method: "get",
                    })
                    console.log(validReusme);
                    if(validReusme.data.applicant.resume_percent <= 60) {
                        this.$message.info("您的简历尚未完善！");
                    }
                    const res = await this.$axios.request({
                        url: `/apply/saveOrUpdate?login_id=${this.$store.state.login_id}&job_id=${this.jobData.job_id}`,
                        method: "post",
                    })
                    console.log(res)
                    this.$message.success("投递成功");
                } else { // 已投递
                    const res = await this.$axios.request({
                        url: `/apply/delete?login_id=${this.$store.state.login_id}&job_id=${this.jobData.job_id}`,
                        method: "delete",
                    })
                    console.log(res)
                    if(res.data === "删除成功") {
                        this.$message.success("投递已取消");
                    } else {
                        return this.$message.error("投递取消失败");
                    }
                }
                this.isApply = !this.isApply;
            }
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
    .detail-header{
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
                    height: 45px;
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
    .detail-main{
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
                        display: inline-block;
                        position: relative;
                        bottom: 2px;
                        max-width: 210px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
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
        .job-detail{
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
            .job-introduce,
            .job-attached,
            .job-interview{
                &.job-introduce h3{
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