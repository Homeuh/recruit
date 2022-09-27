<template>
    <div class="container">
      <!-- 顶部导航栏 -->
      <GeneralTopBar :showPosition="false"/>
      <main class="margin-20per">
        <aside>
          <ul>
            <li v-for="menu in menuList" :key="menu.name"
                :class="{'selected': currentMenu === menu.name}"
                @click="menuSelect(menu.name)"
            >
              <SymbolIcon :icon-class="menu.icon"/>
              <el-link  :href="menu.href">{{ menu.name }}</el-link>
            </li>
          </ul>
        </aside>
        <div class="main-content">
          <transition name="el-fade-in">
            <!-- 工作台 -->
            <div class="work-table" v-if="!showResume">
              <!-- 顶部状态信息栏 -->
              <div class="recruiter-status">
                <div class="status-wrapper">
                  <div class="status-title">{{ status.applicant_num }}</div>
                  <div class="status-content">候选人</div>
                </div>
                <div class="status-wrapper">
                  <div class="status-title">{{ status.apply_num }}</div>
                  <div class="status-content">新简历</div>
                </div>
                <div class="status-wrapper">
                  <div class="status-title">{{ status.job_num }}</div>
                  <div class="status-content">已发布职位</div>
                </div>
                <div class="status-wrapper">
                  <div class="status-title">{{ status.feedback_rate }}%</div>
                  <div class="status-content">简历反馈率</div>
                </div>
                <div class="status-wrapper">
                  <div class="status-title">{{ status.login_date }}</div>
                  <div class="status-content">最近登录</div>
                </div>
                <el-button type="primary" class="add-job-btn" @click="$router.push('/recruiter/post')">发布新职位</el-button>
              </div>
              <!-- 近期面试 -->
              <div class="recent-interview">
                <h2>
                  <span>近期面试</span>
                  <span>（共{{ recent_interview_num }}场）</span>
                  <el-link href="/recruiter/interview">查看更多<i class="el-icon-arrow-right"></i> </el-link>
                </h2>
                <div class="content" v-if="interviewList.length === 0">
                  <el-empty :image-size="200"></el-empty>
                </div>
                <div class="content" v-else>
                  <el-timeline>
                    <el-timeline-item
                          v-for="(interview,index) in interviewList"
                          :key="interview.applicant_name + index"
                          icon="el-icon-yuanhuan"
                          :timestamp="interview.interview_date"
                          hide-timestamp
                    >
                      <div class="timeStamp">
                        <div class="date">{{ splitTimeStamp(interview.interview_date)[0] }}</div>
                        <div class="time">{{ splitTimeStamp(interview.interview_date)[1] }}</div>
                      </div>
                      <div class="interview-wrapper">
                        <div class="applicant-avatar">
                          <img :src="interview.applicant_avatar" :alt="interview.applicant_name"
                               style="width: 65px; height: 65px;"/>
                        </div>
                        <div class="interview-content">
                          <div class="applicant">
                            <p>
                              <span class="applicant-name">{{ interview.applicant_name }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ interview.applicant_sex }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ interview.applicant_identity }}</span>
                              <el-button round @click="showResume = true">查看简历</el-button>
                            </p>
                            <p>
                              <span>{{ interview.applicant_age }}岁</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ interview.working_year }}经验</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ interview.applicant_education }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ interview.applicant_city }}</span>
                            </p>
                            <p>
                              <span class="icon"><i class="el-icon-phone"></i></span>
                              <span>{{ interview.applicant_tel }}</span>
                            </p>
                          </div>
                          <div class="job">
                            <el-link class="job-duty" href="/profession/detail">{{ interview.job_duty }}</el-link>
                            <p>
                              <span class="job-salary">{{ interview.job_salary }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ interview.job_year }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ interview.education }}</span>
                            </p>
                            <p v-if="interview.interview_status === '1'">已发送面试地址</p>
                            <p v-else-if="interview.interview_status === '0'">已取消面试</p>
                            <p v-else-if="interview.interview_status === '2'">面试已结束</p>
                          </div>
                        </div>
                      </div>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
              <!-- 最新投递 -->
              <div class="recent-apply">
                <h2>
                  <span>最新投递</span>
                  <span>（共{{ recent_apply_num }}份）</span>
                  <el-link href="/recruiter/resume">查看更多<i class="el-icon-arrow-right"></i> </el-link>
                </h2>
                <div class="content" v-if="applyList.length === 0">
                  <el-empty :image-size="200"></el-empty>
                </div>
                <div class="content" v-else>
                  <ul>
                    <li v-for="(apply,index) in applyList" :key="apply.job_duty + index">
                      <div class="apply-wrapper">
                        <div class="applicant-avatar">
                          <img :src="apply.applicant_avatar" :alt="apply.applicant_name"
                               style="width: 80px; height: 80px;"/>
                        </div>
                        <div class="apply-content">
                          <div class="applicant">
                            <p>
                              <span class="applicant-name">{{ apply.applicant_name }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ apply.applicant_sex }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ apply.applicant_identity }}</span>
                              <el-button round @click="viewResume(apply.applicant_id)">查看简历</el-button>
                            </p>
                            <p>
                              <span>{{ apply.applicant_age }}岁</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ apply.working_year }}经验</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ apply.applicant_education }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ apply.applicant_city }}</span>
                            </p>
                            <p v-if="apply.school_name" class="school-name">
                              <span>{{ apply.school_name }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ apply.major }}</span>
                            </p>
                            <p v-else>暂无学业信息</p>
                          </div>
                          <div class="job">
                            <el-link class="job-duty" href="/profession/detail">{{ apply.job_duty }}</el-link>
                            <p>
                              <span class="job-salary">{{ apply.job_salary }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ apply.job_year }}</span>
                              <el-divider direction="vertical"></el-divider>
                              <span>{{ apply.education }}</span>
                            </p>
                          </div>
                          <div class="apply-status">
                            <p>投递时间</p>
                            <p>{{ apply.create_date }}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 简历详情 -->
            <ShowResume v-else :applicant_id="selectedApplicantId"/>
          </transition>
        </div>
      </main>
      <!-- 底部信息栏 -->
      <GeneralFooter />
    </div>
</template>

<script>
    import GeneralTopBar from "../../../components/GeneralTopBar";
    import GeneralFooter from "../../../components/GeneralFooter";
    import SymbolIcon from "@/components/SymbolIcon";
    import ShowResume from "../widgets/ShowResume.vue";
    export default {
        name: "Recruiter",
        components: {ShowResume, GeneralTopBar, GeneralFooter, SymbolIcon},
        data() {
            return {
                menuList: [
                    { icon: "el-icon-gongzuotai", name: "工作台", href: "/recruiter"},
                    { icon: "el-icon-zhiwei", name: "职位管理", href: "/recruiter/job"},
                    { icon: "el-icon-jianli", name: "简历处理", href: "/recruiter/resume"},
                    { icon: "el-icon-mianshi", name: "面试相关", href: "/recruiter/interview"},
                    { icon: "el-icon-xiaoxi", name: "我的消息", href: "/recruiter/message"},
                    { icon: "el-icon-shezhi", name: "账号设置", href: "/recruiter/setting"}
                ],
                currentMenu: "工作台",
                status: {},
               /* status: {
                    applicant_num: 105,
                    apply_num: 245,
                    job_num: 45,
                    feedback_rate: "90",
                    login_date: "2天内"
                },*/
                // recent_interview_num: 0,
                // interviewList: [],
                recent_interview_num: 8,
                interviewList: [
                    {
                        applicant_avatar: require("@/image/avatar/applicant_zhang.png"),
                        applicant_name: "张三",
                        applicant_sex: "男",
                        applicant_identity: "学生",
                        applicant_age: 22,
                        working_year: "1年",
                        applicant_education: "本科",
                        applicant_city: "深圳",
                        applicant_tel: "13522342234",
                        job_duty: "前端工程师",
                        job_salary: "10-15K",
                        job_year: "1年以上",
                        education: "本科",
                        interview_date: "2022-3-15 14:00",
                        interview_status: "1",
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_huang.png"),
                        applicant_name: "黄瑾",
                        applicant_sex: "女",
                        applicant_identity: "学生",
                        applicant_age: 21,
                        working_year: "暂无",
                        applicant_education: "本科",
                        applicant_city: "深圳",
                        applicant_tel: "13542684268",
                        job_duty: "Web前端开发工程师",
                        job_salary: "5-8K",
                        job_year: "经验不限",
                        education: "本科",
                        interview_date: "2022-3-18 10:00",
                        interview_status: "1",
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_tong.png"),
                        applicant_name: "童景程",
                        applicant_sex: "男",
                        applicant_identity: "职场人士",
                        applicant_age: 25,
                        working_year: "2年",
                        applicant_education: "本科",
                        applicant_city: "深圳",
                        applicant_tel: "15722802280",
                        job_duty: "前端开发工程师",
                        job_salary: "12-20K",
                        job_year: "2年",
                        education: "本科",
                        interview_date: "2022-3-21 16:30",
                        interview_status: "0",
                    },
                    {
                        applicant_avatar: require("@/image/avatar/applicant_wei.png"),
                        applicant_name: "魏晴雅",
                        applicant_sex: "女",
                        applicant_identity: "职场人士",
                        applicant_age: 27,
                        working_year: "3年",
                        applicant_education: "本科",
                        applicant_city: "广州",
                        applicant_tel: "13855665566",
                        job_duty: "内容运营",
                        job_salary: "12-20K",
                        job_year: "2年以上",
                        education: "本科",
                        interview_date: "2022-3-24 16:30",
                        interview_status: "2",
                    },
                ],
                recent_apply_num: 0,
                applyList: [],
                // recent_apply_num: 14,
                /*applyList: [
                    {
                        applicant_id:"",
                        applicant_avatar: require("@/image/avatar/applicant_liu.png"),
                        applicant_name: "刘维",
                        applicant_sex: "男",
                        applicant_identity: "学生",
                        applicant_age: 22,
                        working_year: "暂无",
                        applicant_education: "本科",
                        applicant_city: "深圳",
                        job_duty: "前端工程师",
                        job_salary: "6-10K",
                        job_year: "经验不限",
                        education: "本科",
                        create_date: "2022-3-21 21:02"
                    },
                    {
                        applicant_id:"",
                        applicant_avatar: require("@/image/avatar/applicant_wang.png"),
                        applicant_name: "王攀琥",
                        applicant_sex: "男",
                        applicant_identity: "学生",
                        applicant_age: 20,
                        working_year: "暂无",
                        applicant_education: "本科",
                        applicant_city: "深圳",
                        school_name: "北京大学",
                        major: "电子信息工程",
                        job_duty: "前端助理",
                        job_salary: "4-7K",
                        job_year: "经验不限",
                        education: "本科",
                        create_date: "2022-3-21 20:47"
                    },
                    {
                        applicant_id:"",
                        applicant_avatar: require("@/image/avatar/applicant_xie.png"),
                        applicant_name: "谢灵运",
                        applicant_sex: "女",
                        applicant_identity: "职场人士",
                        applicant_age: 27,
                        working_year: "3年",
                        applicant_education: "本科",
                        applicant_city: "深圳",
                        job_duty: "UI视觉设计",
                        school_name: "厦门大学",
                        major: "数字媒体技术",
                        job_salary: "8-12K",
                        job_year: "2年以上",
                        education: "本科",
                        create_date: "2022-3-21 20:14"
                    },
                    {
                        applicant_id:"",
                        applicant_avatar: require("@/image/avatar/applicant_zou.png"),
                        applicant_name: "邹周",
                        applicant_sex: "男",
                        applicant_identity: "职场人士",
                        applicant_age: 30,
                        working_year: "6年",
                        applicant_education: "本科",
                        applicant_city: "深圳",
                        job_duty: "市场总监",
                        school_name: "中山大学",
                        major: "市场营销",
                        job_salary: "20-40K",
                        job_year: "5年",
                        education: "本科",
                        create_date: "2022-3-22 18:33"
                    }
                ],*/
                
                showResume: false,
                selectedApplicantId: ""
            }
        },
        created() {
            this.$store.commit("setLogin");
            this.initData();
        },
        methods: {
            initData() {
                let getStatus = async () => {
                    const res = await this.$axios.request({
                        url: `/recruiter/getStatus/${this.$store.state.login_id}`,
                        method: "get"
                    })
                    console.log(res);
                    if(res.msg === "success") {
                        this.status = Object.assign({},{},res.data.status);
                    }
                }
                // let getInterviewList = async () => {
                //     const res = await this.$axios.request({
                //         url: `/recruiter/list/${this.$store.state.login_id}`,
                //         method: "get"
                //     })
                //     console.log(res);
                //     if(res.msg === "success") {
                //         res.data.interviewList.forEach(item => {
                //             item.applicant_avatar = require("@/image/avatar/" + item.applicant_avatar);
                //         })
                //         this.recent_interview_num = res.data.recent_interview_num;
                //         this.interviewList = res.data.interviewList;
                //     }
                // }
                let getApplyList = async () => {
                    const res = await this.$axios.request({
                        url: `/recruiter/list/${this.$store.state.login_id}`,
                        method: "get"
                    })
                    console.log(res);
                    if(res.msg === "success") {
                        res.data.applyList.forEach(item => {
                            item.applicant_avatar = require("@/image/avatar/" + item.applicant_avatar);
                        })
                        this.recent_apply_num = res.data.recent_apply_num;
                        this.applyList = res.data.applyList;
                    }
                }
                this.$axios.all([getStatus(),getApplyList()])
            },
            menuSelect(name) {
                this.currentMenu = name;
            },
            splitTimeStamp(timeStamp) {
                return timeStamp.split(" ");
            },
            viewResume(applicant_id) {
                this.selectedApplicantId = applicant_id;
                this.showResume = true;
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
    .el-button-active{
        transition: .3s;
        &:hover, &:focus{
            background: @mainColor;
            border: @mainColor;
            color: #fff;
        }
        &:active{
            background: @activeColor;
            border: @activeColor;
        }
    }

    @mainColor: #5dd5c8;
    @activeColor: #00c2b3;
    @background: #fff;
    @fontColor: #414a60;
    @salaryColor: #fb670f;
    @promptColor: #8d92a1;
    @borderColor: #dcdfe6;

    main {
        padding-top: 30px;
        display: flex;
        h2{
            font-size: 20px;
            position: relative;
            span{
                &:first-child{
                    color: @fontColor;
                    font-size: 20px;
                    font-weight: bold;
                }
                color: @promptColor;
                font-size: 14px;
                font-weight: normal;
            }
            .el-link{
                font-size: 15px;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
                color: @mainColor;
                .el-link-active();
            }
        }
        .content{
            margin-top: 60px;
        }
        aside {
            background: @background;
            width: 160px;
            height: fit-content;
            margin-right: 20px;
            flex-shrink: 0;
            ul li {
                font-size: 15px;
                height: 60px;
                line-height: 60px;
                position: relative;

                &.selected {
                    &::after {
                        content: "";
                        background: @activeColor;
                        width: 2px;
                        height: 18px;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }

                    .el-link {
                        color: #00d7c6;
                    }
                }

                .icon {
                    font-size: 18px;
                    margin-left: 30px;
                    margin-right: 12px;
                }

                .el-link {
                    cursor: pointer;
                    color: @fontColor;
                  .el-link-active();
                }

            }
        }
        .main-content{
            min-width: 1188px;
            flex: 1;
            .work-table{
                > div{
                    padding: 20px 30px;
                    background: @background;
                    & + div{
                        margin-top: 20px;
                    }
                }
                .recruiter-status{
                    .status-wrapper{
                        display: inline-block;
                        padding: 0 30px;
                        text-align: center;
                        position: relative;
                        & + .status-wrapper::before{
                            content: "";
                            display: block;
                            width: 1px;
                            height: 25px;
                            background: @borderColor;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        div{
                            height: 32px;
                            line-height: 32px;
                        }
                        .status-title{
                            color: @activeColor;
                            font-size: 22px;
                            font-weight: 600;
                        }
                        .status-content{
                            color: @promptColor;
                        }
                    }
                    .add-job-btn{
                        height: 54px;
                        padding: 0 45px;
                        font-size: 16px;
                        float: right;
                        transform: translateY(5px);
                    }
                }
                .recent-interview{
                    .el-timeline{
                        /deep/ .el-timeline-item{
                            margin-left: 100px;
                            padding-bottom: 28px;
                            &:last-child {
                                padding-bottom: 0;
                                .interview-wrapper{
                                    border-bottom: 0;
                                }
                            }
                            .el-timeline-item__tail{
                                border-color: @activeColor;
                            }
                            .el-timeline-item__node{
                                background: @background;
                            }
                            .el-timeline-item__icon{
                                color: @activeColor;
                            }
                        }
                        /deep/ .el-timeline-item__content {
                            color: @fontColor;
                        }
                    }
                    .timeStamp{
                        position: absolute;
                        top: -14px;
                        left: -100px;
                        text-align: right;
                        .date{
                            font-size: 18px;
                            color: @activeColor;
                        }
                        .time{
                            font-size: 15px;
                            margin-top: 2px;
                        }
                    }
                    .interview-wrapper{
                        margin-left: 25px;
                        padding-bottom: 30px;
                        border-bottom: 1px solid @borderColor;
                        position: relative;
                        bottom: 25px;
                        .applicant-avatar{
                            display: block;
                            float: left;
                        }
                        .interview-content{
                            margin-left: 80px;
                            > div{
                                display: inline-block;
                            }
                            p{
                                height: 30px;
                                line-height: 30px;
                                color: @promptColor;
                                span{
                                    &.applicant-name{
                                        color: @fontColor;
                                        font-size: 20px;
                                    }
                                    &.icon{
                                        margin-right: 8px;
                                    }
                                }
                                .el-button.is-round {
                                    float: right;
                                  .el-button-active();
                                }
                            }
                            .applicant{
                                width: 50%;
                                border-right: 3px dashed @borderColor;
                                padding-right: 25px;
                            }
                            .job{
                                margin-left: 25px;
                                .job-duty{
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 20px;
                                    color: @fontColor;
                                    .el-link-active();
                                }
                                .job-salary{
                                    font-size: 16px;
                                    color: @salaryColor;
                                }
                            }
                        }
                    }
                }
                .recent-apply{
                    ul li{
                        & + li {
                            margin-top: 30px;
                        }
                        &:last-child{
                            .apply-wrapper{
                                border-bottom: 0;
                            }
                        }
                    }
                    .apply-wrapper{
                        margin-left: 0;
                        padding-bottom: 30px;
                        border-bottom: 1px solid @borderColor;
                        position: relative;
                        .applicant-avatar{
                            display: block;
                            float: left;
                        }
                        .apply-content{
                            margin-left: 95px;
                            display: flex;
                            > div{
                                display: inline-block;
                            }
                            p{
                                padding-right: 25px;
                                height: 45px;
                                line-height: 45px;
                                color: @promptColor;
                                span{
                                    &.applicant-name{
                                        color: @fontColor;
                                        font-size: 20px;
                                    }
                                    &.icon{
                                        margin-right: 8px;
                                    }
                                }
                                .el-button.is-round {
                                    float: right;
                                  .el-button-active();
                                }
                            }
                            .applicant{
                                width: 40%;
                                border-right: 3px dashed @borderColor;
                                p{
                                    height: 30px;
                                    line-height: 30px;
                                }
                            }
                            .job{
                                margin-left: 25px;
                                width: 40%;
                                border-right: 3px dashed @borderColor;
                                .job-duty{
                                    height: 45px;
                                    line-height: 45px;
                                    font-size: 20px;
                                    color: @fontColor;
                                    .el-link-active();
                                }
                                .job-salary{
                                    font-size: 16px;
                                    color: @salaryColor;
                                }
                            }
                            .apply-status{
                                margin-left: 25px;
                            }
                        }
                    }
                }
            }
        }
        .into-resume{
            .el-page-header{
                height: 80px;
                line-height: 80px;
                background: #f8f9fc;
            }
        }
    }
</style>