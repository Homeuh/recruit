<template>
  <footer>
    <!-- 外层包裹 获取总宽度-->
    <div class="footer-wrapper margin-20per">
      <!-- 再一层包裹器，防止jq无故错误 -->
      <div class="wrapper">
        <!-- 里层包裹 获取内容宽度-->
        <div class="inner-wrapper">
          <!-- 底部左侧管理员 -->
          <div class="user-feedback">
            <p>合作请咨询管理员</p>
            <img :src="require('@/image/admin.jpg')" style="width: 200px; height: 200px; object-fit: cover"/>
          </div>
          <!-- 企业服务 -->
          <div class="company-service">
            <h3>企业服务</h3>
            <div class="company-service-link">
              <el-link>招聘必备法典</el-link>
              <el-link>公司搜索</el-link>
              <el-link>万优APP</el-link>
            </div>
          </div>
          <!-- 使用与帮助 -->
          <div class="usage-help">
            <h3>使用与帮助</h3>
            <div class="usage-help-link">
              <el-link>用户协议</el-link>
              <el-link>个人隐私政策</el-link>
              <el-link>防骗指南</el-link>
              <el-link>使用帮助</el-link>
            </div>
          </div>
          <!-- 联系方式 -->
          <div class="contact-info">
            <h3>万家优聘</h3>
            <div class="contact-info-link">
              <p>服务热线：400 280 2800</p>
              <p>举报热线：400 820 8200</p>
              <p>企业邮箱：850609866@qq.com</p>
              <p>联系我们</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    name: "GeneralFooter",
    mounted() {
        this.footerMargin();
    },
    updated() {
        this.footerMargin();
    },
    methods: {
        // 计算footer右侧 相等的marginLeft值
        footerMargin() {
            const wrapper = document.querySelector(".footer-wrapper");
            const wrapper_width = this.$(wrapper).innerWidth();
            const inner_wrapper = document.querySelector(".inner-wrapper");
            const inner_wrapper_width = this.$(inner_wrapper).innerWidth();
            const footer_right = document.querySelectorAll(".inner-wrapper div + div")
            footer_right.forEach(item => {
                item.style.marginLeft = (wrapper_width - inner_wrapper_width) / 3 + "px"
            })
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
@borderColor: #dcdfe6;
@fontColor: #8d92a1;
footer{
    margin-top: 100px;
    height: 300px;
    background: #fff;
    .wrapper{
        padding: 30px 0;
        display: flex;
        .inner-wrapper{
            display: inline-flex;
        }
        .user-feedback{
            display: inline-flex;
            flex-direction: column;
            text-align: center;
            padding-right: 60px;
            border-right: 1px solid @borderColor;
            p{
                font-size: 15px;
                font-weight: 600;
            }
        }
        div + div{
            white-space: nowrap;
            h3{
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                font-weight: 600;
            }
            > div{
                * {
                    font-size: 12px;
                    margin: 10px 0 0 0;
                }
                color: @fontColor;
                .el-link{
                    display: block;
                    color: inherit;
                  .el-link-active();
                }
            }
        }
    }
}
</style>