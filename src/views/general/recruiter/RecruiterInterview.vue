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
        <div class="recruiter-interview" v-if="!showResume">
          <nav>
            <div :class="['nav-tab',{'nav-selected': currentNav === nav}]"
                 v-for="(nav,index) in navList" :key="nav + index"
                 @click="navSelect(nav)"
            >{{ nav }}
            </div>
          </nav>
          <div class="interview" v-if="interviewList.length === 0">
            <el-empty :image-size="200"></el-empty>
          </div>
          <div class="interview" v-else>
            <el-timeline :class="{
                'refused-timeline': currentNav === '已取消',
                'wait-timeline': currentNav === '待面试',
                'over-timeline': currentNav === '面试已结束'
          }">
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
        <!-- 简历详情 -->
        <ShowResume v-else/>
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
    import ShowResume from "@/views/general/widgets/ShowResume";
    export default {
        name: "RecruiterInterview",
        components: { GeneralTopBar, GeneralFooter, SymbolIcon, ShowResume},
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
                currentMenu: "面试相关",
                navList: ["全部","已取消","待面试","面试已结束"],
                currentNav: "全部",
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
                showResume: false
            }
        },
        methods: {
            menuSelect(name) {
                this.currentMenu = name;
            },
            navSelect(nav){
                this.currentNav = nav;
            },
            splitTimeStamp(timeStamp) {
                return timeStamp.split(" ");
            },
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
    @refusedColor: #F56C6C;
    @waitColor: #E6A23C;
    @overColor: #909399;

    main {
        padding-top: 30px;
        display: flex;
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
        .main-content {
            flex: 1 1 auto;
            margin-right: 20px;
            background: @background;
            nav {
                background: #f8f9fc;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                .nav-tab {
                    position: relative;
                    width: 100%;
                    text-align: center;
                    height: 60px;
                    line-height: 60px;
                    font-size: 16px;
                    cursor: pointer;
                  .el-link-active();

                    &::after {
                        content: "";
                        display: none;
                        width: 90px;
                        height: 2px;
                        background: @activeColor;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    &.nav-selected {
                        color: @activeColor;

                        &::after {
                            display: block;
                        }
                    }
                }
            }
            .interview{
                padding: 30px;
                margin-top: 60px;
                .el-timeline{
                    // 选中全部时
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


                    // 选中已取消时
                    &.refused-timeline{
                        /deep/ .el-timeline-item{
                            .el-timeline-item__tail{
                                border-color: @refusedColor;
                            }
                            .el-timeline-item__node{
                                background: @background;
                            }
                            .el-timeline-item__icon{
                                color: @refusedColor;
                            }
                        }
                        /deep/ .el-timeline-item__wrapper{
                            .timeStamp .date{
                                color: @refusedColor;
                            }
                        }
                    }
                    // 选中待面试时
                    &.wait-timeline{
                        /deep/ .el-timeline-item{
                            .el-timeline-item__tail{
                                border-color: @waitColor;
                            }
                            .el-timeline-item__node{
                                background: @background;
                            }
                            .el-timeline-item__icon{
                                color: @waitColor;
                            }
                        }
                        /deep/ .el-timeline-item__wrapper{
                            .timeStamp .date{
                                color: @waitColor;
                            }
                        }
                    }
                    // 选中面试已结束时
                    &.over-timeline{
                        /deep/ .el-timeline-item{
                            .el-timeline-item__tail{
                                border-color: @overColor;
                            }
                            .el-timeline-item__node{
                                background: @background;
                            }
                            .el-timeline-item__icon{
                                color: @overColor;
                            }
                        }
                        /deep/ .el-timeline-item__wrapper{
                            .timeStamp .date{
                                color: @overColor;
                            }
                        }
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
        }
    }
</style>