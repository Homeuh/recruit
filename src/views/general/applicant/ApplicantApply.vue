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
                 @click="navSelect(nav,index)"
            >{{ nav }}
            </div>
          </nav>
          <div class="apply" v-if="applyList.length === 0">
            <el-empty :image-size="200"></el-empty>
          </div>
          <div class="apply" v-else>
            <ul>
              <li v-for="(apply,index) in applyList" :key="apply.job_duty + index">
                <div class="apply-job">
                  <div class="job-request">
                    <el-link href="/profession/detail">
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
                    <el-link href="/company/detail" class="company-logo">
                      <img :src="apply.company_logo" :alt="apply.company_name"
                           style="width: 56px; height: 56px; margin-right: 16px"/>
                    </el-link>
                    <el-link href="/company/detail" class="company-name">{{ apply.company_name}}</el-link>
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
    import SymbolIcon from "@/components/SymbolIcon";
    export default {
        name: "ApplicantApply",
        components: { GeneralTopBar, GeneralFooter, SymbolIcon},
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
                currentMenu: "投递职位",
                navList: ["全部","不合适","已投递","被查看","感兴趣","邀面试","已结束"],
                currentNav: "全部",
                applyList: [],
                apply_status: "",
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
                    },
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
                    },
                ],*/
                currentPage: 1,
                pageSize: 6,
                total: 1000,
            }
        },
        created() {
            this.$store.commit("setLogin");
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: `/apply/page`,
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        apply_status: this.apply_status,
                        login_id: this.$store.state.login_id
                    }
                })
                console.log(res);
                if(res.msg === "success") {
                    res.data.applyList.forEach(item => {
                        item.company_logo = require("@/image/company/" + item.company_logo);
                    });
                    this.total = res.data.total;
                    this.applyList = Object.assign([], [], res.data.applyList);
                }
            },
            menuSelect(name) {
                this.currentMenu = name;
            },
            navSelect(nav,index){
                this.currentNav = nav;
                if(index === 0) {
                    this.apply_status = "";
                } else {
                    this.apply_status = (index-1).toString();
                }
                this.currentPage = 1;
                this.initData();
            },
            handleCurrentChange(value) {
                this.currentPage = value;
                this.initData();
                // console.log(value)
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
            .apply{
                padding: 30px;
                ul {
                    margin: 20px 0;
                    li{
                        border: 1px solid @borderColor;
                        &:hover{
                            box-shadow: 0 0 10px 0 rgba(56,81,76,.12);
                        }
                        & + li{
                            margin-top: 25px;
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
        }
        .page{
            text-align: center;
            .el-pagination{
                margin-top: 50px;
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
</style>