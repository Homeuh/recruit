<template>
  <div class="interview-evaluation">
    <h3>面试评价<el-link v-if="showMoreLink" class="show-more-link" :href="'/profession/evaluation?job_id=' + $route.query.job_id">查看更多评价</el-link></h3>
    <div class="total-evaluation-score" v-if="isCompany">
      <div class="score-wrapper">
        <span>综合评分</span>
        <h2>{{ total_score.toFixed(1) }}</h2>
        <Score :value="total_score" disabledColor="#C0C4CC"/>
      </div>
      <div class="score-wrapper">
        <span>描述相符</span>
        <h2>{{ total_score_description.toFixed(1) }}</h2>
        <Score :value="total_score_description" disabledColor="#C0C4CC"/>
      </div>
      <div class="score-wrapper">
        <span>面试官</span>
        <h2>{{ total_score_recruiter.toFixed(1) }}</h2>
        <Score :value="total_score_recruiter" disabledColor="#C0C4CC"/>
      </div>
      <div class="score-wrapper">
        <span>公司环境</span>
        <h2>{{ total_score_environment.toFixed(1) }}</h2>
        <Score :value="total_score_environment" disabledColor="#C0C4CC"/>
      </div>
    </div>
    <div class="filter-select" v-if="isCompany && isEvaluation">
      <span v-for="ind in industry" :key="ind" :class="{'is-active': activeIndustry === ind}" @click="selectIndustry(ind)">{{ ind }}</span>
    </div>
    <div class="content">
      <dl>
        <dd v-for="(eva,index) in evaluation" :key="eva.applicant_name + index">
          <div class="applicant">
            <img :src="eva.applicant_avatar" :alt="eva.applicant_name"
                 style="width: 45px; height: 45px; border-radius: 50%"/>
            <p>{{ eva.applicant_name }}</p>
          </div>
          <div class="evaluation">
            <h2>{{ eva.evaluation_title}}</h2>
            <div class="evaluation-score">
              <span>描述相符</span>
              <Score :value="eva.score_description"/>
              <span>面试官</span>
              <Score :value="eva.score_recruiter"/>
              <span>公司环境</span>
              <Score :value="eva.score_environment"/>
              <span>{{ eva.create_date }}</span>
            </div>
            <p>{{ eva.evaluation_description }}</p>
            <div class="user-click">
              <span v-if="isCompany" style="float: left;">
                面试职位：{{ eva.job_duty }}
                <span v-if="eva.job_status === '0'">（&nbsp;已下线&nbsp;）</span>
              </span>
              <span>{{ eva.useful_num }}个人觉得有用</span>
              <el-button type="text" @click="userClick(eva,index)">
                <i ref="dianzan" class="el-icon-dianzan"></i>
              </el-button>
            </div>
          </div>
        </dd>
      </dl>
    </div>
    <el-link v-if="showMoreBtn" class="show-more-btn" :href="'/company/evaluation?company_id=' + $route.query.company_id">查看更多评价</el-link>
    <!-- 分页栏 -->
    <div v-if="isEvaluation" class="page margin-20per">
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
</template>

<script>
import Score from "../../../components/Score";
export default {
    name: "InterviewEvaluation",
    components: { Score},
    props: {
        dataList: {
            type: Array,
            default: () => []
        },
        showMoreLink: {
            type: Boolean,
            default: false
        },
        showMoreBtn: {
            type: Boolean,
            default: false
        },
        isCompany: {
            type: Boolean,
            default: false
        },
        isEvaluation: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            evaluation: this.dataList,
            total_score: 4.0,
            total_score_description: 4.1,
            total_score_recruiter: 4.6,
            total_score_environment: 4.0,
            industry: ["全部", "技术", "产品", "设计", "运营", "市场", "销售", "职能", "其他"],
            activeIndustry: "全部",
            currentPage: 1,
            total: 1000,
        }
    },
    methods: {
        userClick(evaluation, index) {
            evaluation.click_num += 1;
            const isOdd = evaluation.click_num % 2 === 1;
            isOdd ? evaluation.useful_num += 1 : evaluation.useful_num -= 1;
            isOdd ? this.$refs.dianzan[index].style.color = "#F7BA2A" : this.$refs.dianzan[index].style.color = "";
        },
        handleCurrentChange(value) {
            console.log(value)
            console.log(this.$route)
        },
        selectIndustry(industry) {
            this.activeIndustry = industry;
        }
    },
}
</script>

<style lang="less" scoped>
.show-more-active{
    color: @mainColor;
    transition: .3s;
    &:hover{
        color: @activeColor;
    }
    &:active{
        color: #16a085;
    }
}

@mainColor: #5dd5c8;
@activeColor: #00c2b3;
@background: #f6f6f8;
@promptColor: #8d92a1;
@borderColor: #dcdfe6;
.interview-evaluation{
    h3{
        margin-bottom: 30px;
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 16px;
        position: relative;
        &::after{
            content: "";
            display: block;
            width: 24px;
            height: 2px;
            border-radius: 3px;
            background: @mainColor;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        .el-link{
            .show-more-active();
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
    .total-evaluation-score{
        margin: 50px 0;
        display: flex;
        justify-content: space-evenly;
        .score-wrapper{
            flex: 1;
            text-align: center;
            position: relative;
            &:last-of-type::after{
                display: none;
            }
            &::after{
                content: "";
                width: 1px;
                height: 32px;
                background: @borderColor;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            span{
                font-size: 16px;
            }
            h2{
                font-size: 32px;
                font-weight: normal;
                line-height: 75px;
            }
            .score{
                display: block;
            }
        }
    }
    .filter-select{
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid @borderColor;
        &::after{
            content: "";
            display: table;
            clear: both;
        }
        span{
            float: left;
            padding: 0 10px 15px;
            .show-more-active();
            color: @promptColor;
            font-size: 14px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            &.is-active{
                border-color: @activeColor;
            }
        }
    }
    .content{
        margin-top: 30px;
        dd {
            margin-bottom: 60px;
            padding-bottom: 45px;
            border-bottom: 1px dotted @borderColor;
            display: flex;
            &:last-of-type{
                margin: 0;
                padding: 0;
                border: 0;
            }
        }
        .applicant{
            padding-right: 30px;
            border-right: 3px solid @background;
            p{
                margin-top: 16px;
                font-size: 16px;
                white-space: nowrap;
            }
        }
        .evaluation{
            width: 100%;
            padding-left: 30px;
            color: @promptColor;
            h2{
                font-size: 18px;
                font-weight: normal;
                color: #414a60;
            }
            .evaluation-score{
                margin-top: 5px;
                margin-bottom: 25px;
                display: flex;
                white-space: nowrap;
                span:last-of-type{
                    margin-left: auto;
                }
                .score {
                    /deep/ .el-rate{
                        margin-left: 12px;
                        margin-right: 25px;
                    }
                    /deep/ .el-rate__icon{
                        margin-right: 0;
                    }
                }
            }
            p{
                margin-bottom: 25px;
            }
            .user-click{
                text-align: right;
                height: 30px;
                line-height: 30px;
                .el-button{
                    margin-left: 12px;
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    line-height: 23px;
                    text-align: center;
                    border: 1px solid @borderColor;
                    border-radius: 50%;
                    color: @activeColor;
                    cursor: pointer;
                    &:hover{
                        animation: focus .5s;
                    }
                    @keyframes focus{
                        25%{
                            transform: translateY(-8px)
                        }
                        75%{
                            transform: translateY(2px)
                        }
                    }
                }
            }
        }
    }
    .show-more-btn{
        display: block;
        width: 387px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        margin: 50px auto 0;
        border: 1px solid @mainColor;
        color: @mainColor;
        transition: .3s;
        &:hover{
            color: #fff;
            background: @mainColor;
        }
        &:active{
            background: #00c2b3;
        }
    }
    .page{
        margin-top: 60px;
        text-align: center;
        .el-pagination{
            margin-right: 300px;
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