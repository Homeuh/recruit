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
          <el-link href="/home" :class="{'active-route': activeRoute('/home')}">首页</el-link>
          <el-link href="/profession" :class="{'active-route': activeRoute('/profession')}">职位</el-link>
        </div>
        <!-- 用户操作 -->
        <div class="user-nav">
          <el-link @click="activeLogin(interview)">我要求职</el-link>
          <el-link @click="activeLogin(recruit)">我要招聘</el-link>
          <el-button round size="mini" @click="activeLogin(interview)">注册</el-button>
          <el-button round size="mini" @click="activeLogin(login)">登录</el-button>
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
        }
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
        activeRoute(path) {
            const reg = new RegExp(path, "i");
            return reg.test(this.$route.path);
        },
        activeLogin(param) {
            window.localStorage.setItem("userType",param);
            this.$router.push("/login");
        }
    }
}
</script>

<style lang="less" scoped>
.tmargin {
    margin: 0 20%;
}

@navColor: #00d7c6;

header {
    .top-bar{
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
                &.user-nav {
                    float: right;
                    .el-link:last-of-type {
                        margin-right: 20px;
                    }
                }
            }
        }
    }
}

</style>