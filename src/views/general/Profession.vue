<template>
    <div class="container">
      <GeneralTopBar />
      <main>
        <!-- 筛选条件盒子 -->
        <div class="filter-box">
          <div class="search margin-20per">
            <!-- 搜索框 -->
            <div class="search-form margin-10per">
              <el-input placeholder="搜索职位、公司" v-model="searchKey" class="search-input">
                <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <!-- 工作城市选择 -->
            <div class="condition-box">
              <dl>
                <dd>
                  <span class="default-condition">全国</span>
                  <span class="hot-city">热门城市：</span>
                  <el-link v-for="city in hotCity" :key="city">{{ city }}</el-link>
                  <el-button type="text" class="select-city">筛选城市</el-button>
                </dd>
              </dl>
            </div>
            <!-- 工作条件匹配 -->
            <div class="filter-select-box">
              <SelectWrapper
                    v-for="(condition,index) in filterConditions"
                    :key="condition.label + index"
                    :label="condition.label" :options="condition.options"
              />
              <span class="clear-condition">清空所有条件</span>
            </div>
          </div>
        </div>
        <!-- 职位信息 -->
        <div class="job-box margin-20per">
          <div class="job-list">
            <ul>
              <li v-for="(job, jobIndex) in jobList" :key="job.name + jobIndex">
                <div class="job-wrapper">
                  <div class="info-primary">
                    <div class="job-info">
                      <div class="job-title">
                        <span>{{ job.name }}</span>
                        <span>[{{ job.address }}]</span>
                      </div>
                      <div class="job-limit">
                        <span>{{ job.salary }}</span>
                        <span>{{ job.experience }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>{{ job.qualification }}</span>
                        <div class="interviewer">
                          <i class="el-icon-chat-dot-round"></i>
                          <span>{{ job.interviewer }}</span>
                          <el-divider direction="vertical"></el-divider>
                          <span>{{ job.interviewerDuty }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="company-info">
                      <div class="company-text">
                        <div class="company-name">
                          <span>{{ job.companyName }}</span>
                        </div>
                        <div class="company-detail">
                          <span>{{ job.companyTag }}</span>
                          <el-divider direction="vertical"></el-divider>
                          <span>{{ job.companySize }}</span>
                        </div>
                      </div>
                      <el-link>
                        <img :src="job.companyIcon" :alt="job.companyName"
                             style="width: 56px; height: 56px;
                                    border-radius: 9px; object-fit: cover"
                        />
                      </el-link>
                    </div>
                  </div>
                </div>
                <div class="info-append">
                  <div class="job-tag">
                    <span v-for="(item,itemIndex) in job.tag" :key="item + itemIndex">
                      {{ item }}
                    </span>
                  </div>
                  <div class="company-benefit">
                    <span>&quot;{{ job.companyBenefit }}&quot;</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 分页栏 -->
        <div class="page margin-20per">
          <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="100"
                background
                layout="prev, pager, next"
                :total="total">
          </el-pagination>
        </div>
      </main>
      <GeneralFooter />
    </div>
</template>

<script>
import GeneralTopBar from "../../components/GeneralTopBar";
import GeneralFooter from "../../components/GeneralFooter";
import SelectWrapper from "../../components/SelectWrapper.vue";
export default {
    name: "Profession",
    components: {
        GeneralTopBar, GeneralFooter, SelectWrapper
    },
    data() {
        return {
            searchKey: "",
            hotCity: ["全国","北京","上海","广州","深圳","杭州","西安","厦门","长沙","武汉","天津","成都","重庆","苏州"],
            filterConditions: [
                {
                    label: "工作经验", options: ["不限","在校生/应届生","1年以内","1-3年","3-5年","5-10年","10年以上"]
                },
                {
                    label: "学历水平", options: ["不限","初中及以下","中专","高中","大专","本科","硕士","博士"]
                },
                {
                    label: "薪资要求", options: ["不限","3K以下","3-5K","5-10K","10-15K","15-20K","20-30K","30-50K","50K以上"]
                },
                {
                    label: "公司规模", options: ["不限","0-20人","20-99人","100-499人","500-999人","1000-9999人","10000人以上"]
                }
            ],
            jobList: [
                {
                    name: "前端工程师", address: "深圳·南山",
                    salary: "10-15K", experience: "1年以内",
                    qualification: "本科", interviewer: "王先生",
                    interviewerDuty: "前端组长",companyName: "迅雷网络",
                    companyTag: "移动互联网", companySize: "1000-5000人",
                    companyIcon: require("@/image/company/xunlei.jpg"),
                    tag: ["JavaScript","Vue","React"],
                    companyBenefit: "下午茶,健身瑜伽,团队氛围好,用户过亿"
                },
                {
                    name: "Web前端开发工程师", address: "深圳·福田",
                    salary: "10-20K·13薪", experience: "1年-3年",
                    qualification: "本科", interviewer: "宋女士",
                    interviewerDuty: "HR",companyName: "KLOOK 客路旅行",
                    companyTag: "旅游，出行", companySize: "50-100人",
                    companyIcon: require("@/image/company/kelu.jpg"),
                    tag: ["电商平台","旅游 | 出行","Web前端"],
                    companyBenefit: "五险一金,带薪年假,节日福利"
                },
                {
                    name: "前端开发工程师", address: "深圳·车公庙",
                    salary: "12-20K", experience: "经验不限",
                    qualification: "不限", interviewer: "汤女士",
                    interviewerDuty: "人事", companyName: "微基因 WeGene",
                    companyTag: "移动互联网，医疗", companySize: "50-150人",
                    companyIcon: require("@/image/company/wegene.jpg"),
                    tag: ["医疗 | 保健 | 美容","数据服务 | 咨询","JavaScript"],
                    companyBenefit: "五险一金,绩效奖金,带薪年假,定期体检"
                },
                {
                    name: "前端开发工程师", address: "深圳·南山",
                    salary: "15-25K·14薪", experience: "3年以上",
                    qualification: "本科及以上", interviewer: "谢女士",
                    interviewerDuty: "人事", companyName: "瑰琦科技",
                    companyTag: "移动互联网，硬件", companySize: "50人以下",
                    companyIcon: require("@/image/company/guiqikeji.jpg"),
                    tag: ["物联网","智能硬件","Html5"],
                    companyBenefit: "薪资待遇好，发展前景好"
                },
                {
                    name: "前端开发工程师", address: "深圳·南山",
                    salary: "12-24K·14薪", experience: "2年以上",
                    qualification: "不限", interviewer: "李先生",
                    interviewerDuty: "开发工程师", companyName: "思维巡航",
                    companyTag: "软件服务", companySize: "15-50人",
                    companyIcon: require("@/image/company/siwei.jpg"),
                    tag: ["TypeScript","Angular","SAAS"],
                    companyBenefit: "上市公司，氛围好，加班少，双休，每周水果供应"
                },
                {
                    name: "中高级前端开发工程师", address: "深圳·南山",
                    salary: "8-15K",experience: "经验不限",
                    qualification: "本科", interviewer: "曾女士",
                    interviewerDuty: "人事主管", companyName: "美团",
                    companyTag: "消费生活", companySize: "2000人以上",
                    companyIcon: require("@/image/company/meituan.jpg"),
                    tag: ["JavaScript","React","TypeScript"],
                    companyBenefit: "双休、加班少、年终奖、节日礼品、体检、旅游"
                },
                {
                    name: "前端开发工程师", address: "深圳·南山",
                    salary: "25-40K·15K", experience: "经验不限",
                    qualification: "本科及以上", interviewer: "王女士",
                    interviewerDuty: "招聘专员", companyName: "字节跳动",
                    companyTag: "人工智能 | IM通讯", companySize: "5000人以上",
                    companyIcon: require("@/image/company/zijie.jpg"),
                    tag: ["移动端","小程序","web前端"],
                    companyBenefit: "下午茶,团队氛围好,晋升空间大"
                },
                {
                    name: "前端开发工程师", address: "深圳·南山",
                    salary: "13-26K",experience: "经验不限",
                    qualification: "不限", interviewer: "郭先生",
                    interviewerDuty: "开发工程师", companyName: "科瑞尔人力资源服务",
                    companyTag: "企业服务", companySize: "2000人以上",
                    companyIcon: require("@/image/company/keruier.jpg"),
                    tag: ["软件服务 | 咨询","IT技术服务 | 咨询","React"],
                    companyBenefit: "技术大牛 国际化团队 高速增长 极客文化"
                },
                {
                    name: "Web前端开发工程师", address: "深圳·南山",
                    salary: "5-10K", experience: "1年及以上",
                    qualification: "大专及以上", interviewer: "冯先生",
                    interviewerDuty: "开发工程师", companyName: "云麦网络",
                    companyTag: "MCN | 直播平台", companySize: "15-50人",
                    companyIcon: require("@/image/company/yunmai.jpg"),
                    tag: ["社交媒体","社交平台","web前端开发"],
                    companyBenefit: "零食下午茶，节日福利，员工旅游，带薪年假，定期体检"
                },
                {
                    name: "前端开发工程师", address: "深圳·南山",
                    salary: "8-14K", experience: "3-5年",
                    qualification: "大专及以上", interviewer: "刘先生",
                    interviewerDuty: "中级开发工程师", companyName: "游戏科学",
                    companyTag: "游戏开发", companySize: "50-150人",
                    companyIcon: require("@/image/company/youxikexue.jpg"),
                    tag: ["JavaScript","移动端","React"],
                    companyBenefit: "团队氛围好,晋升空间大,免费三餐"
                },
                {
                    name: "中高级前端开发工程师", address: "深圳·南山",
                    salary: "8-14K", experience: "5年以上",
                    qualification: "大专及以上", interviewer: "张先生",
                    interviewerDuty: "高级开发工程师", companyName: "捷顺科技股份",
                    companyTag: "生活服务，智能硬件", companySize: "2000人以上",
                    companyIcon: require("@/image/company/jieshun.jpg"),
                    tag: ["JavaScript","移动端","React"],
                    companyBenefit: "上市公司、技术大牛、股权激励、食堂宿舍"
                },
                {
                    name: "web前端开发工程师", address: "深圳·宝安",
                    salary: "8-14K", experience: "5年以上",
                    qualification: "大专及以上", interviewer: "黄女士",
                    interviewerDuty: "人力资源", companyName: "果酱时代",
                    companyTag: "MCN | 直播平台", companySize: "50-150人",
                    companyIcon: require("@/image/company/guojiang.jpg"),
                    tag: ["Vue.js","ES6","微信小程序","桌面端","React.js"],
                    companyBenefit: "朝阳行业，多元文化，特色福利"
                },
            ],
            currentPage: 1,
            total: 1000,
        }
    },
    methods: {
        handleCurrentChange(value) {
            console.log(value)
        }
    }
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
.span-active{
    transition: .3s;
    &:hover{
        color: #1abc9c;
    }
    &:active{
        color: #16a085;
    }
}
@mainColor: #5dd5c8;
@activeColor: #00c2b3;
@fontColor: #61687c;
main{
    overflow: hidden;
    .filter-box{
        background: #ffffff;
        box-shadow: 0 3px 6px rgba(6,0,1,.05);
        .search{
            .search-form {
                width: 80%;
                padding-top: 20px;
                .search-input {
                    /deep/ .el-input__inner {
                        height: 48px;
                        line-height: 48px;
                        font-size: 16px;
                    };
                    /deep/ .el-input-group__append {
                        background: @mainColor;
                        color: #ffffff;
                        text-align: center;
                        padding: 0 50px;
                        font-size: 24px;
                        cursor: pointer;
                        &:hover {
                            opacity: .9;
                        }
                    }
                };
                .search-hot {
                    padding-top: 10px;
                    padding-bottom: 40px;
                    font-size: 13px;
                    color: #9fa3b0;
                    b {
                        font-weight: 400;
                    }
                    .el-link {
                        white-space: nowrap;
                        margin-left: 15px;
                        font-weight: 400;
                        font-size: 13px;
                        color: #9fa3b0;
                      .el-link-active();
                    }
                }
            }
            .condition-box{
                margin-top: 10px;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #eef0f5;
                font-size: 13px;
                dl{
                    dd{
                        span:first-child{
                            color: #999;
                            margin-right: 40px;
                        }
                        .el-link{
                            font-size: 13px;
                            margin-left: 15px;
                            color: #414a60;
                            .el-link-active();
                            & + .el-link{
                                margin-left: 20px;
                            }
                        }
                        .select-city{
                            height: 40px;
                            line-height: 40px;
                            font-size: 12px;
                            float: right;
                            color: #414a60;
                            .span-active();
                        }
                    }
                }
            }
            .filter-select-box{
                font-size: 12px;
                .select-wrapper + .select-wrapper{
                    margin-left: 60px;
                }
                .clear-condition{
                    height: 40px;
                    line-height: 40px;
                    color: #8d92a1;
                    float: right;
                    cursor: pointer;
                    .span-active();
                }
            }
        }
    }
    .job-box{
        margin-top: 30px;
        .job-list{
            margin-right: 300px;
            ul{
                li{
                    background: #fff;
                    color: #61687c;
                    margin-bottom: 12px;
                    &:hover{
                        box-shadow: 0 0 10px 0 rgba(56,81,76,.12);
                    }
                    .job-wrapper{
                        margin: 0 30px;
                        .info-primary{
                            padding-top: 20px;
                            height: 90px;
                            line-height: 26px;
                            .job-info{
                                float: left;
                                .job-title{
                                    font-size: 16px;
                                    color: @activeColor;
                                    span{
                                        cursor: pointer;
                                        & + span{
                                            margin-left: 10px;
                                        }
                                    }
                                }
                                .job-limit{
                                    font-size: 12px;
                                    span:first-child{
                                        font-size: 16px;
                                        color: #fb670f;
                                        margin-right: 12px;
                                    }
                                    .interviewer{
                                        display: inline-block;
                                        margin-left: 12px;
                                        padding: 0 10px;
                                        border: 1px solid #ecedef;
                                        border-radius: 12px;
                                        height: 21px;
                                        line-height: 21px;
                                        i{
                                            margin-right: 6px;
                                            color: @activeColor;
                                        }
                                        .el-divider{
                                            transform: translateY(-1px);
                                        }
                                    }
                                }
                            }
                            .company-info{
                                width: 300px;
                                float: right;
                                position: relative;
                                .company-text{
                                    font-size: 12px;
                                    margin-right: 100px;
                                    .company-name{
                                        font-size: 16px;
                                        color: @activeColor;
                                        span{
                                            cursor: pointer;
                                        }
                                    }
                                    .company-detail{
                                        .el-divider{
                                            transform: translateY(-1px);
                                        }
                                    }
                                }
                                .el-link{
                                    position: absolute;
                                    top: 0;
                                    right: 0;
                                }
                            }
                        }
                    }
                    .info-append{
                        height: 40px;
                        line-height: 40px;
                        background: #f8f9fc;
                        padding: 0 30px;
                        .job-tag{
                            float: left;
                            font-size: 12px;
                            span{
                                display: inline-block;
                                padding: 0 8px;
                                height: 22px;
                                line-height: 22px;
                                border: 1px solid #f0f0f0;
                                border-radius: 3px;
                                & + span{
                                    margin-left: 10px;
                                }
                            }
                        }
                        .company-benefit{
                            width: 300px;
                            float: right;
                            font-size: 13px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
    }
    .page{
        text-align: center;
        .el-pagination{
            margin-right: 300px;
            margin-top: 18px;
            /deep/ button, /deep/ li {
                background: #fff;
            }
            /deep/ li:not(.disabled).active{
                background-color: @activeColor;
                color: #FFF;
            }
        }
    }
}
</style>