<!--
    城市选择组件，el-dialog形式
    传递参数：①visible是否可见，支持.sync修饰符
            ②currentCity当前定位城市，支持.sync修饰符
-->
<template>
  <el-dialog :visible="visible" @update:visible="visibleSync" class="city-list-wrapper">
    <div slot="title" class="city-list-title">
      <span class="title">城市选择</span>
      <span class="sub-title">切换城市，寻找心仪的工作</span>
    </div>
    <div class="city-list-content">
      <div class="content-prompt" v-if="!isUserSelect">
        <p>亲爱的用户您好:</p>
        <p>选择您心仪的城市，系统将为您自动导航</p>
      </div>
      <div class="current-city" v-if="!isUserSelect">
        <span class="current-position">当前定位：</span>
        <el-link class="city-name" @click="citySelect(currentCity)">
          <i class="el-icon-location-information"></i>
          <span>{{ currentCity }}</span>
        </el-link>
      </div>
      <div class="all-city-wrapper">
        <div class="city-tabs">
          <ul>
            <li v-for="tab in cityTabs" :key="tab"
                :class="{'is-active': currentTab === tab}"
                @click="currentTab = tab"
            >{{ tab }}
            </li>
          </ul>
        </div>
        <div class="city-display">
          <dl>
            <dd>
              <el-link v-for="city in cityList" :key="city"
                       :title="city" @click="citySelect(city)"
              >{{ city }}
              </el-link>
            </dd>
          </dl>
        </div>
      </div>
      <div class="content-footer" v-if="!isUserSelect">其他城市陆续开通中，敬请期待~</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
    name: "CityDialog",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        currentCity: {
            type: String,
            default: "全国"
        },
        isUserSelect: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentTab: "热门城市",
            cityTabs: ['热门城市','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
            cityData: [
                {
                    tab: "热门城市", cityList: ["全国","北京","上海","广州","深圳","杭州","西安","厦门","长沙","武汉","天津","成都","重庆","苏州"]
                },
                {
                    tab: "A", cityList: ["鞍山","安康","安阳","安庆","安顺","澳门","阿坝藏族羌族自治州","阿拉善盟","阿里地区","阿克苏地区","阿勒泰地区","阿拉尔"]
                },
                {
                    tab: "B", cityList: ["北京","白城","白山","本溪","包头","巴彦淖尔","保定","宝鸡","滨州","白银","蚌埠","毫州","毕节","巴中","保山","百色","北海","巴音郭楞蒙古自治州","博尔塔拉蒙古自治州","白沙黎族自治县","保亭黎族苗族自治县","北屯市"]
                },
                {
                    tab: "C", cityList: ["重庆","长春"]
                },
                {
                    tab: "D", cityList: ["东莞","大连"]
                },
                {
                    tab: "E", cityList: ["恩施土家族苗族自治州"]
                },
                {
                    tab: "F", cityList: ["佛山","福州"]
                },
                {
                    tab: "G", cityList: ["广州","贵阳","桂林"]
                },
                {
                    tab: "H", cityList: ["哈尔冰","鹤岗","黄冈","邯郸","杭州","黄山","惠州"]
                },
                {
                    tab: "J", cityList: ["吉林","济南","江门","揭阳"]
                },
                {
                    tab: "K", cityList: ["开封","昆明"]
                },
                {
                    tab: "L", cityList: ["兰州","柳州","丽江"]
                },
                {
                    tab: "M", cityList: ["茂名","梅州","绵阳","马鞍山"]
                },
                {
                    tab: "N", cityList: ["南京","宁波","宁德","南昌","南充","南宁"]
                },
                {
                    tab: "P", cityList: ["莆田","濮阳"]
                },
                {
                    tab: "Q", cityList: ["齐齐哈尔","秦皇岛","青岛","衢州"]
                },
                {
                    tab: "R", cityList: ["日照","日喀则"]
                },
                {
                    tab: "S", cityList: ["上海","绥化","双鸭山","沈阳","石家庄","深圳","汕头","汕尾"]
                },
                {
                    tab: "T", cityList: ["天津","铁岭","泰安","台湾"]
                },
                {
                    tab: "W", cityList: ["无锡","武汉","乌鲁木齐","芜湖"]
                },
                {
                    tab: "X", cityList: ["西安","咸阳","厦门","香港"]
                },
                {
                    tab: "Y", cityList: ["雅安","云浮","烟台","扬州","延安","岳阳"]
                },
                {
                    tab: "Z", cityList: ["张家口","淄博","郑州","周口"]
                }
            ],
        }
    },
    computed: {
        cityList() {
            const cityData = this.cityData.filter(item => item.tab === this.currentTab);
            return cityData.length ? cityData[0].cityList : [];
        }
    },
    methods: {
        visibleSync(event) {
            this.$emit('update:visible', event);
        },
        citySelect(city) {
            this.$emit('update:currentCity', city);
            this.$emit('update:visible', false);
        }
    }
}
</script>

<style lang="less" scoped>
.el-link-active{
    transition: .3s;
    &:hover{
        color: #fff;
        background: @mainColor;
    }
    &:active{
        color: #fff;
        background: @activeColor;
    }
}
.tab-active{
    transition: color .3s;
    &:hover{
        color: @activeColor;
    }
    &:active{
        color: #16a085;
    }
}
@mainColor: #5dd5c8;
@activeColor: #00c2b3;
@fontColor: #414a60;
@borderColor: #ecedef;
.city-list-wrapper{
    /deep/ .el-dialog{
        width: 660px;
    }
    /deep/ .el-dialog__header{
        padding: 0;
        background: @mainColor;
        color: #fff;
        span{
            display: inline-block;
            height: 50px;
            line-height: 50px;
            &:first-child{
                font-weight: 400;
                font-size: 17px;
                padding-left: 30px;
                margin-right: 10px;
            }
            &:last-child{
                font-size: 12px;
            }
        }
        i{
            color: #fff;
            transition: background-color .2s;
            &:hover{
                background: rgba(0,0,0,.1);
            }
        }
    }
    /deep/ .el-dialog__body{
        color: @fontColor;
        padding: 24px 30px 30px;
        .content-prompt{
            padding-bottom: 23px;
            border-bottom: 1px solid @borderColor;
            p{
                height: 30px;
                line-height: 30px;
                &:first-child{
                    font-size: 17px;
                }
            }
        }
        .current-city{
            margin-top: 27px;
            height: 34px;
            line-height: 34px;
            .current-position{
                margin-right: 12px
            }
            .el-link{
                color: @fontColor;
                border: 1px solid @borderColor;
                padding: 0 15px;
                transition: .3s;
                &:hover{
                    color: @mainColor;
                    border-color: @mainColor;
                }
                &:active{
                    color: @activeColor;
                    border-color: @activeColor;
                    i{
                        color: @activeColor;
                    }
                }
                i{
                    color: @mainColor;
                }
            }
        }
        .all-city-wrapper{
            margin-top: 40px;
            padding-bottom: 60px;
            border-bottom: 1px solid @borderColor;
            .city-tabs{
                ul li{
                    display: inline-block;
                    width: 70px;
                    margin-right: 30px;
                    margin-bottom: 16px;
                    cursor: pointer;
                    .tab-active();
                    &.is-active{
                        color: @activeColor
                    }
                    & + li{
                        width: 20px;
                    }
                }
            }
            .city-display{
                dl{
                    dd{
                        .el-link{
                            color: @fontColor;
                            border: 1px solid @borderColor;
                            width: 76px;
                            .el-link-active();
                            height: 34px;
                            line-height: 34px;
                            margin: 15px 20px 0 0;
                            padding: 0 2px;
                            display: inline-block;
                            text-align: center;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
        .content-footer{
            padding-top: 10px;
            font-size: 12px;
        }
    }
}
</style>