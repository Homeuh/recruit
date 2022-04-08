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
                 @click="navSelect(nav)"
            >{{ nav }}
            </div>
          </nav>
          <div class="message" v-if="messageList.length === 0">
            <el-empty :image-size="200"></el-empty>
          </div>
          <div class="message" v-else></div>
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
        name: "ApplicantMessage",
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
                currentMenu: "我的消息",
                navList: ["系统消息","在线消息"],
                currentNav: "系统消息",
                messageList: [],
            }
        },
        methods: {
            menuSelect(name) {
                this.currentMenu = name;
            },
            navSelect(nav){
                this.currentNav = nav;
            },
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
            padding-bottom: 30px;
            background: @background;
            nav {
                background: #f8f9fc;
                display: flex;
                justify-content: space-evenly;
                align-items: center;

                .nav-tab {
                    position: relative;
                    width: 100%;
                    text-align: center;
                    height: 60px;
                    line-height: 60px;
                    font-size: 16px;
                    cursor: pointer;
                  .el-link-active();

                    &::after {
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

                    &.nav-selected {
                        color: @activeColor;

                        &::after {
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>