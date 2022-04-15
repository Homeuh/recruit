<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <GeneralTopBar :showPosition="false"/>
    <main>
      <div class="company-header">
        <div class="company-box margin-20per">
          <div class="company-wrapper">
            <img :src="company.company_logo" :alt="company.company_full_name"
                 style="width: 164px; height: 164px;"/>
            <div class="company-primary">
              <h1 class="company-name">{{ company.company_full_name}}</h1>
              <p class="company-description">{{ company.company_description }}</p>
              <div class="company-info">
                <div class="info-wrapper">
                  <el-link>{{ company.job_total }}个</el-link>
                  <p>招聘职位</p>
                </div>
                <div class="info-wrapper">
                  <el-link>{{ company.resume_feedback }}%</el-link>
                  <p>简历反馈率</p>
                </div>
                <div class="info-wrapper">
                  <el-link>{{ company.evaluation_total }}个</el-link>
                  <p>面试评价</p>
                </div>
                <div class="info-wrapper">
                  <el-link>{{ company.login_date}}</el-link>
                  <p>企业最近登录</p>
                </div>
              </div>
            </div>
            <div class="user-share">
              <span>分享</span>
              <span><i class="el-icon-weixin"></i></span>
            </div>
          </div>
        </div>
        <div class="company-tab margin-20per">
          <el-link :href="'/company/detail?company_id=' + company.company_id" :class="{'is-active': $route.path === '/company/detail'}">公司主页</el-link>
          <el-link :href="'/company/job?company_id=' + company.company_id" :class="{'is-active': $route.path === '/company/job'}">在招职位</el-link>
          <el-link :href="'/company/evaluation?company_id=' + company.company_id" :class="{'is-active': $route.path === '/company/evaluation'}">面试评价</el-link>
        </div>
      </div>
      <div class="company-main margin-20per">
        <aside ref="aside">
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
          <div class="company-job">
            <h3>在招职位</h3>
            <ul>
              <li v-for="(rej,index) in recruit_job" :key="rej.job_duty + index">
                <el-link class="job-duty" :title="rej.job_duty"> {{ rej.job_duty }}</el-link>
                <p class="job-salary">{{ rej.job_salary }}</p>
                <p class="job-request">
                  <span>{{ rej.office_city }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{ rej.job_year }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{ rej.education }}</span>
                </p>
              </li>
            </ul>
              <el-link :href="'/company/job?company_id=' + company.company_id"
                       class="show-more"
              >查看更多职位<i class="el-icon-arrow-right"></i>
              </el-link>
          </div>
        </aside>
        <div class="company-job-box" ref="company_job_box">
          <div class="filter-select-box">
            <b>筛选职位：</b>
            <div class="filter-select-condition">
              <SelectWrapper
                    v-for="(condition,index) in filterConditions"
                    :key="condition.label + index"
                    :label="condition.label" :options="condition.options"
              />
            </div>
          </div>
          <div class="filter-job">
            <el-link v-for="(fjob,index) in filterJob" :key="fjob.job_duty + index"
                     :href="'/profession/detail?job_id=' + fjob.job_id">
              <h2>
                <span class="job-duty">{{ fjob.job_duty }}</span>
                <span class="job-salary">{{ fjob.job_salary }}</span>
              </h2>
              <div class="job-info">
                <div class="job-request">
                  <span>{{  fjob.office_city }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{  fjob.job_year }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{  fjob.education }}</span>
                </div>
                <div class="recruiter-info">
                  <img :src="fjob.recruiter_avatar" :alt="fjob.recruiter_name"
                       style="width: 25px; height: 25px; border-radius: 50%"/>
                  <span>{{ fjob.recruiter_name }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{  fjob.recruiter_duty }}</span>
                </div>
              </div>
            </el-link>
          </div>
          <!-- 分页栏 -->
          <div class="page margin-20per">
            <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="pageSize"
                  background
                  layout="prev, pager, next"
                  :total="total">
            </el-pagination>
          </div>
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
import SelectWrapper from "../../../components/SelectWrapper.vue";
import setMinHeight from "@/utils/setMinHeight";
export default {
    name: "CompanyJob",
    components: { GeneralTopBar, GeneralFooter, SelectWrapper},
    data() {
        return {
            company: {},
            /*company: {
                    company_full_name: "深圳市迅雷网络技术有限公司",
                    company_name: "迅雷网络",
                    company_logo: require("@/image/company/xunlei.jpg"),
                    company_description: "基于共享经济的互联网云计算平台",
                    company_address: "深圳南山区深圳湾科技生态园12栋B座21-23F",
                    company_tag: "移动互联网",
                    company_type: "上市公司",
                    company_size: "1000-5000人",
                    company_website: "www.xunlei.com",
                    company_introduction: "迅雷产品迅雷X手机迅雷迅雷影音产品logo迅雷客户端移动app精彩，一下就有！迅雷介绍迅雷集团（纳斯达克：XNET）成立于2003年，是全球领先的共享计算与区块链技术创新企业，同时也是中国用户最多，历史最悠久的互联网品牌之一。迅雷旗下网心科技独创了共享计算模式，在此基础上推出的超级区块链平台迅雷链，具备全球领先的百万TPS高并发、秒级确认的领先性能，大幅提升了区块链技术的性能水准，致力于打造全球最大规模ToC区块链商业生态。迅雷面向个人用户和企业用户打造了丰富的下载加速、区块链、云计算、影音娱乐等产品及服务，为超过4亿用户创造了高效、智能、安全的互联网体验\n（手机也可找工作，投简历！关注“迅雷招聘”微信公众号，随时随地关注迅雷招聘动态，手指轻轻一点即可投递简历，使您的求职更加方便快捷！）",
                    job_total: 52,
                    resume_feedback: "96",
                    evaluation_total: 26,
                    login_date: "3天内"
                },*/
            filterConditions: [
                {
                    label: "行业类型", options: ["全部","技术","产品","运营","设计","销售","咨询/翻译/法律","人事/财务/行政","市场","其他"]
                },
                {
                    label: "工作城市", options: ["全部","北京","上海","深圳","广州"]
                },
                {
                    label: "经验要求", options: ["不限","在校生/应届生","1年以内","1-3年","3-5年","5-10年","10年以上"]
                },
                {
                    label: "学历要求", options: ["不限","初中及以下","中专","高中","大专","本科","硕士","博士"]
                },
                {
                    label: "薪资待遇", options: ["不限","3K以下","3-5K","5-10K","10-15K","15-20K","20-30K","30-50K","50K以上"]
                }
            ],
            filterJob: [],
            /*filterJob: [
                {
                    job_duty: "高级前端开发工程师",
                    job_salary: "25-45K·16薪",
                    office_city: "深圳",
                    job_year: "3年以上",
                    education: "本科",
                    recruiter_name: "赵先生",
                    recruiter_avatar: require("@/image/avatar/recruiter_zhao.png"),
                    recruiter_duty: "资深前端"
                },
                {
                    job_duty: "ios移动开发工程师",
                    job_salary: "18-30K·16薪",
                    office_city: "杭州",
                    job_year: "3-5年",
                    education: "本科",
                    recruiter_name: "李女士",
                    recruiter_avatar: require("@/image/avatar/recruiter_li.png"),
                    recruiter_duty: "招聘主管"
                },
                {
                    job_duty: "游戏开发工程师",
                    job_salary: "20-40K·16薪",
                    office_city: "广州",
                    job_year: "3-5年",
                    education: "本科及以上",
                    recruiter_name: "陈女士",
                    recruiter_avatar: require("@/image/avatar/recruiter_chen.png"),
                    recruiter_duty: "HR"
                },
                {
                    job_duty: "内容运营",
                    job_salary: "20-40K·15薪",
                    office_city: "北京",
                    job_year: "1-3年",
                    education: "本科",
                    recruiter_name: "黄女士",
                    recruiter_avatar: require("@/image/avatar/recruiter_huang.png"),
                    recruiter_duty: "招聘主管"
                },
                {
                    job_duty: "销售总监",
                    job_salary: "50-80K·16薪",
                    office_city: "深圳",
                    job_year: "5-10年",
                    education: "本科",
                    recruiter_name: "苏女士",
                    recruiter_avatar: require("@/image/avatar/recruiter_su.png"),
                    recruiter_duty: "招聘总监"
                },
                {
                    job_duty: "资深后台开发工程师",
                    job_salary: "40-60K·16薪",
                    office_city: "深圳",
                    job_year: "5-10年",
                    education: "本科",
                    recruiter_name: "林先生",
                    recruiter_avatar: require("@/image/avatar/recruiter_lin.png"),
                    recruiter_duty: "高级招聘经理"
                },
                {
                    job_duty: "前端开发工程师",
                    job_salary: "10-15K",
                    office_city: "深圳",
                    job_year: "1年以上",
                    education: "本科",
                    recruiter_name: "王先生",
                    recruiter_avatar: require("@/image/avatar/recruiter_wang.png"),
                    recruiter_duty: "前端组长"
                },
                {
                    job_duty: "服务器开发工程师",
                    job_salary: "30-60K·16薪水",
                    office_city: "深圳",
                    job_year: "5-10年",
                    education: "本科",
                    recruiter_name: "高先生",
                    recruiter_avatar: require("@/image/avatar/recruiter_gao.png"),
                    recruiter_duty: "高级招聘经理"
                },
                {
                    job_duty: "产品经理",
                    job_salary: "25-50K·16薪水",
                    office_city: "深圳",
                    job_year: "3-5年",
                    education: "本科",
                    recruiter_name: "秦女士",
                    recruiter_avatar: require("@/image/avatar/recruiter_qin.png"),
                    recruiter_duty: "招聘经理"
                },
                {
                    job_duty: "Android开发工程师",
                    job_salary: "20-40K·16薪水",
                    office_city: "深圳",
                    job_year: "3-5年",
                    education: "本科",
                    recruiter_name: "吴女士",
                    recruiter_avatar: require("@/image/avatar/recruiter_wu.png"),
                    recruiter_duty: "高级招聘经理"
                }
            ],*/
            recruit_job: [],
            /*recruit_job: [
                    {
                        job_duty: "高级前端开发工程师",
                        job_salary: "25-45K·16薪",
                        office_city: "深圳",
                        job_year: "3年以上",
                        education: "本科"
                    },
                    {
                        job_duty: "ios移动开发工程师",
                        job_salary: "18-30K·16薪",
                        office_city: "杭州",
                        job_year: "3-5年",
                        education: "本科"
                    },
                    {
                        job_duty: "游戏开发工程师",
                        job_salary: "20-40K·16薪",
                        office_city: "广州",
                        job_year: "3-5年",
                        education: "本科及以上"
                    },
                    {
                        job_duty: "内容运营",
                        job_salary: "20-40K·15薪",
                        office_city: "北京",
                        job_year: "1-3年",
                        education: "本科"
                    },
                    {
                        job_duty: "销售总监",
                        job_salary: "50-80K·16薪",
                        office_city: "深圳",
                        job_year: "5-10年",
                        education: "本科"
                    },
                ],*/
            currentPage: 1,
            pageSize: 10,
            total: 1000,
        }
    },
    created() {
        this.initData();
    },
    mounted() {
        // 设置页面主内容最小高度
        setMinHeight(this, this.$refs.company_job_box);
    },
    methods: {
        initData() {
            this.$axios.all([this.getCompany(),this.getFilterJob(),this.getRecruitJob()]);
        },
        async getCompany() {
            const res = await this.$axios.request({
                url: `/company/info/${this.$route.query.company_id}`,
                method: "get",
            });
            console.log(res);
            if(res.msg === 'success'){
                res.data.company.company_logo = require("@/image/company/" + res.data.company.company_logo);
                this.company = Object.assign({},{},res.data.company);
            }
        },
        async getFilterJob() {
            const res = await this.$axios.request({
                url: `/company/pageJob/${this.$route.query.company_id}`,
                method: "get",
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
            });
            console.log(res);
            if(res.msg === 'success'){
                res.data.filterJob.forEach(item => {
                    item.recruiter_avatar = require("@/image/avatar/" + item.recruiter_avatar);
                })
                this.total = res.data.total;
                this.filterJob = Object.assign([],[],res.data.filterJob);
            }
        },
        async getRecruitJob() {
            const res = await this.$axios.request({
                url: `/company/listJob/${this.$route.query.company_id}`,
                method: "get",
            });
            console.log(res);
            if(res.msg === 'success'){
                this.recruit_job = Object.assign([],[],res.data.recruit_job);
            }
        },
        filter(data) {
            return data.split("\n");
        },
        handleCurrentChange(value) {
            // console.log(value)
            this.currentPage = value;
            this.getFilterJob();
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
    .company-header{
        background: @background;
        padding-top: 30px;
        overflow: hidden;
        .company-box{
            background: #fff;
            padding: 10px 20px;
            .company-wrapper{
                position: relative;
                img{
                    float: left;
                }
                .company-primary{
                    height: 164px;
                    margin-left: 180px;
                    padding: 16px 0;
                    h1{
                        font-size: 32px;
                        font-weight: 500;
                    }
                    > p{
                        font-size: 16px;
                        line-height: 50px;
                    }
                    .company-info{
                        .info-wrapper{
                            display: inline-block;
                            padding: 0 36px;
                            position: relative;
                            &:first-of-type{
                                padding-left: 8px;
                            }
                            &:last-of-type::after{
                                display: none;
                            }
                            &::after{
                                content: "";
                                display: inline-block;
                                width: 1px;
                                height: 40px;
                                background: @borderColor;
                                position: absolute;
                                top: 4px;
                                right: 0;
                            }
                            .el-link{
                                font-size: 21px;
                                font-weight: 500;
                                display: flex;
                                color: @fontColor;
                              .el-link-active();
                            }
                            p{
                                color: @promptColor;
                            }
                        }
                    }
                }
                .user-share{
                    color: @promptColor;
                    line-height: 36px;
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
        .company-tab{
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
    .company-main{
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
            .company-info{
                margin-top: 40px;
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
            .company-job{
                ul li{
                    margin-top: 25px;
                    padding-bottom: 25px;
                    border-bottom: 1px dashed @borderColor;
                    font-size: 16px;
                    .job-duty{
                        font-size: inherit;
                        color: @fontColor;
                        display: inline-block;
                        max-width: 130px;
                      .text-overflow();
                      .el-link-active();
                    }
                    .job-salary{
                        display: inline-block;
                        float: right;
                        color: @salaryColor;
                    }
                    .job-request{
                        color: @promptColor;
                        font-size: 13px;
                        margin-top: 8px;
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
        .company-job-box{
            padding: 40px 40px 100px 20px;
            border-right: 20px solid @background;
            margin-right: 300px;
            > div + div{
                margin-top: 50px;
            }
            .filter-select-box{
                padding: 10px 20px;
                border: 1px solid @borderColor;
                display: flex;
                b{
                    font-size: 14px;
                    font-weight: 400;
                    white-space: nowrap;
                    margin-right: 20px;
                    height: 40px;
                    line-height: 40px;
                }
                .filter-select-condition {
                    flex: 1;
                    display: inline-flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
            }
            .filter-job{
                .el-link{
                    display: block;
                    margin: 0;
                    color: @fontColor;
                    padding: 20px 30px;
                    border: 1px solid @borderColor;
                    /deep/ .el-link--inner{
                        display: block;
                    }
                    &:hover{
                        box-shadow: 0 0 10px 0 rgba(56,81,76,.12);
                        
                            .el-link-active();
                    }
                    & + .el-link{
                        margin-top: 12px;
                    }
                    h2{
                        display: flex;
                        justify-content: space-between;
                        font-size: 18px;
                        font-weight: 600;
                        .job-salary{
                            color: @salaryColor;
                        }
                    }
                    .job-info{
                        display: flex;
                        justify-content: space-between;
                        line-height: 32px;
                        .job-request{
                            color: @promptColor;
                        }
                        .recruiter-info{
                            color: @fontColor;
                            img{
                                margin-right: 8px;
                            }
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
            .page{
                text-align: center;
                .el-pagination{
                    //margin-right: 300px;
                    /deep/ button, /deep/ li {
                        background: #fff;
                    }
                    /deep/ li{
                        &:not(.disabled):hover{
                            color: @activeColor;
                        }
                        &:not(.disabled).active{
                            background-color: @activeColor;
                            color: #FFF;
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