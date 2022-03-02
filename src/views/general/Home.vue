<template>
  <div class="container">
    <header>
      <nav>
        <!-- 顶部logo -->
        <div class="logo">
          <el-link href="/home">万家优聘</el-link>
        </div>
        <!-- 坐标城市 -->
        <div class="nav-city">
          <p class="nav-city-box">
            <i class="el-icon-location-outline"></i>
            <span class="nav-city-selected">深圳</span>
            <span class="switch-city">[切换城市]</span>
          </p>
        </div>
        <!-- 用户导航 -->
        <div class="nav">
          <el-link href="/home">首页</el-link>
          <el-link href="/profession">职位</el-link>
        </div>
        <!-- 用户操作 -->
        <div class="user-nav">
          <el-link href="/home">我要求职</el-link>
          <el-link href="/home">我要招聘</el-link>
          <el-button round size="mini">注册</el-button>
          <el-button round size="mini">登录</el-button>
        </div>
      </nav>
    </header>
    <main>
      <!-- 搜索框 -->
      <div class="search-form">
        <el-input placeholder="搜索职位、公司" v-model="searchKey" class="search">
          <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
        </el-input>
        <div class="search-hot">
          <b>热搜职位：</b>
          <el-link v-for="(hot,index) in hotWords" :key="hot + index">
            {{ hot }}
          </el-link>
        </div>
      </div>
      <!-- 首页职位侧栏 及 轮播栏 -->
      <div class="home-box">
        <div class="home-sider" ref="homeSider">
          <JobMenu :jobMenu="jobMenu" />
          <div class="show-more" ref="showMore">显示更多职位</div>
          <div class="more-job-menu" ref="moreJobMenu" style="display: none">
            <JobMenu :jobMenu="moreJobMenu" />
          </div>
        </div>
        <div class="home-banner">
          <el-carousel :interval="3000" arrow="never">
            <el-carousel-item v-for="banner in bannerImg" :key="banner.url">
              <el-link :href="banner.href">
                <img :src="banner.url" style="width: 100%; height: 100%;" />
              </el-link>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
import JobMenu from "./widgets/JobMenu";
import $ from "jquery";
export default {
    name: "Home",
    components: {JobMenu},
    mounted() {
      this.jobMenuHover();
      this.marginTop();
    },
    data() {
        return {
            searchKey: "",
            hotWords: ["游戏策划","产品经理","PHP","前端工程师","java","测试","后端开发","运营","销售","人力资源"],
            jobMenu: [
                {
                    title: "技术", keys: ["Java","PHP","web前端","安卓"],
                    subMenu: [
                        {
                            title: "后端开发", keys: ["Java","PHP","C#","C++","Python",".NET","Delphi","VB","Ruby","Node.js","语音/视频/图形开发","全栈工程师","GIS工程师"],
                        },
                        {
                            title: "移动开发", keys: ["HTML5","Android","IOS","移动web前端","U3D"],
                        },
                        {
                            title: "测试", keys: ["测试工程师","游戏测试","移动端测试","功能测试","自动化测试"],
                        },
                        {
                            title: "其他技术职位", keys: ["其他技术职位"]
                        }
                    ],
                },
                {
                    title: "产品", keys: ["产品经理","产品总监/VP","产品助理"],
                    subMenu: [
                        {
                            title: "产品经理", keys: ["产品经理","产品总监/VP","产品助理","游戏策划"],
                        },
                        {
                            title: "其他产品职位", keys: ["其他产品职位"]
                        }
                    ],
                },
                {
                    title: "设计", keys: ["UI设计师","平面设计","交互设计师"],
                    subMenu: [
                        {
                            title: "视觉/交互设计", keys: ["视觉设计师","网页设计师","UI设计师","APP设计师","平面设计","广告设计","原画师","美工","CAD设计/制图","插画师","漫画师","交互设计师"],
                        },
                        {
                            title: "游戏设计",keys: ["游戏特效","游戏界面设计师","游戏角色","游戏动作"]
                        },
                        {
                            title: "其他设计职位", keys: ["其他设计职位"]
                        }
                    ],
                },
                {
                    title: "运营", keys: ["新媒体运营","产品运营","网络推广"],
                    subMenu: [
                        {
                            title: "运营", keys: ["用户运营","产品运营","内容运营","活动运营","商家运营","品类运营","游戏运营","网站运营","新媒体运营","运营助理/专员","内容审核","直播运营"],
                        },
                        {
                            title: "编辑",keys: ["编辑","主编/副主编","文案编辑","网站编辑","采编"]
                        },
                        {
                            title: "高端运营职位",keys: ["高端运营职位","运营总监","客服总监","运营经理/主管"]
                        },
                        {
                            title: "其他运营职位", keys: ["其他运营职位"]
                        }
                    ],
                },
                {
                    title: "市场", keys: ["市场营销","市场推广","品牌公关","策划经理"],
                    subMenu: [
                        {
                            title: "市场/营销", keys: ["网络推广","市场营销","市场策划","市场顾问","市场推广","SEO","SEM","商务渠道","商业数据分析","活动策划","网络营销","APP推广","游戏推广"],
                        },
                        {
                            title: "公关媒介",keys: ["公关媒介","媒介经理","品牌公关","媒介专员","活动策划执行"]
                        },
                        {
                            title: "会务会展",keys: ["会务会展","会议活动策划","会议活动执行","会展活动策划","会展活动执行"]
                        },
                        {
                            title: "广告",keys: ["广告","广告创意设计","美术指导","广告设计","策划经理","广告文案","广告制作","媒介投放","媒介合作","广告审核"]
                        },
                        {
                            title: "高端市场职位",keys: ["会务会展","会议活动策划","会议活动执行","会展活动策划","会展活动执行"]
                        },
                        {
                            title: "其他市场职位", keys: ["其他市场职位"]
                        }
                    ],
                },
                {
                    title: "人事/财务/行政", keys: ["人力资源专员/助理","行政主管"],
                    subMenu: [
                        {
                            title: "人力资源", keys: ["招聘","HRBP","人力资源专员/助理","培训","人力资源总监"],
                        },
                        {
                            title: "行政", keys: ["行政资源专员/助理","前台","经理助理","后勤","行政经理/主管","行政总监"],
                        },
                        {
                            title: "财务", keys: ["财务","会计","出纳","财务顾问","结算会计","税务","审计","财务经理/主管","财务总监/VP"],
                        },
                        {
                            title: "其他职能职位", keys: ["其他职能职位"]
                        }
                    ],
                },
                {
                    title: "采购/贸易", keys: ["采购经理","采购主管","进出口贸易"],
                    subMenu: [
                        {
                            title: "采购", keys: ["采购","商品经理","供应商质量工程师","采购总监","采购经理/主管","采购专员/助理","买手"],
                        },
                        {
                            title: "其他采购职位", keys: ["其他采购职位"]
                        }
                    ],
                },
                {
                    title: "销售", keys: ["销售专员","销售经理","销售工程师"],
                    subMenu: [
                        {
                            title: "销售行政/商务", keys: ["商务专员","商务经理","销售助理","商务总监","销售运营"],
                        },
                        {
                            title: "房地产销售/招商", keys: ["置业顾问","地产中介","房地产销售/招商","物业招商管理","房地产销售总监"],
                        },
                        {
                            title: "服务业销售", keys: ["服装销售","彩妆顾问","美容顾问","珠宝销售","旅游顾问","瘦身顾问"],
                        },
                        {
                            title: "汽车销售", keys: ["汽车销售","汽车配件销售"],
                        },
                        {
                            title: "广告/会展销售", keys: ["广告销售","会议活动销售","会展活动销售","媒介顾问"],
                        },
                        {
                            title: "金融销售", keys: ["证券经纪人","信用卡销售","保险顾问","理财顾问"],
                        },
                        {
                            title: "外贸销售", keys: ["外贸经理","外贸业务员"],
                        },
                        {
                            title: "销售", keys: ["销售","销售专员","客户代表","大客户代表","BD经理","渠道销售","代理商销售","电话销售","销售顾问","网络销售","销售工程师","客户经理"],
                        },
                        {
                            title: "其他销售职位", keys: ["其他销售职位"]
                        }
                    ],
                }
            ],
            moreJobMenu: [
                {
                    title: "金融", keys: ["投资经理","投资总监","风控","证券/基金/期货"],
                    subMenu: [
                        {
                            title: "证券/基金/期货", keys: ["买方分析师","股票/期货操盘手","基金经理","证券交易员"],
                        },
                        {
                            title: "投融资", keys: ["投融资","投资经理","资产管理","投资总监","投资合伙人","投资VP","融资","投资顾问"],
                        },
                        {
                            title: "银行", keys: ["银行","分析师","柜员","大堂经理","客户经理","信贷管理"],
                        },
                        {
                            title: "保险", keys: ["保险精算师","保险理赔"],
                        },
                        {
                            title: "中后台", keys: ["风控","法务","资信评估","合规稽查","清算"],
                        },
                        {
                            title: "互联网金融", keys: ["互联网金融","金融产品经理","催收员","分析师","清算"],
                        },
                        {
                            title: "其他金融职位", keys: ["其他金融职位"]
                        }
                    ],
                },
                {
                    title: "医疗健康", keys: ["药剂师","医生","营养师/健康管理师"],
                    subMenu: [
                        {
                            title: "临床试验", keys: ["临床研究","临床数据分析","临床项目经理","医学总监"],
                        },
                        {
                            title: "医生/医技", keys: ["医生","幼儿园保健医","医学影像/放射科医师","内科医生","全科医生","中医","心理医生","药剂师","口腔科医生","康复治疗师","验光师","超声科医生","检验科医师"]
                        },
                        {
                            title: "护士/护理", keys: ["护士长","护士","导医"]
                        },
                        {
                            title: "健康整形", keys: ["健康整形","营养师/健康管理师","整形师","理疗师","针灸推拿"]
                        },
                        {
                            title: "医疗器械", keys: ["医疗器械注册","医疗器械生产/质量管理","医疗器械研发"],
                        },
                        {
                            title: "药店", keys: ["药店店长","执业药师/驻店医师","药店店员"]
                        },
                        {
                            title: "其他医疗健康职位", keys: ["其他医疗健康职位"]
                        }
                    ],
                },
                {
                    title: "教育培训", keys: ["课程设计","教务管理","IT培训"],
                    subMenu: [
                        {
                            title: "教育产品研发", keys: ["教育产品研发","课程设计","课程编辑","培训师","培训策划"]
                        },
                        {
                            title: "教育行政", keys: ["教育行政","校长/副校长","教务管理","教学管理","班主任/辅导员"]
                        },
                        {
                            title: "教师", keys: ["教师","日语教师","语文教师","数学教师","英语教师","化学教师","家教","生物教师","托管老师","早教老师","助教","高中教师","初中教师","小学教师","幼教","理科教师","文科教师","音乐教室","美术教师","体育教师"]
                        },
                        {
                            title: "IT培训", keys: ["IT培训","JAVA培训师","Android培训师","IOS培训师","PHP培训师",".NET培训师","C++培训师","Unity 3D培训讲师","Web前端培训讲师","软件测试培训讲师","动漫培训讲师","UI设计培训讲师"]
                        },
                        {
                            title: "特长培训", keys: ["教练","武术教练","轮滑教练","表演教师","书法教师","吉他教师","古筝教师","乐高教师","播音主持教师","舞蹈教师","游泳教师","健身教练","瑜伽老师","钢琴老师","篮球/羽毛球教练","跆拳道教练","空手道教练"]
                        },
                        {
                            title: "其他教育培训职位", keys: ["其他教育培训职位"]
                        }
                    ],
                },
                {
                    title: "供应链/物流", keys: ["物流专员","贸易跟单","供应链经理"],
                    subMenu: [
                        {
                            title: "物流", keys: ["物流","供应链专员","供应链经理","集装箱管理","物流专员","物流经理","物流运营","物流跟单","调度员","物流/仓储项目经理","货运代理专员","货运代理经理","水/空/陆运操作","核销员"]
                        },
                        {
                            title: "仓储", keys: ["仓储","仓库经理","仓库管理员","仓库文员","配/理/拣/发货"]
                        },
                        {
                            title: "交通/运输", keys: ["交通/运输","商务司机","网约车司机","代驾司机","驾校教练","货运司机","配送员","快递员","运输经理/主管"]
                        },
                        {
                            title: "高端供应链职位", keys: ["供应链总监","物流总监"]
                        },
                        {
                            title: "其他供应链职位", keys: ["其他供应链职位"]
                        }
                    ]
                }
            ],
            bannerImg: [
                {
                    href: "", url: require("@/assets/image/banner1.jpg")
                },
                {
                    href: "", url: require("@/assets/image/banner2.jpg")
                },
                {
                    href: "", url: require("@/assets/image/banner3.jpg")
                },
                {
                    href: "", url: require("@/assets/image/banner4.jpg")
                },
                {
                    href: "", url: require("@/assets/image/banner5.jpg")
                },
            ]
        };
    },
    methods: {
        //侧栏 更多职位隐藏菜单 --- 悬浮效果
        jobMenuHover() {
            const homeSider = this.$refs.homeSider;
            const showMore = this.$refs.showMore;
            const moreJobMenu = this.$refs.moreJobMenu;
            const self = this;
            homeSider.onmouseenter = function(){
                showMore.onmouseenter = function () {
                    showMore.style.display = "none";
                    moreJobMenu.style.display = "block";
                    self.marginTop();
                }
            }
            homeSider.onmouseleave = function(){
                showMore.style.display = "block";
                moreJobMenu.style.display = "none";
            }
        },
        // 侧栏 职位菜单计算二级详情菜单布局定位位置
        marginTop() {
            const subJobMenu = document.querySelectorAll(".home-sider .sub-job-menu");
            const subHeight = [];
            subJobMenu.forEach(item => {
                // jq返回内容高度
                const innerHeight = $(item).innerHeight();
                subHeight.push(innerHeight);
            });
            const dls = document.querySelectorAll(".home-sider dl");
            dls.forEach((item,index) => {
                // 返回元素视口相关数据
                const elemViewInfo = item.getBoundingClientRect();
                // 与父级顶部距离
                const offsetTop = Math.floor(elemViewInfo.y) - 183;
                // 如果 顶部距离 > 二级菜单内容高度 , 给予二级菜单的marginTop( 一级菜单 垂直居中 二级菜单 ）
                if(offsetTop > subHeight[index] / 2){
                    const marginTop = offsetTop - subHeight[index] / 2 + elemViewInfo.height / 2;
                    subJobMenu[index].style.marginTop = marginTop + "px";
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100vh;
    background: #f6f6f8;
}

.tmargin {
    margin: 0 20%;
}
.imargin {
    margin: 0 10%;
}

@navColor: #00d7c6;
header {
    background: #202329;
    nav {
        height: 49px;
        .tmargin();
        > div {
            float: left;
            height: 49px;
            line-height: 49px;
            color: #ffffff;
            &.logo {
                position: relative;
                bottom: 3px;
                /deep/ .el-link--inner {
                    font-size: 22px;
                    color: @navColor;
                }
            };
            &.nav-city {
                margin-left: 12px;
                .nav-city-box {
                    height: 100%;
                    cursor: pointer;
                    i {
                        font-size: 18px;
                        margin-right: 2px;
                        color: @navColor;
                    }
                    .nav-city-selected {
                        color: @navColor;
                    }
                    .switch-city {
                        font-size: 12px;
                        margin-left: 10px
                    }
                }
            };
            &.nav {
                .el-link {
                    margin-left: 30px;
                }
            };
            &.user-nav {
                float: right;
                .el-link:last-of-type {
                    margin-right: 20px;
                }
            }
        }
    }
}

@mainColor: #5dd5c8;
main {
    .tmargin();
    .search-form {
        .imargin();
        width: 80%;
        padding-top: 20px;
        .search {
            /deep/ .el-input__inner {
                height: 48px;
                line-height: 48px;
                font-size: 16px;
            };
            /deep/ .el-input-group__append {
                background: #5dd5c8;
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
                &:hover {
                    color: @mainColor;
                }
            }
        }
    }
    .home-box {
        display: flex;
        .home-sider{
            position: relative;
            width: 384px;
            margin-right: 16px;
            background: #fff;
            box-shadow: 5px 5px 15px rgb(3 0 0 / 4%);
            .job-menu{
                position: static;
            }
            .show-more {
                padding: 0 20px;
                border-top: 1px dashed #ecedef;
                height: 50px;
                line-height: 50px;
                color: #00c2b3;
            }
        }
        .home-banner{
            flex: 1;
            .el-carousel{
                /deep/ .el-carousel__container{
                    height: 410px;
                }
                /deep/ .el-carousel__item{
                    transition: transform .4s step-start,
                                opacity .5s ease-in-out;
                    opacity: .8;
                    &.is-active{
                        opacity: 1;
                    }
                }
                /deep/ .el-link{
                    width: 100%;
                    height: 100%;
                }
                /deep/ .el-link--inner{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>