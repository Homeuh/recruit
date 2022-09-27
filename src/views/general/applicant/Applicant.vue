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
          <!-- 近期面试 -->
          <div class="recent-interview">
            <h2>
              <span>近期面试</span>
              <span>（共{{ interview_num }}场）</span>
              <el-link href="/applicant/interview">查看更多<i class="el-icon-arrow-right"></i></el-link>
            </h2>
            <div class="content" v-if="interviewList.length === 0">
              <el-empty :image-size="200"></el-empty>
            </div>
            <div class="content" v-else>
              <el-timeline>
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
                      </div>
                    </div>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
          <!-- 近期投递 -->
          <div class="recent-apply">
            <h2>
              <span>近期投递</span>
              <span>（共{{ apply_num }}份）</span>
              <el-link href="/applicant/apply">查看更多<i class="el-icon-arrow-right"></i></el-link>
            </h2>
            <div class="content" v-if="applyList.length === 0">
              <el-empty :image-size="200"></el-empty>
            </div>
            <div class="content" v-else>
              <ul>
                <li v-for="(apply,index) in applyList" :key="apply.job_duty + index">
                  <div class="apply-job">
                    <div class="job-request">
                      <el-link :href="'/profession/detail?job_id=' + apply.job_id">
                        <span class="job-duty">{{ apply.job_duty }}</span>
                        <span class="job-salary">{{ apply.job_salary }}</span>
                      </el-link>
                      <p>
                        <span>{{ apply.office_city}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>{{ apply.job_year}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>{{ apply.education}}</span>
                      </p>
                    </div>
                    <div class="company-info">
                      <el-link :href="'/company/detail?company_id=' + apply.company_id" class="company-logo">
                        <img :src="apply.company_logo" :alt="apply.company_name"
                             style="width: 56px; height: 56px; margin-right: 16px"/>
                      </el-link>
                      <el-link :href="'/company/detail?company_id=' + apply.company_id" class="company-name">{{ apply.company_name}}</el-link>
                      <p class="company-description">
                        <span class="company-tag" :title="apply.company_tag">{{ apply.company_tag}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>{{ apply.company_type}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>{{ apply.company_size}}</span>
                      </p>
                    </div>
                  </div>
                  <div class="apply-status">
                    <span>投递时间：{{ apply.create_date }}</span>
                    <span v-if="apply.apply_status === '0'" style="color: #F56C6C">简历不合适</span>
                    <span v-else-if="apply.apply_status === '1'" style="color: #8d92a1">简历投递中~</span>
                    <span v-else-if="apply.apply_status === '2'" style="color: #00c2b3">简历被查看</span>
                    <span v-else-if="apply.apply_status === '3'" style="color: #E6A23C">公司感兴趣</span>
                    <span v-else-if="apply.apply_status === '4'" style="color: #00c2b3">收到面试邀请~</span>
                    <span v-else-if="apply.apply_status === '5'" style="color: #8d92a1">面试已结束</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="applicant">
          <div class="applicant-card" v-if="Object.keys(this.applicant).length === 0">
            <el-empty :image-size="200"></el-empty>
          </div>
          <!-- 求职者资料卡 -->
          <div class="applicant-card" v-else>
            <div class="applicant-description">
              <img :src="applicant.applicant_avatar" :alt="applicant.applicant_name"
                   style="width: 100px; height: 100px; border-radius: 50%"/>
              <p>{{ applicant.applicant_name }}</p>
              <p>
                <span>{{ applicant.applicant_sex }}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{ applicant.applicant_age }}岁</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{ applicant.working_year }}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{ applicant.education }}</span>
              </p>
            </div>
            <div class="resume">
              <p><span>简历完整度</span><span>{{ applicant.resume_percent }}%</span></p>
              <el-progress :show-text="false" color="#00c2b3" :stroke-width="13" :percentage="applicant.resume_percent"></el-progress>
            </div>
            <div class="user-click">
              <el-button @click="previewVisible = true">预览</el-button>
              <el-button type="primary" @click="$router.push('/applicant/resume')">编辑</el-button>
            </div>
          </div>
          <div class="job-intention" v-if="Object.keys(this.jobIntention).length === 0">
            <el-empty :image-size="200"></el-empty>
          </div>
          <!-- 求职意向 -->
          <div class="job-intention" v-else>
            <h2>求职意向</h2>
            <div class="content">
              <p>
                <i class="el-icon-zhiwei"></i>
                <span>{{jobIntention.intention_duty}}</span>
              </p>
              <p>
                <i class="el-icon-shijian"></i>
                <span>{{jobIntention.intention_type}}</span>
              </p>
              <p>
                <i class="el-icon-location-outline"></i>
                <span>{{jobIntention.intention_city}}</span>
              </p>
              <p>
                <i class="el-icon-jinqian"></i>
                <span>{{jobIntention.min_salary}}&nbsp;-&nbsp;{{jobIntention.max_salary}}K</span>
              </p>
              <p>
                <i class="el-icon-ruzhishijian"></i>
                <span>{{jobIntention.arrive_date}}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <!-- 底部信息栏 -->
      <GeneralFooter />
      
      <PreviewPicture v-if="previewVisible && applicant.applicant_id"
                      :preview.sync="previewVisible" :isResume="true"
                      :applicant_id="applicant.applicant_id"
      />
    </div>
</template>

<script>
import GeneralTopBar from "../../../components/GeneralTopBar";
import GeneralFooter from "../../../components/GeneralFooter";
import SymbolIcon from "@/components/SymbolIcon";
import PreviewPicture from "@/components/PreviewPicture";
export default {
    name: "Applicant",
    components: {
        GeneralTopBar,
        GeneralFooter,
        SymbolIcon,
        PreviewPicture
    },
    data() {
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
            currentMenu: "个人中心",
            interview_num: 3,
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
            apply_num: 17,
            /*applyList: [
                {
                    job_duty: "前端开发工程师",
                    job_salary: "12-24K·14薪",
                    office_city: "深圳",
                    job_year: "2年以上",
                    education: "不限",
                    company_logo: require("@/image/company/siwei.jpg"),
                    company_name: "思维巡航",
                    company_tag: "软件服务",
                    company_type: "民营公司",
                    company_size: "15-50人",
                    create_date: "2022-3-21 21:02",
                    apply_status: 0
                },
                {
                    job_duty: "web前端开发工程师",
                    job_salary: "7-10K",
                    office_city: "深圳",
                    job_year: "1年以上",
                    education: "本科",
                    company_logo: require("@/image/company/guojiang.jpg"),
                    company_name: "果酱时代",
                    company_tag: "MCN | 直播平台",
                    company_type: "合资公司",
                    company_size: "50-150人",
                    create_date: "2022-3-21 20:14",
                    apply_status: 1
                },
                {
                    job_duty: "前端开发工程师",
                    job_salary: "13-26K",
                    office_city: "深圳",
                    job_year: "经验不限",
                    education: "不限",
                    company_logo: require("@/image/company/keruier.jpg"),
                    company_name: "科瑞尔人力资源服务",
                    company_tag: "生活服务，智能硬件",
                    company_type: "上市公司",
                    company_size: "2000人以上",
                    create_date: "2022-3-21 21:02",
                    apply_status: 2
                },
                {
                    job_duty: "中高级前端开发工程师",
                    job_salary: "30-50K",
                    office_city: "深圳",
                    job_year: "5年以上",
                    education: "大专及以上",
                    company_logo: require("@/image/company/meituan.jpg"),
                    company_name: "美团",
                    company_tag: "消费生活",
                    company_type: "上市公司",
                    company_size: "2000人以上",
                    create_date: "2022-3-21 19:55",
                    apply_status: 3
                },
                {
                    job_duty: "前端开发工程师",
                    job_salary: "8-14K",
                    office_city: "深圳",
                    job_year: "3-5年",
                    education: "大专及以上",
                    company_logo: require("@/image/company/youxikexue.jpg"),
                    company_name: "游戏科学",
                    company_tag: "游戏开发",
                    company_type: "民营公司",
                    company_size: "50-150人",
                    create_date: "2022-3-21 19:33",
                    apply_status: 4
                },
                {
                    job_duty: "Web前端开发工程师",
                    job_salary: "5-10K",
                    office_city: "深圳",
                    job_year: "1年及以上",
                    education: "大专及以上",
                    company_logo: require("@/image/company/yunmai.jpg"),
                    company_name: "云麦网络",
                    company_tag: "MCN | 直播平台",
                    company_type: "创业型公司",
                    company_size: "15-50人",
                    create_date: "2022-3-21 18:45",
                    apply_status: 5
                }
            ],*/
            /*applicant: {
                applicant_avatar: require("@/image/avatar/applicant_zhang.png"),
                applicant_name: "张三",
                applicant_sex: "男",
                applicant_age: "22",
                working_year: "1年",
                education: "本科",
                resume_percent: 100,
            },*/
            /*jobIntention: {
                intention_duty: "前端工程师",
                intention_type: "全职",
                intention_city: "深圳",
                min_salary: 8,
                max_salary: 14,
                arrive_date: "2周内"
            },*/
            // interviewList: [],
            // apply_num: 0,
            applyList: [],
            applicant: {},
            jobIntention: {},
            previewVisible: false,
        }
    },
    created() {
        this.$store.commit("setLogin");
        this.initData();
    },
    methods: {
        initData() {
            // let getInterviewList = async () => {
            //     const res = await this.$axios.request({
            //         url: `/interview/list/${this.$route.query.company_id}`,
            //         method: "get",
            //     });
            //     console.log(res);
            //     if(res.msg === 'success'){
            //         res.data.company.company_logo = require("@/image/company/" + res.data.company.company_logo);
            //         this.company = res.data.company;
            //     }
            // };
            let getApplyList = async () => {
                const res = await this.$axios.request({
                    url: `/apply/list/${this.$store.state.login_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    res.data.applyList.forEach(item => {
                        item.company_logo = require("@/image/company/" + item.company_logo);
                    })
                    this.apply_num = res.data.apply_num;
                    this.applyList = Object.assign([],[],res.data.applyList);
                }
            };
            let getApplicant = async () => {
                const res = await this.$axios.request({
                    url: `/applicant/info/${this.$store.state.login_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    res.data.applicant.applicant_avatar = require( "@/image/avatar/" + res.data.applicant.applicant_avatar);
                    this.applicant = Object.assign({},{},res.data.applicant);
                }
            };
            let getJobIntention = async () => {
                const res = await this.$axios.request({
                    url: `/job-intention/info/${this.$store.state.login_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    this.jobIntention = Object.assign({},{},res.data.jobIntention);
                }
            };
            this.$axios.all([getApplyList(),getApplicant(),getJobIntention()]);
        },
        menuSelect(name) {
            this.currentMenu = name;
        },
        splitTimeStamp(timeStamp) {
            return timeStamp.split(" ");
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

main{
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
        min-width: 868px;
        flex: 1 1 auto;
        margin-right: 20px;
        > div {
            padding: 30px;
            background: @background;
            & + div{
                margin-top: 20px;
            }
        }
        .recent-interview{
            padding-bottom: 0;
            .content{
                margin-top: 60px;
            }
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
                }
            }
        }
        .recent-apply{
            .content{
                margin: 60px 0;
            }
            ul li{
                border: 1px solid @borderColor;
                &:hover{
                    box-shadow: 0 0 10px 0 rgba(56,81,76,.12);
                }
                & + li{
                    margin-top: 12px;
                }
                .apply-job{
                    padding: 20px 30px;
                    display: flex;
                    justify-content: space-between;
                    .job-request{
                        .el-link{
                          font-size: 18px;
                          color: @fontColor;
                          .el-link-active();
                          /deep/ .job-duty{
                              margin-right: 16px;
                          }
                          /deep/ .job-salary{
                              color: @salaryColor;
                              
                          }
                      }
                        p{
                            color: @promptColor;
                            margin-top: 20px;
                            font-size: 14px;
                        }
                    }
                    .company-info{
                        width: 330px;
                        position: relative;
                        padding-left: 70px;
                        white-space: nowrap;
                        .el-link{
                            display: block;
                            margin: 0;
                            color: @fontColor;
                            .el-link-active();
                        }
                        .company-logo{
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        .company-name{
                            font-size: 18px;
                        }
                        .company-description{
                            margin-top: 20px;
                            font-size: 14px;
                            color: @promptColor;
                            display: flex;
                            .company-tag{
                                display: inline-block;
                                max-width: 140px;
                                .text-overflow();
                            }
                        }
                    }
                }
                .apply-status{
                    padding: 0 30px;
                    height: 40px;
                    line-height: 40px;
                    background: #f8f9fc;
                    color: @promptColor;
                    span:last-child{
                        float: right;
                    }
                }
            }
        }
    }
    .applicant{
        flex-shrink: 0;
        > div {
            width: 300px;
            padding: 30px;
            background: @background;
            & + div{
                margin-top: 20px;
            }
        }
        .applicant-card{
            .applicant-description{
                margin-bottom: 60px;
                text-align: center;
                p{
                    line-height: 25px;
                    &:first-of-type{
                        font-size: 16px;
                        line-height: 32px;
                    }
                }
            }
            .resume{
                margin-bottom: 30px;
                p{
                    margin-bottom: 8px;
                    display: flex;
                    justify-content: space-between;
                    span:last-child{
                        margin-right: 2px;
                    }
                }
            }
            .user-click{
                .el-button{
                    width: 110px;
                }
            }
        }
        .job-intention{
            .content{
                margin-top: 30px;
            }
            p{
                font-size: 15px;
                height: 32px;
                line-height: 32px;
                i{
                    font-size: 20px;
                    margin-right: 16px;
                }
                span{
                    display: inline-block;
                    transform: translateY(-1px);
                }
            }
        }
    }
    
}
</style>