<template>
  <header>
    <!-- 顶部导航 -->
    <div class="top-bar">
      <nav class="margin-20per">
        <!-- 顶部logo -->
        <div class="logo">
          <el-link href="/home">
            万家优<i class="el-icon-zhaopin2"></i>
          </el-link>
        </div>
        <!-- 坐标城市 -->
        <div v-if="showPosition" class="nav-city" @click="dialogVisible = true">
          <p class="nav-city-box">
            <i class="el-icon-location-outline"></i>
            <span class="nav-city-selected">{{ currentCity }}</span>
            <span class="switch-city">[切换城市]</span>
          </p>
        </div>
        <!-- 用户导航 -->
        <div class="nav">
          <el-link @click="redirect('/home')" :class="{'active-route': activeRoute('/home')}">首页</el-link>
          <el-link @click="redirect('/profession')" :class="{'active-route': activeRoute('/profession')}">职位</el-link>
          <el-link @click="redirect('/company')" :class="{'active-route': activeRoute('/company')}">公司</el-link>
        </div>
        <!-- 用户操作: 未登录状态-->
        <div v-if="!$store.state.login_role" class="user-nav">
          <el-link @click="activeLogin(interview)">我要求职</el-link>
          <el-link @click="activeLogin(recruit)">我要招聘</el-link>
          <el-button round @click="activeLogin(interview)">注册</el-button>
          <el-button round @click="activeLogin(login)">登录</el-button>
        </div>
        <!-- 用户操作: 求职者身份-->
        <div v-if="$store.state.login_role === '0'" class="user-applicant">
          <el-link href="/applicant/message"><i class="el-icon-lingdang"></i></el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link @click="activeLogin(recruit)">我要招聘</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-dropdown>
            <span class="el-dropdown-link">
              欢迎回来，求职者<i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><el-link href="/applicant">个人中心</el-link></el-dropdown-item>
              <el-dropdown-item><el-link href="/applicant/resume">我的简历</el-link></el-dropdown-item>
              <el-dropdown-item><el-link href="/applicant/apply">投递情况</el-link></el-dropdown-item>
              <el-dropdown-item><el-link href="/applicant/interview">我的面试</el-link></el-dropdown-item>
              <el-dropdown-item><el-link href="/applicant/collect">职位收藏</el-link></el-dropdown-item>
              <el-dropdown-item><el-link href="/applicant/setting">账号设置</el-link></el-dropdown-item>
              <el-dropdown-item><el-link @click="reloadStatus">退出登录</el-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 用户操作: 招聘官身份-->
        <div v-if="$store.state.login_role === '1'" class="user-recruiter">
          <el-link href="/recruiter/message"><i class="el-icon-lingdang"></i></el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link @click="activeLogin(interview)">我要求职</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link @click="redirect('/recruiter/post')">发布职位</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-dropdown>
            <span class="el-dropdown-link">
              欢迎回来，招聘官<i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><el-link @click="redirect('/recruiter')">工作台</el-link></el-dropdown-item>
              <el-dropdown-item><el-link @click="redirect('/recruiter/job')">职位管理</el-link></el-dropdown-item>
              <el-dropdown-item><el-link @click="redirect('/recruiter/resume')">简历处理</el-link></el-dropdown-item>
              <el-dropdown-item><el-link @click="redirect('/recruiter/interview')">面试相关</el-link></el-dropdown-item>
              <el-dropdown-item><el-link @click="redirect('/recruiter/setting')">账号设置</el-link></el-dropdown-item>
              <el-dropdown-item><el-link @click="reloadStatus">退出登录</el-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav>
    </div>
    <CityDialog :visible.sync="dialogVisible"
                :currentCity.sync="currentCity" />
  </header>
</template>

<script>
import CityDialog from "@/components/CityDialog";
import * as Constant from "@/common/constants.js";
export default {
    name: "GeneralTopBar",
    components: {CityDialog},
    props: {
        showPosition: {
            type: Boolean,
            default: true
        },
        isRecruiterRegister: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.$store.commit("setLogin");
    },
    data() {
        return {
            dialogVisible: false,
            currentCity: Constant.CONDITION_CITY,
            interview: Constant.REGISTER_TO_INTERVIEW,
            recruit: Constant.REGISTER_TO_RECRUIT,
            login: Constant.LOGIN,
        }
    },
    methods: {
        redirect(path) {
            // 刚注册的招聘官必须填写注册信息才可进行下一步
            if(this.isRecruiterRegister){
                return this.$message.info("请填写注册信息完成身份认证！");
            }
            this.$router.push(path);
        },
        activeRoute(path) {
            const reg = new RegExp(path, "i");
            return reg.test(this.$route.path);
        },
        activeLogin(param) {
            window.localStorage.setItem("userType",param);
            this.$router.push("/login");
        },
        reloadStatus() {
            this.$store.commit('removeLogin');
            this.$store.commit('setLogin');
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
@mainColor: #5dd5c8;
@activeColor: #00c2b3;
@navColor: #00d7c6;
@fontColor: #61687c;
header {
    .top-bar{
        background: #202329;
        nav {
            height: 49px;
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
                        font-weight: 600;
                        color: @navColor;
                    }
                    /deep/ i{
                        font-size: 32px;
                        transform: translateY(4px) translateX(-2px);
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
                        &.active-route{
                            color: @navColor;
                        }
                    }
                };
                &.user-nav, &.user-applicant, &.user-recruiter {
                    float: right;
                    .el-button{
                        margin-left: 20px;
                        color: #fff;
                        .el-link-active();
                        display: inline-flex;
                        align-items: center;
                    }
                    .el-dropdown{
                        color: inherit;
                        cursor: pointer;
                        /deep/ .el-dropdown-link{
                            display: inline-block;
                            height: 100%;
                            i{
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
.el-dropdown-menu{
    /deep/ .el-link{
        color: @fontColor;
        .el-link-active();
    }
}
</style>