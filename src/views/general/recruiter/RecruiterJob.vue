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
          <div class="job">
            <div class="filter-select">
              <div class="filter-job-industry">
                <ul>
                  <li v-for="(industry,index) in filterIndustry"
                      :key="industry.job_industry + index"
                      :class="{'is-selected': currentIndustry === industry.job_industry}"
                      @click="industrySelect(industry.job_industry)">
                    <span class="job-industry">{{ industry.job_industry }}</span>
                    <span class="job-num">{{ industry.job_num }}</span>
                  </li>
                </ul>
                <el-input
                      class="search-input"
                      placeholder="搜索职位名称、地点"
                      prefix-icon="el-icon-search"
                      v-model="searchKey"
                      @change="search">
                </el-input>
              </div>
              <div class="filter-condition">
                <div class="condition-wrapper">
                  <span>职位状态：</span>
                  <SelectWrapper :label="currentStatus" :options="conditionStatus" @update:label="updateStatus"/>
                </div>
                <div class="condition-wrapper">
                  <span>发布时间：</span>
                  <SelectWrapper :label="conditionDate[0]" :options="conditionDate"/>
                </div>
                <div class="selected-btn">
                  <transition name="el-fade-in" mode="out-in">
                  <div v-if="currentStatus === '已发布'" :key="currentStatus">
                    <el-button round class="passive-btn">一键下线</el-button>
                  </div>
                  <div v-else-if="currentStatus === '草稿箱'" :key="currentStatus">
                    <el-button round>一键发布</el-button>
                    <el-button round class="passive-btn">一键删除</el-button>
                  </div>
                  <div v-else-if="currentStatus === '已下线'" :key="currentStatus">
                    <el-button round>重新发布</el-button>
                    <el-button round class="passive-btn">一键删除</el-button>
                  </div>
                  </transition>
                </div>
              </div>
            </div>
            <div class="job-table">
              <el-table
                    ref="multipleTable"
                    :data="filterJobList"
                    stripe
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                      type="selection"
                      width="60"
                      align="center">
                </el-table-column>
                <el-table-column
                      label="职位信息">
                  <template v-slot="scope">
                    <div class="job-info">
                      <el-button type="text" class="job-duty" @click="jobView">
                        {{ scope.row.job_duty }}
                      </el-button>
                      <p>
                        <span>{{ scope.row.job_year }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>{{ scope.row.education }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>{{ scope.row.job_type }}</span>
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                      label="薪资">
                  <template v-slot="scope">
                    <span class="job-salary">{{ scope.row.job_salary }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                      prop="job_industry"
                      label="行业类型">
                </el-table-column>
                <el-table-column
                      label="工作地点">
                  <template v-slot="scope">
                    <div class="office-address">
                      <span>{{ scope.row.office_city }}</span>
                      ·
                      <span>{{ scope.row.office_district }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                      label="操作"
                      align="center">
                  <template v-slot:default="scope">
                    <div class="handle">
                      <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                                v-for="(handle,index) in filterUserHandle"
                                :key="handle.label + index"
                                :command="{row: scope.row, key: handle.label }"
                          ><i :class="handle.icon"></i>
                            {{ handle.label }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
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
        </div>
      </main>
      <!-- 底部信息栏 -->
      <GeneralFooter />

      <PreviewPicture v-if="previewVisible" :preview.sync="previewVisible" isProfession="true"/>
    </div>
</template>

<script>
    import GeneralTopBar from "../../../components/GeneralTopBar";
    import GeneralFooter from "../../../components/GeneralFooter";
    import SymbolIcon from "@/components/SymbolIcon";
    import SelectWrapper from "@/components/SelectWrapper";
    import PreviewPicture from "@/components/PreviewPicture";
    import * as Constant from "@/common/constants";
    export default {
        name: "RecruiterJob",
        components: {
            GeneralTopBar,
            GeneralFooter,
            SymbolIcon,
            SelectWrapper,
            PreviewPicture
        },
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
                currentMenu: "职位管理",
                industryList: [
                    { job_industry: "全部", job_num: 39 },
                    { job_industry: "技术", job_num: 11 },
                    { job_industry: "产品", job_num: 9 },
                    { job_industry: "运营", job_num: 3 },
                    { job_industry: "设计", job_num: 6 },
                    { job_industry: "销售", job_num: 0 },
                    { job_industry: "咨询/翻译/法律", job_num: 0 },
                    { job_industry: "人事/财务/行政", job_num: 0 },
                    { job_industry: "市场", job_num: 10 },
                    { job_industry: "其他", job_num: 0}
                ],
                currentIndustry: "全部",
                searchKey: "",
                conditionStatus: [Constant.JOB_ADDED, Constant.JOB_WAITING, Constant.JOB_REMOVED],
                currentStatus: Constant.JOB_ADDED,
                conditionDate: ["不限","今天","3天内","1周内","1个月内","3个月内","半年内","半年以上"],
                jobList: [
                    {
                        job_duty: "Web前端开发工程师",
                        job_year: "1-3年",
                        education: "本科",
                        job_type: "全职",
                        job_salary: "10-20K·13薪",
                        job_industry: "技术",
                        office_city: "深圳",
                        office_district: "福田",
                        job_status: "0"
                    },
                    {
                        job_duty: "前端工程师",
                        job_year: "1年以上",
                        education: "本科",
                        job_type: "全职",
                        job_salary: "10-15K",
                        job_industry: "技术",
                        office_city: "深圳",
                        office_district: "南山",
                        job_status: "0"
                    },
                    {
                        job_duty: "产品经理",
                        job_year: "3-5年",
                        education: "本科",
                        job_type: "全职",
                        job_salary: "20-30K",
                        job_industry: "产品",
                        office_city: "深圳",
                        office_district: "福田",
                        job_status: "0"
                    },
                    {
                        job_duty: "游戏ui设计师",
                        job_year: "3-5年",
                        education: "本科",
                        job_type: "全职",
                        job_salary: "15-30K",
                        job_industry: "设计",
                        office_city: "深圳",
                        office_district: "宝安",
                        job_status: "0"
                    },
                    {
                        job_duty: "抖音游戏产品经理（创作者方向）",
                        job_year: "1-3年",
                        education: "本科",
                        job_type: "全职",
                        job_salary: "15-30K",
                        job_industry: "产品",
                        office_city: "深圳",
                        office_district: "南山",
                        job_status: "1"
                    },
                    {
                        job_duty: "内容运营",
                        job_year: "1-3年",
                        education: "本科",
                        job_type: "全职",
                        job_salary: "20-40K·15薪",
                        job_industry: "技术",
                        office_city: "深圳",
                        office_district: "龙岗",
                        job_status: "1"
                    },
                    {
                        job_duty: "游戏开发工程师",
                        job_year: "1-3年",
                        education: "本科",
                        job_type: "全职",
                        job_salary: "20-40K·16薪",
                        job_industry: "技术",
                        office_city: "广州",
                        office_district: "天河",
                        job_status: "2"
                    },
                ],

                userHandle: [
                    [
                        { icon: "el-icon-view", label: Constant.JOB_VIEW},
                        { icon: "el-icon-edit", label: Constant.JOB_EDIT},
                        { icon: "el-icon-huojianxianxing", label: Constant.JOB_REMOVE}
                    ],
                    [
                        { icon: "el-icon-view", label: Constant.JOB_PREVIEW},
                        { icon: "el-icon-edit", label: Constant.JOB_EDIT},
                        { icon: "el-icon-fabu", label: Constant.JOB_ADD},
                        { icon: "el-icon-delete-solid", label: Constant.JOB_DELETE}
                    ],
                    [
                        { icon: "el-icon-view", label: Constant.JOB_PREVIEW},
                        { icon: "el-icon-edit", label: Constant.JOB_EDIT},
                        { icon: "el-icon-huojianxianxing", label: Constant.JOB_RECOVER},
                        { icon: "el-icon-delete-solid", label: Constant.JOB_DELETE}
                    ],
                ],
                currentPage: 1,
                total: 1000,

                previewVisible: false
            }
        },
        computed: {
            // 过滤所有行业中有职位的行业
            filterIndustry() {
                return this.industryList.filter(item => item.job_num)
            },
            // 过滤不同状态下的职位列表：已发布 / 草稿箱 / 已下线
            filterJobList() {
                const statusIndex = this.conditionStatus.indexOf(this.currentStatus).toString();
                return this.jobList.filter(item => item.job_status === statusIndex);
            },
            // 过滤职位列表在不同状态下对表格行的操作：已发布 / 草稿箱 / 已下线
            filterUserHandle() {
                const statusIndex = this.conditionStatus.indexOf(this.currentStatus).toString();
                return this.userHandle[statusIndex];
            }
        },
        methods: {
            menuSelect(name) {
                this.currentMenu = name;
            },
            // 行业选择
            industrySelect(industry) {
                this.currentIndustry = industry;
            },
            // 搜索框查找
            search() {
                console.log(this.searchKey);
            },
            // 改变职位状态
            updateStatus(label) {
                console.log(label);
                this.currentStatus = label;
            },
            // 表格每次选中回调
            handleSelectionChange(val) {
                console.log(val)
            },
            // 职位名称选中时间
            jobView() {
                if (this.currentStatus === Constant.JOB_ADDED) {
                    this.$router.push("/profession/detail");
                } else {
                    this.previewVisible = true;
                }
            },
            // 表格行操作
            handleCommand(command) {
                console.log(command);
                let { key} = command;
                switch(key){
                    case Constant.JOB_VIEW:
                        this.$router.push("/profession/detail");
                        break;
                    case Constant.JOB_PREVIEW:
                        this.previewVisible = true;
                        break;
                    case Constant.JOB_EDIT:
                        break;
                    case Constant.JOB_REMOVE:
                        break;
                    case Constant.JOB_RECOVER:
                        break;
                    case Constant.JOB_ADD:
                        break;
                    case Constant.JOB_DELETE:
                        break;
                }
            },
            // 分页
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
            padding-bottom: 30px;
            .job{
                > div {
                    padding: 0 30px;
                    background: @background;
                    & + div{
                        margin-top: 20px;
                    }
                }
                .filter-select{
                    .filter-job-industry{
                        padding: 0 30px;
                        border-bottom: 1px solid @borderColor;
                        display: flex;
                        align-items: center;
                        ul {
                            display: inline-block;
                            li{
                                display: inline-block;
                                color: @promptColor;
                                cursor: pointer;
                                padding: 20px 0;
                                position: relative;
                                & + li{
                                    margin-left: 60px;
                                }
                                &.is-selected{
                                    &::after{
                                        content: "";
                                        display: block;
                                        width: 36px;
                                        height: 3px;
                                        border-radius: 3px;
                                        background: @fontColor;
                                        position: absolute;
                                        bottom: -3px;
                                        left: 0;
                                    }
                                    .job-industry{
                                        font-size: 18px;
                                        font-weight: 600;
                                        color: @fontColor;
                                    }
                                }
                                .job-industry{
                                    font-size: 16px;
                                }
                                .job-num{
                                    margin-left: 5px;
                                }
                            }
                        }
                        .search-input{
                            padding: 15px 0;
                            width: 239px;
                            margin-left: auto;
                            /deep/ .el-input__inner{
                                border-radius: 20px;
                            }
                            /deep/ i{
                                position: relative;
                                top: 2px;
                            }
                        }
                    }
                    .filter-condition{
                        padding: 20px 30px;
                        .condition-wrapper{
                            display: inline-block;
                            & + .condition-wrapper{
                                margin-left: 120px;
                            }
                            span{
                                font-size: 15px;
                            }
                            .select-wrapper{
                                margin-left: 10px;
                            }
                        }
                        .selected-btn{
                            float: right;
                            .el-button.is-round{
                              .el-button-active();
                            }
                        }
                    }
                }
                .job-table{
                    padding-bottom: 60px;
                    .job-info{
                        .job-duty{
                            text-align: left;
                            /deep/ span{
                                white-space: normal;
                                height: 40px;
                                line-height: 40px;
                                color: @fontColor;
                                .el-link-active();
                                font-size: 18px;
                                font-weight: 600;
                            }
                        }
                        p{
                            color: @promptColor;
                            height: 40px;
                            line-height: 40px;
                        }
                    }
                    .job-salary{
                        color: @salaryColor;
                    }
                    .handle{
                        i{
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }
                    .page{
                        text-align: center;
                        .el-pagination{
                            margin-top: 60px;
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
    }
    .el-table{
        font-size: 16px;
        ///deep/ .cell{
        //    white-space: nowrap;
        //}
        /deep/ .el-checkbox__inner:hover{
            border-color: @activeColor;
        }
        /deep/ .el-checkbox__input.is-focus .el-checkbox__inner{
            border-color: @borderColor;
        }
        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
        /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
            border-color: @activeColor;
            background: @activeColor;
        }
    }
</style>