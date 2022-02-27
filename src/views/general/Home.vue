<template>
  <div class="container">
    <header>
      <nav>
        <div class="logo">
          <el-link href="/home">万家优聘</el-link>
        </div>
        <div class="nav-city">
          <p class="nav-city-box">
            <i class="el-icon-location-outline"></i>
            <span class="nav-city-selected">深圳</span>
            <span class="switch-city">[切换城市]</span>
          </p>
        </div>
        <div class="nav">
          <el-link href="/home">首页</el-link>
          <el-link href="/profession">职位</el-link>
        </div>
        <div class="user-nav">
          <el-link href="/home">我要求职</el-link>
          <el-link href="/home">我要招聘</el-link>
          <el-button round size="mini">注册</el-button>
          <el-button round size="mini">登录</el-button>
        </div>
      </nav>
    </header>
    <main>
      <div class="search-form">
        <el-input placeholder="搜索职位、公司" v-model="searchKey" class="search">
          <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
        </el-input>
        <div class="search-hot">
          <b>热搜职位：</b>
          <ul>
            <li v-for="(hot,index) in hotWords" :key="hot + index">
              {{ hot }}
            </li>
          </ul>
        </div>
      </div>
      <div class="home-sider">
        <div class="job-menu">
          <dl></dl>
        </div>
      </div>
    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                searchKey: "",
                hotWords: ["游戏策划","产品经理","PHP","前端工程师","java","测试","后端开发","运营","销售","人力资源"],
                jobMenu: [
                    {
                        title: "技术", keys: ["Java","PHP","web前端","安卓"],
                        subMenu: [
                            {
                                title: "后端开发", keys: ["Java","PHP","C#","C++","Python"],
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
                        title: "产品", keys: ["产品经理","产品总监/VP","产品助理",],
                        subMenu: [
                            {
                                title: "产品经理", keys: ["产品经理","产品总监/VP","产品助理","游戏策划"],
                            },
                            {
                                title: "其他产品职位", keys: ["其他产品职位"]
                            }
                        ],
                    },
                ],
            };
        }
    }
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100vh;
    background: #f6f6f8;
}

.tmargin{
    margin: 0 15%;
}

@navColor: #00d7c6;
header{
    background: #202329;
    nav{
        height: 49px;
        .tmargin();
        > div{
            float: left;
            height: 49px;
            line-height: 49px;
            font-size: 14px;
            color: #ffffff;
            &.logo{
                position: relative;
                bottom: 3px;
                /deep/ .el-link--inner{
                    font-size: 22px;
                    color: @navColor;
                }
            };
            &.nav-city{
                margin-left: 12px;
                .nav-city-box{
                    height: 100%;
                    cursor: pointer;
                    i{
                        font-size: 18px;
                        margin-right: 2px;
                        color: @navColor;
                    }
                    .nav-city-selected{
                        color: @navColor;
                    }
                    .switch-city{
                        font-size: 12px;
                        margin-left: 10px
                    }
                }
            };
            &.nav{
                .el-link{
                    margin-left: 30px;
                }
            };
            &.user-nav{
                float: right;
                .el-link:last-of-type{
                    margin-right: 20px;
                }
            }
        }
    }
}
@mainColor: #5dd5c8;
main{
    .tmargin();
    .search-form{
        .tmargin();
        width: 70%;
        padding-top: 20px;
        .search{
            /deep/ .el-input__inner{
                height: 48px;
                line-height: 48px;
                font-size: 16px;
            };
            /deep/ .el-input-group__append{
                background: #5dd5c8;
                color: #ffffff;
                text-align: center;
                padding: 0 50px;
                font-size: 24px;
                cursor: pointer;
                &:hover{
                    opacity: .9;
                }
            }
        };
        .search-hot{
            padding-top: 10px;
            padding-bottom: 40px;
            font-size: 13px;
            color: #9fa3b0;
            b{
                font-weight: 400;
            }
            ul{
                display: inline-flex;
                white-space: nowrap;
                li{
                    margin-left: 15px;
                    cursor: pointer;
                    &:hover{
                        color: @mainColor;
                    }
                }
            }
        }
    };
    
}
</style>