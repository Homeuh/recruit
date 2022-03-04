<template>
  <header>
    <!-- 顶部导航 -->
    <div class="top-bar">
      <nav class="margin-20per">
        <!-- 顶部logo -->
        <div class="logo">
          <el-link href="/home">
            万家优<i class="el-icon-zhaopin"></i>
          </el-link>
        </div>
        <!-- 坐标城市 -->
        <div class="nav-city" @click="dialogVisible = true">
          <p class="nav-city-box">
            <i class="el-icon-location-outline"></i>
            <span class="nav-city-selected">深圳</span>
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
          <el-link href="/home">我要求职</el-link>
          <el-link href="/home">我要招聘</el-link>
          <el-button round size="mini">注册</el-button>
          <el-button round size="mini">登录</el-button>
        </div>
      </nav>
    </div>
    <CityDialog :visible.sync="dialogVisible"/>
  </header>
</template>

<script>
import CityDialog from "@/components/CityDialog";
export default {
    name: "GeneralTopBar",
    components: {CityDialog},
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        activeRoute(path) {
            return this.$route.path === path
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
                    /deep/ .el-icon-zhaopin{
                        font-size: 28px;
                        transform: translateY(3.5px) translateX(-2px);
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