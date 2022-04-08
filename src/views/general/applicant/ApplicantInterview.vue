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
                'refused-timeline': currentNav === '已拒绝',
                'wait-timeline': currentNav === '待面试',
                'over-timeline': currentNav === '面试已结束'
            }">
              <el-timeline-item
                    v-for="(interview,index) in interviewList"
                    :key="interview.company_name + index"
                    icon="el-icon-yuanhuan"
                    :timestamp="interview.interview_date"
                    hide-timestamp
              >
                <div class="timeStamp">
                  <div class="date">{{ splitTimeStamp(interview.interview_date)[0] }}</div>
                  <div class="time">{{ splitTimeStamp(interview.interview_date)[1] }}</div>
                </div>
                <div class="interview-wrapper">
                  <el-link href="/company/detail" class="company-logo">
                    <img :src="interview.company_logo" :alt="interview.company_name"
                         style="width: 60px; height: 60px;"/>
                  </el-link>
                  <div class="interview-content">
                    <div class="interview-job">
                      <el-link href="/company/detail" class="company" :title="interview.company_name">{{ interview.company_name }}</el-link>
                      <el-link href="/profession/detail" class="job-info" >
                        <span>应聘：</span>
                        <span :title="interview.job_duty">{{ interview.job_duty }}</span>
                        <span>{{ interview.job_salary }}</span>
                      </el-link>
                    </div>
                    <div class="office-address">
                      <i class="el-icon-location"></i>
                      <span>{{ interview.office_address }}</span>
                      <el-button v-if="currentNav === '面试已结束'"
                                 class="evaluation-btn"
                                 type="text" icon="el-icon-edit-outline"
                                 @click="evaluate(interview)"
                      >评价</el-button>
                    </div>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </main>
      <!-- 底部信息栏 -->
      <GeneralFooter />
      <!-- 评价框 -->
      <el-dialog
            :close-on-click-modal="false"
            title="评价"
            :visible.sync="evaluationDialogVisible"
            width="40%">
        <el-form :model="evaluationForm" :rules="evaluationRules" ref="evaluationForm" label-width="60px">
          <h2>
            <img :src="evaluationData.company_logo" :alt="evaluationData.company_name"
                 style="width: 60px; height: 60px; margin-right: 16px" />
            <span>{{ evaluationData.company_name }}&nbsp;·&nbsp;{{ evaluationData.job_duty }}</span>
            <span class="hidden-name">匿名评价<input type="checkbox" v-model="evaluationForm.hidden_name" true-value="Y" false-value="N"/></span>
          </h2>
          <el-form-item class="evaluation-score" label-width="0">
            <el-form-item label="描述相符" prop="score_description" label-width="100px" class="score-wrapper">
              <el-rate v-model="evaluationForm.score_description" allow-half></el-rate>
            </el-form-item>
            <el-form-item label="面试官" prop="score_recruiter" label-width="100px" class="score-wrapper">
              <el-rate v-model="evaluationForm.score_recruiter" allow-half></el-rate>
            </el-form-item>
            <el-form-item label="公司环境" prop="score_environment" label-width="100px" class="score-wrapper">
              <el-rate v-model="evaluationForm.score_environment" allow-half></el-rate>
            </el-form-item>
          </el-form-item>
          <el-form-item label="标题" prop="evaluation_title">
            <el-input type="text" placeholder="输入评价标题"
                      v-model="evaluationForm.evaluation_title"
                      maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="evaluation_description">
            <el-input type="textarea"
                      :autosize="{ minRows: 5, maxRows: 8}"
                      placeholder="输入评价内容"
                      v-model="evaluationForm.evaluation_description"
                      maxlength="250" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('evaluationForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('evaluationForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    import GeneralTopBar from "../../../components/GeneralTopBar";
    import GeneralFooter from "../../../components/GeneralFooter";
    import SymbolIcon from "@/components/SymbolIcon";
    export default {
        name: "ApplicantInterview",
        components: { GeneralTopBar, GeneralFooter, SymbolIcon},
        data() {
            let checkScore = (rule, value, callback) => {
                if(!value){
                    return callback(new Error("打分项不能为空"));
                } else {
                    callback();
                }
            };
            return {
                menuList: [
                    { icon: "el-icon-gerenzhongxin", name: "个人中心", href: "/applicant"},
                    { icon: "el-icon-jianli", name: "我的简历", href: "/applicant/resume"},
                    { icon: "el-icon-toudi", name: "投递职位", href: "/applicant/apply"},
                    { icon: "el-icon-mianshi", name: "我的面试", href: "/applicant/interview"},
                    { icon: "el-icon-shoucang", name: "职位收藏", href: "/applicant/collect"},
                    { icon: "el-icon-xiaoxi", name: "我的消息", href: "/applicant/message"},
                    { icon: "el-icon-shezhi", name: "账号设置", href: "/applicant/setting"}
                ],
                currentMenu: "我的面试",
                navList: ["全部","已拒绝","待面试","面试已结束"],
                currentNav: "全部",
                interviewList: [
                    {
                        company_logo: require("@/image/company/xunlei.jpg"),
                        company_name: "迅雷网络",
                        office_address: "深圳南山区郎山路中同方信息港e栋",
                        job_duty: "前端工程师",
                        job_salary: "10-15K",
                        interview_date: "2022-3-15 14:00",
                    },
                    {
                        company_logo: require("@/image/company/kelu.jpg"),
                        company_name: "KLOOK 客路旅行",
                        office_address: "深圳福田区沙头街道车公庙天安科技创业园A座1002",
                        job_duty: "Web前端开发工程师",
                        job_salary: "10-20K·13薪",
                        interview_date: "2022-3-18 10:00",
                    },
                    {
                        company_logo: require("@/image/company/meituan.jpg"),
                        company_name: "美团",
                        office_address: "广州天河区林和西耀中广场9层910",
                        job_duty: "中高级前端开发工程师",
                        job_salary: "25-40K",
                        interview_date: "2022-3-21 16:30",
                    }
                ],
                evaluationData: {
                    company_logo: "",
                    company_name: "",
                    job_duty: "",
                },
                evaluationForm: {
                    evaluation_title: "",
                    evaluation_description: "",
                    score_description: 0,
                    score_recruiter: 0,
                    score_environment: 0,
                    hidden_name: "N"
                },
                evaluationRules: {
                    evaluation_title: [
                        { required: true, message: "请输入评价标题", trigger: ['blur','change']}
                    ],
                    evaluation_description: [
                        { required: true, message: "请输入评价内容", trigger: ['blur','change']}
                    ],
                    score_description: [
                        { required: true, validator: checkScore, trigger: ['blur','change']}
                    ],
                    score_recruiter: [
                        { required: true, validator: checkScore, trigger: ['blur','change']}
                    ],
                    score_environment: [
                        { required: true, validator: checkScore, trigger: ['blur','change']}
                    ],
                },
                evaluationDialogVisible: false
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
            evaluate(interview) {
                for (const [key,value] of Object.entries(interview)) {
                    if(Object.prototype.hasOwnProperty.call(this.evaluationData, key)){
                        this.evaluationData[key] = value;
                    }
                }
                this.evaluationDialogVisible = true
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success("评价已提交");
                        this.resetForm(formName);
                    } else {
                        this.$message.error("提交信息有误，请重新输入");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.evaluationDialogVisible = false;
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
    @background: #fff;
    @fontColor: #414a60;
    @salaryColor: #fb670f;
    @promptColor: #8d92a1;
    @borderColor: #dcdfe6;
    @refusedColor: #F56C6C;
    @waitColor: #E6A23C;
    @overColor: #909399;

    main{
        padding-top: 30px;
        display: flex;
        aside{
            background: @background;
            width: 160px;
            height: fit-content;
            margin-right: 20px;
            flex-shrink: 0;
            ul li{
                font-size: 15px;
                height: 60px;
                line-height: 60px;
                position: relative;
                &.selected {
                    &::after{
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
                .icon{
                    font-size: 18px;
                    margin-left: 30px;
                    margin-right: 12px;
                }
                .el-link{
                    cursor: pointer;
                    color: @fontColor;
                  .el-link-active();
                }
            }
        }
        .main-content{
            flex: 1 1 auto;
            margin-right: 20px;
            padding-bottom: 30px;
            background: @background;
            nav{
                background: #f8f9fc;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                .nav-tab{
                    position: relative;
                    width: 100%;
                    text-align: center;
                    height: 60px;
                    line-height: 60px;
                    font-size: 16px;
                    cursor: pointer;
                    .el-link-active();
                    &::after{
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
                    &.nav-selected{
                        color: @activeColor;
                        &::after{
                            display: block;
                        }
                    }
                }
            }
            .interview{
                padding: 30px;
                margin-top: 60px;
                .el-timeline{
                    //  选中全部时
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
                    
                    
                    // 选中已拒绝时
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
                    .company-logo{
                        display: block;
                        float: left;
                    }
                    .interview-content{
                        margin-left: 75px;
                        .interview-job{
                            height: 60px;
                            line-height: 60px;
                            display: flex;
                            .company{
                                display: inline-block;
                                font-size: 18px;
                                font-weight: normal;
                                color: @fontColor;
                              .el-link-active();
                                max-width: 180px;
                              .text-overflow();
                            }
                            .job-info{
                                margin-left: auto;
                                font-size: 15px;
                              .text-overflow();
                                /deep/ .el-link--inner{
                                    display: inline-flex;
                                }
                                span:nth-child(1){
                                    color: @promptColor;
                                    cursor: text;
                                }
                                span:nth-child(2){
                                    margin-right: 8px;
                                    color: @fontColor;
                                  .el-link-active();
                                    max-width: 150px;
                                }
                                span:nth-child(3){
                                    color: @salaryColor;
                                    cursor: text;
                                }
                            }
                        }
                    }
                    .office-address{
                        height: 21px;
                        color: @promptColor;
                        i{
                            margin-right: 8px;
                        }
                        .evaluation-btn{
                            float: right;
                        }
                    }
                }
            }
            
        }
    }
    .el-dialog__wrapper{
        /deep/ .el-dialog__header{
            .el-dialog__headerbtn:hover .el-dialog__close{
                color: @activeColor;
            }
        }
        /deep/ .el-dialog__body{
            .el-form{
                h2{
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    font-weight: normal;
                    .hidden-name{
                        margin-left: auto;
                        display: flex;
                        align-items: center;
                    }
                }
                .evaluation-score{
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: space-around;
                    .score-wrapper{
                        display: inline-block;
                        height: 40px;
                        line-height: 40px;
                        > span{
                            margin-right: 16px;
                        }
                        .el-rate{
                            display: inline-block;
                        }
                    }
                }
                textarea{
                    font-family: Arial sans-serif;
                }
            }
        }
    }
</style>