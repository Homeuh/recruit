<!--
  首页侧栏职位框复用封装
  传递参数：jobMenu工作列表
    value为对象类型
    { title: String, keys: Array[String],
      subMenu: Array[
        title: String, keys: Array[String]
      ]
    }
-->
<template>
  <div class="job-menu">
    <dl v-for="(job,jobIndex) in jobMenu" :key="job.title + jobIndex">
      <dd>
        <i class="el-icon-arrow-right"></i>
        <b>{{ job.title }}</b>
        <el-link v-for="(key,keyIndex) in job.keys"
                 :key="key + keyIndex"
        >{{ key }}
        </el-link>
      </dd>
      <div class="sub-job-menu" >
        <b>{{ job.title }}</b>
        <ul>
          <li v-for="(sub,subIndex) in job.subMenu" :key="sub + subIndex">
            <h4>{{ sub.title }}</h4>
            <div class="text">
              <el-link v-for="(subKey,subKeyIndex) in sub.keys" :key="subKey + subKeyIndex"
              >{{ subKey }}
              </el-link>
            </div>
          </li>
        </ul>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
    name: "JobMenu",
    props: {
        jobMenu: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
        
        };
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.job-menu {
    color: #61687c;
    position: relative;
    dl:hover {
        dd ~ div {
            display: block;
        }
    }
    dd {
        padding: 8px 20px;
        height: 45px;
        line-height: 26px;
        position: relative;
        .el-link {
            transition: 0s;
        }
        &:hover {
            background: #5dd5c8;
            color: #fff;
            .el-link {
                color: #fff;
            }
        }
        i {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        .el-link {
            margin-left: 16px;
            color: #61687c;
            & + .el-link {
                margin-left: 16px;
            }
        }
    }
    .sub-job-menu {
        display: none;
        background: #fff;
        padding: 20px 30px;
        position: absolute;
        left: 100%;
        top: -5px;
        z-index: 3;
        box-shadow: 0 1px 6px rgba(6, 0, 1, .1);
        b {
            display: block;
            height: 30px;
            line-height: 30px;
            margin-bottom: 5px;
        }
        ul {
            li {
                &:last-of-type .text{
                    border-bottom: 0;
                }
                & + li{
                    padding-top: 10px;
                }
                h4 {
                    float: left;
                    width: 110px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 13px;
                    font-weight: 400;
                    color: #8d92a1;
                }
                .text {
                    width: 517px;
                    margin-left: 110px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #f5f6f9;
                    .el-link {
                        color: #61687c;
                        font-size: 13px;
                        margin: 0 25px 0 0;
                        height: 28px;
                        line-height: 28px;
                        &:hover {
                            color: #5dd5c8;
                        }
                    }
                }
            }
        }
    }
}
</style>