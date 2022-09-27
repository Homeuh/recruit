<template>
    <div class="container">
      <!-- 顶部导航栏 -->
      <GeneralTopBar :showPosition="false"/>
      <main>
        <div class="filter-box">
          <div class="filter-condition margin-20per">
            <div class="condition-city">
              <span class="title">公司地点：</span>
              <span class="content">
                <el-link v-for="city in companyCity" :key="city" :class="{'is-select': conditionCity === city}" @click="conditionSelect('city',city)">{{ city }}</el-link>
                <el-button type="text" class="select-city" @click="dialogVisible = true">全部城市</el-button>
              </span>
            </div>
            <div class="condition-tag">
              <span class="title">行业类型：</span>
              <span class="content">
                <el-link v-for="tag in companyTag" :key="tag" :class="{'is-select': conditionTag === tag}" @click="conditionSelect('tag',tag)">{{ tag }}</el-link>
              </span>
            </div>
            <div class="condition-tag">
              <span class="title">公司性质：</span>
              <span class="content">
                <el-link v-for="type in companyType" :key="type" :class="{'is-select': conditionType === type}" @click="conditionSelect('type',type)">{{ type }}</el-link>
              </span>
            </div>
            <div class="condition-tag">
              <span class="title">公司规模：</span>
              <span class="content">
                <el-link v-for="size in companySize" :key="size" :class="{'is-select': conditionSize === size}" @click="conditionSelect('size',size)">{{ size }}</el-link>
              </span>
            </div>
          </div>
        </div>
        <div class="company-box margin-20per">
          <ul>
            <li v-for="(company,index) in companyList" :key="company.company_name + index">
              <div class="sub-li">
                <div class="company-introduction">
                  <p>
                      <el-link :href="'/company/detail?company_id=' + company.company_id">
                          <img :src="company.company_logo" :alt="company.company_name"
                               style="width: 80px; height: 80px; object-fit: cover">
                      </el-link>
                  </p>
                  <h3>{{ company.company_name }}</h3>
                  <h4>
                    {{ company.company_tag }}
                    <el-divider direction="vertical"></el-divider>
                    {{ company.company_size }}
                  </h4>
                  <h4 :title="company.company_description">{{ company.company_description }}</h4>
                </div>
                <div class="company-recruit">
                  <el-link :href="'/company/evaluation?company_id=' + company.company_id" class="job-link">
                    <p>{{ company.userComment }}</p>
                    <p>面试评价</p>
                  </el-link>
                  <el-link :href="'/company/job?company_id=' + company.company_id" class="job-link">
                    <p>{{ company.recruit }}</p>
                    <p>在招职位</p>
                  </el-link>
                  <el-link :href="'/company/detail?company_id=' + company.company_id" class="job-link">
                    <p>{{ company.activity }}%</p>
                    <p>简历处理率</p>
                  </el-link>
                </div>
              </div>
            </li>
          </ul>
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
      </main>
      <!-- 底部信息栏 -->
      <GeneralFooter />
      <!--  城市选择框  -->
      <CityDialog :visible.sync="dialogVisible" :currentCity="conditionCity" @update:currentCity="conditionSelect('city', $event)"/>
    </div>
</template>

<script>
import GeneralTopBar from "../../../components/GeneralTopBar";
import GeneralFooter from "../../../components/GeneralFooter";
import CityDialog from "../../../components/CityDialog.vue";
import * as Constant from "@/common/constants";
export default {
    name: "Company",
    components: { GeneralTopBar, GeneralFooter, CityDialog},
    data() {
        return {
            conditionCity: Constant.CONDITION_CITY,
            conditionTag: Constant.CONDITION_TAG,
            conditionType: Constant.CONDITION_TYPE,
            conditionSize: Constant.CONDITION_SIZE,
            companyCity: ["全国","北京","上海","广州","深圳","杭州","西安","厦门","长沙","武汉","天津","成都","重庆","苏州"],
            companyTag: ["不限","电子商务","游戏","媒体","广告营销","数据服务","医疗健康","O2O","旅游","分类信息","音乐/视频阅读","在线教育","社交网络","人力资源服务","企业服务","信息安全","职能硬件","移动互联网","互联网","计算机软件","通信/网络设备","广告/公关/会展","互联网金融","物流/仓储","贸易/进出口","咨询","工程施工","汽车行业","其他产业"],
            companyType: ["不限","外资(欧美)","外资(非欧美)","合资","国企","民营公司","上市公司","创业公司","外企代表处","政府机关","事业单位","非营利组织"],
            companySize: ["不限","少于15人","15-50人","50-150人","150-500人","500-2000人","2000人以上"],
            companyList: [],
            // companyList: [
            //     {
            //         company_logo: require("@/image/company/youxikexue.jpg"), company_name: "游戏科学", company_tag: "游戏开发", company_size: "50-150人",
            //         company_description: "做全球领先的重度游戏开发商", userComment: 35, recruit: 21, activity: 100
            //     },
            //     {
            //         company_logo: require("@/image/company/weixuedianzi.jpg"), company_name: "微雪电子", company_tag: "电商平台", company_size: "50-150人",
            //         company_description: "我们实行合伙人制度，我们像是一个家", userComment: 4, recruit: 3, activity: 100
            //     },
            //     {
            //         company_logo: require("@/image/company/jieshun.jpg"), company_name: "捷顺科技股份", company_tag: "生活服务，智能硬件", company_size: "2000人以上",
            //         company_description: "上市公司、技术大牛、股权激励、食堂宿舍", userComment: 23, recruit: 44, activity: 86
            //     },
            //     {
            //         company_logo: require("@/image/company/guojiang.jpg"), company_name: "果酱时代", company_tag: "MCN | 直播平台", company_size: "50-150人",
            //         company_description: "专注产品，专注社交", userComment: 135, recruit: 6, activity: 86
            //     },
            //     {
            //         company_logo: require("@/image/company/youka.jpg"), company_name: "有咖互动", company_tag: "社交平台", company_size: "150-500人",
            //         company_description: "国内知名声音互动平台", userComment: 7, recruit: 31, activity: 100
            //     },
            //     {
            //         company_logo: require("@/image/company/xunlei.jpg"), company_name: "迅雷网络", company_tag: "工具类产品", company_size: "500-2000人",
            //         company_description: "基于共享经济的互联网云计算平台", userComment: 40, recruit: 142, activity: 100
            //     },
            //     {
            //         company_logo: require("@/image/company/shurui.jpg"), company_name: "数睿科技", company_tag: "生活服务", company_size: "150-500人",
            //         company_description: "上市公司，打造以「食 衣 住 行 育 」为发展蓝图的网络服务", userComment: 298, recruit: 30, activity: 100
            //     },
            //     {
            //         company_logo: require("@/image/company/benniao.jpg"), company_name: "笨鸟软件", company_tag: "数据服务,其他", company_size: "15-50人",
            //         company_description: "主攻国外市场，现产品约有300万活跃用户", userComment: 5, recruit: 3, activity: 100
            //     },
            //     {
            //         company_logo: require("@/image/company/guiqikeji.jpg"), company_name: "瑰琦科技", company_tag: "移动互联网,硬件", company_size: "15-50人",
            //         company_description: "务实不务虚，以自然的状态，做正确的事", userComment: 15, recruit: 32, activity: 98
            //     },
            //     {
            //         company_logo: require("@/image/company/kelu.jpg"), company_name: "KLOOK客路旅行", company_tag: "旅游|出行", company_size: "500-2000人",
            //         company_description: "全球领先的旅行体验预订平台之一", userComment: 25, recruit: 42, activity: 88
            //     },
            //     {
            //         company_logo: require("@/image/company/keruier.jpg"), company_name: "科瑞尔人力资源服务", company_tag: "企业服务", company_size: "2000人以上",
            //         company_description: "平台大", userComment: 40, recruit: 22, activity: 76
            //     },
            //     {
            //         company_logo: require("@/image/company/meituan.jpg"), company_name: "美团", company_tag: "消费生活", company_size: "2000人以上",
            //         company_description: "帮大家吃得更好，生活更好", userComment: 60, recruit: 6, activity: 89
            //     },
            //     {
            //         company_logo: require("@/image/company/siwei.jpg"), company_name: "思维巡航", company_tag: "软件服务|咨询", company_size: "15-50人",
            //         company_description: "Reimagine meetings with Airgram. SaaS startup", userComment: 32, recruit: 12, activity: 86
            //     },
            //     {
            //         company_logo: require("@/image/company/wegene.jpg"), company_name: "微基因WeGene", company_tag: "移动互联网,医疗丨健康 ", company_size: "50-150人",
            //         company_description: "解读基因的秘密，遇见未来的自己", userComment: 230, recruit: 18, activity: 79
            //     },
            //     {
            //         company_logo: require("@/image/company/zijie.jpg"), company_name: "字节跳动", company_tag: "内容资讯,短视频", company_size: "2000人以上",
            //         company_description: "我们的使命：激发创造，丰富生活。", userComment: 66, recruit: 11, activity: 95
            //     },
            //     {
            //         company_logo: require("@/image/company/yunmai.jpg"), company_name: "云麦网络", company_tag: "MCN｜直播平台", company_size: "50-150人",
            //         company_description: "打造中国最好的手机直播软件", userComment: 34, recruit: 22, activity: 92
            //     }
            // ],
            currentPage: 1,
            pageSize: 16,
            total: 1000,
            dialogVisible: false
        }
    },
    created() {
        this.initData();
        this.initCondition();
    },
    methods: {
        async initData() {
            const res = await this.$axios.request({
                url: "/company/page",
                method: "get",
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
            });
            console.log(res);
            if(res.msg === 'success'){
                res.data.companyList.forEach(item => {
                    item.company_logo = require("@/image/company/" + item.company_logo);
                });
                this.total = res.data.total;
                this.companyList = Object.assign([], [], res.data.companyList);
            }
        },
        initCondition() {
            const { city, tag, type, size}  = this.$route.query;
            if(city) {
                this.conditionCity = city;
                const index = this.companyCity.indexOf(city);
                index !== -1
                    ? this.companyCity.splice(index, 1)
                    &&
                    this.companyCity.unshift(city)
                    : this.companyCity.unshift(city);
            }
            if(tag){
                this.conditionTag = tag;
            }
            if(type){
                this.conditionType = type;
            }
            if(size){
                this.conditionSize = size;
            }
        },
        conditionSelect(key, condition) {
            switch(key){
                case "city": this.conditionCity = condition; break;
                case "tag": this.conditionTag = condition; break;
                case "type": this.conditionType = condition; break;
                case "size": this.conditionSize = condition; break;
            }
            // 空白路由跳转，解决vue-router无法重载当前路由的问题
            this.$router.push({
                path: "/reload",
                query: {
                    path: `/company?city=${this.conditionCity}&tag=${this.conditionTag}&type=${this.conditionType}&size=${this.conditionSize}`
                }
            })
            
        },
        filter(data) {
            return data.split("\n");
        },
        citySelect(city) {
            this.conditionCity = city;
            this.conditionDistrict = Constant.CONDITION_DISTRICT;
        },
        handleCurrentChange(value) {
            // console.log(value)
            this.currentPage = value;
            this.initData();
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

@mainColor: #5dd5c8;
@activeColor: #00c2b3;
@fontColor: #414a60;
@salaryColor: #fb670f;
@promptColor: #999;
main{
    .filter-box{
        background: #fff;
        box-shadow: 0 3px 6px rgba(6,0,1,.05);
        padding: 20px 0;
        .filter-condition{
            > div {
                line-height: 40px;
            }
            .title{
                margin-right: 8px;
                float: left;
            }
            .content{
                display: block;
                margin-left: 78px;
                .el-link{
                    margin: 0 20px 0 0;
                    color: @fontColor;
                    .el-link-active();
                    &.is-select{
                        color: @activeColor;
                    }
                }
            }
            .select-city{
                color: #414a60;
                .el-link-active();
                margin-left: 20px;
            }
        }
    }
    .company-box{
        margin-top: 60px;
        ul{
            display: grid;
            grid-template-columns: repeat(4, calc((100% - 48px) / 4));
            gap: 16px 16px;
            li{
                .sub-li{
                    background: #fff;
                    &:hover{
                        box-shadow: 0 0 10px 0 rgba(56,81,76,.12);
                    }
                    overflow: hidden;
                    .company-introduction{
                        margin: 0 13px;
                        padding: 20px 0 14px;
                        text-align: center;
                        border-bottom: 1px dashed #e0e0e0;
                        p{
                            margin-bottom: 14px;
                        }
                        h3{
                            margin-top: 14px;
                            font-size: 15px;
                            font-weight: 500;
                        }
                        h4{
                            margin-top: 3px;
                            font-size: 13px;
                            font-weight: 400;
                            color: #999;
                            & + h4 {
                                color: #414a60;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                        }
                    }
                    .company-recruit{
                        margin-top: 20px;
                        margin-bottom: 14px;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        .el-link{
                            display: block;
                            text-align: center;
                            margin-left: 0;
                            font-size: 13px;
                            color: #5dd5c8;
                            &:nth-child(2){
                                border-left: 1px solid #dcdfe6;
                                border-right: 1px solid #dcdfe6;
                            }
                            /deep/ .el-link--inner{
                                height: 30px;
                                line-height: 18px;
                            }
                            p:last-child{
                                font-size: 11px;
                                color: #999;
                              .el-link-active();
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
</style>