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
        <h2>
          <span>职位收藏</span>
          <span>（共{{ collect_num }}条）</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全选">全选</el-dropdown-item>
              <el-dropdown-item command="一键删除">一键删除</el-dropdown-item>
              <el-dropdown-item command="一键投递">一键投递</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </h2>
        <div class="collect" v-if="collectList.length === 0">
          <el-empty :image-size="200"></el-empty>
        </div>
        <div class="collect" v-else>
          <ul>
            <li v-for="(collect,index) in collectList" :key="collect.job_duty + index">
              <input class="checkbox"
                     type="checkbox"
                     :value="collect.collect_id"
                     v-model="checkCollect"/>
              <div class="collect-job">
                <div class="job-request">
                  <el-link href="/profession/detail">
                    <span class="job-duty">{{ collect.job_duty }}</span>
                    <span class="job-salary">{{ collect.job_salary }}</span>
                  </el-link>
                  <p>
                    <span>{{ collect.office_city}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>{{ collect.job_year}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>{{ collect.education}}</span>
                  </p>
                </div>
                <div class="company-info">
                  <el-link href="/company/detail" class="company-logo">
                    <img :src="collect.company_logo" :alt="collect.company_name"
                         style="width: 56px; height: 56px; margin-right: 16px"/>
                  </el-link>
                  <el-link href="/company/detail" class="company-name">{{ collect.company_name}}</el-link>
                  <p class="company-description">
                    <span class="company-tag" :title="collect.company_tag">{{ collect.company_tag}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>{{ collect.company_type}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>{{ collect.company_size}}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
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
        </div>
      </div>
    </main>
    <!-- 底部信息栏 -->
    <GeneralFooter />
  </div>
</template>

<script>
    import GeneralTopBar from "@/components/GeneralTopBar";
    import GeneralFooter from "@/components/GeneralFooter";
    import SymbolIcon from "@/components/SymbolIcon";

    export default {
        name: "ApplicantCollect",
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
                currentMenu: "职位收藏",
                collect_num: 18,
                collectList: [
                    {
                        collect_id: 1,
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
                        collect_id: 2,
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
                        collect_id: 3,
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
                        collect_id: 4,
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
                        collect_id: 5,
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
                        collect_id: 6,
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
                        collect_id: 7,
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
                        collect_id: 8,
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
                        collect_id: 9,
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
                        collect_id: 10,
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
                        collect_id: 11,
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
                        collect_id: 12,
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
                ],
                checkCollect: [],
                currentPage: 1,
                total: 1000,
            }
        },
        methods: {
            menuSelect(name) {
                this.currentMenu = name;
            },
            handleCommand(command) {
                console.log(command)
                switch(command){
                    case "全选":
                        if (this.checkCollect.length !== this.collectList.length) {
                            this.checkCollect.splice(0, this.checkCollect.length);
                            this.collectList.forEach(collect => {
                                this.checkCollect.push(collect.collect_id);
                            })
                        } else {
                            this.checkCollect.splice(0, this.checkCollect.length);
                        }
                        break;
                    case "一键投递":
                        break;
                    case "一键删除":
                        break;
                }
            },
            navSelect(nav){
                this.currentNav = nav;
            },
            handleCurrentChange(value) {
                console.log(value)
                console.log(this.$route)
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
        .main-content {
            flex: 1 1 auto;
            margin-right: 20px;
            padding: 30px;
            background: @background;
            h2{
                font-size: 20px;
                position: relative;
                > span{
                    &:first-child{
                        color: @fontColor;
                        font-size: 20px;
                        font-weight: bold;
                    }
                    color: @promptColor;
                    font-size: 14px;
                    font-weight: normal;
                }
                .el-dropdown{
                    font-size: 1em;
                    float: right;
                    color: @fontColor;
                    .el-link-active();
                    cursor: pointer;
                }
            }
            .collect{
                padding: 30px 0;
                ul {
                    margin: 20px 0;
                    li{
                        border: 1px solid @borderColor;
                        margin-left: 30px;
                        position: relative;
                        .checkbox{
                            margin-left: 0;
                            position: absolute;
                            left: -31px;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        &:hover{
                            box-shadow: 0 0 10px 0 rgba(56,81,76,.12);
                        }
                        & + li{
                            margin-top: 25px;
                        }
                        .collect-job{
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