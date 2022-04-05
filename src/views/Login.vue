<template>
  <div class="container">
    <div class="login-wrapper">
      <h1>万家优聘</h1>
      <div class="login-box" v-if="userType === interview" :key="userType">
        <aside>
          <div class="aside-top show-border">
            <div class="toggle-tip">我要招聘</div>
            <el-button type="text" @click="changLogin(recruit)">
              注册企业账户
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
          <div class="aside-middle">OK</div>
          <div class="aside-bottom show-border">
            <div class="toggle-tip">已有账号</div>
            <el-button type="text" @click="changLogin(login)">
              直接登录
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </aside>
        <div class="login-form">
          <div class="login-title">
            <h2>创建新账户</h2>
            <h3>从此开启找工作新方式</h3>
          </div>
          <div class="login-content">
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
              <el-form-item prop="phone">
                <el-input placeholder="请输入常用手机号" v-model="loginForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-input class="verifyCode" placeholder="请输入验证码" v-model="loginForm.verifyCode" prefix-icon="el-icon-yanzhengma"></el-input>
                <div class="getValidateCode" @click="getValidateCode">
                  <span>{{ validateCode }}</span>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">注册/登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-footer">
            注册即代表您已同意
            <el-link>《用户服务协议》</el-link>
            <el-link>《隐私政策》</el-link>
          </div>
        </div>
      </div>
      <div class="login-box" v-else-if="userType === recruit" :key="userType">
        <aside>
          <div class="aside-top show-border">
            <div class="toggle-tip">我要求职</div>
            <el-button type="text" @click="changLogin(interview)">
              注册个人账户
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
          <div class="aside-middle">OK</div>
          <div class="aside-bottom show-border">
            <div class="toggle-tip">已有账号</div>
            <el-button type="text" @click="changLogin(login)">
              直接登录
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </aside>
        <div class="login-form">
          <div class="login-title">
            <h2>创建新账户</h2>
            <h3>招人，从此更轻松</h3>
          </div>
          <div class="login-content">
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
              <el-form-item prop="phone">
                <el-input placeholder="请输入常用手机号" v-model="loginForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-input class="verifyCode" placeholder="请输入验证码" v-model="loginForm.verifyCode" prefix-icon="el-icon-yanzhengma"></el-input>
                <div class="getValidateCode" @click="getValidateCode">
                  <span>{{ validateCode }}</span>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">注册/登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-footer">
            注册即代表您已同意
            <el-link>《用户服务协议》</el-link>
            <el-link>《隐私政策》</el-link>
          </div>
        </div>
      </div>
      <div class="login-box" v-else-if="userType === login" :key="userType">
        <aside>
          <div class="aside-top show-border">
            <div class="toggle-tip">我要求职</div>
            <el-button type="text" @click="changLogin(interview)">
              注册个人账户
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
          <div class="aside-middle">OK</div>
          <div class="aside-bottom show-border">
            <div class="toggle-tip">我要招聘</div>
            <el-button type="text" @click="changLogin(recruit)">
              注册企业账户
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </aside>
        <div class="login-form">
          <div class="login-title">
            <dl>
              <dd>
                <h2 v-for="toggle in toggleLogin" :key="toggle.name"
                    :class="{'is-active': loginType === toggle.loginType}"
                    @click="toggleLoginType(toggle)"
                >{{ toggle.name }}
                </h2>
              </dd>
            </dl>
          </div>
          <div class="login-content" v-if="loginType === verifyCode" :key="loginType">
              <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
                <el-form-item prop="phone">
                  <el-input placeholder="请输入常用手机号" v-model="loginForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
                </el-form-item>
                <el-form-item prop="verifyCode">
                  <el-input class="verifyCode" placeholder="请输入验证码" v-model="loginForm.verifyCode" prefix-icon="el-icon-yanzhengma"></el-input>
                  <div class="getValidateCode" @click="getValidateCode">
                    <span>{{ validateCode }}</span>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
                </el-form-item>
              </el-form>
            </div >
          <div class="login-content" v-else-if="loginType === passwordCode" :key="loginType">
            <el-form :model="passwordForm" :rules="passwordFormRules" ref="passwordForm">
              <el-form-item prop="phone">
                <el-input placeholder="请输入常用手机号" v-model="passwordForm.phone" prefix-icon="el-icon-mobile-phone"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="passwordForm.password" prefix-icon="el-icon-lock" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('passwordForm')">立即登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-footer">
            注册即代表您已同意
            <el-link>《用户服务协议》</el-link>
            <el-link>《隐私政策》</el-link>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import * as Constant from "@/common/constants.js";
export default {
    name: "Login",
    created() {
        this.checkUserType();
        this.getValidateCode();
    },
    destroyed() {
        window.localStorage.removeItem("userType")
    },
    data() {
        let checkPhone = (rule, value, callback) => {
            let reg = /^[1][34578][0-9]{9}$/;
            if (!value) {
                return callback(new Error("请输入手机号"));
            }
            else if (!reg.test(value)) {
                callback(new Error("请输入正确的手机号"));
            } else {
                callback();
            }
        };
        let checkVerifyCode = (rule, value, callback) => {
            let reg = new RegExp(this.validateCode,'i');
            if (!value) {
                callback(new Error("请输入验证码"));
            } else if(!reg.test(value)) {
                callback(new Error("验证码有误，请重新输入"));
            } else {
                callback();
            }
        };
        let checkPassword = (rule, value, callback) => {
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,18}$/;
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!reg.test(value)) {
                callback(new Error("密码必须包含字母和数字，且在6-18位之间"));
            } else {
                callback();
            }
        };
        return {
            // 登陆状态保存
            userType: window.localStorage.getItem("userType"),
            interview: Constant.REGISTER_TO_INTERVIEW,
            recruit: Constant.REGISTER_TO_RECRUIT,
            login: Constant.LOGIN,
            
            //登录方式保存
            loginType: Constant.LOGIN_VERIFY_CODE,
            verifyCode: Constant.LOGIN_VERIFY_CODE,
            passwordCode: Constant.LOGIN_PASSWORD_CODE,
            toggleLogin: [
                { name: "验证码登录", loginType: Constant.LOGIN_VERIFY_CODE },
                { name: "密码登录", loginType: Constant.LOGIN_PASSWORD_CODE }
            ],
            
            // 验证码表单
            loginForm: {
                phone: "",
                verifyCode: ""
            },
            // 密码表单
            passwordForm: {
                phone: "",
                password: ""
            },
            // 验证码表单登录规则
            loginFormRules: {
                phone: [
                    { validator: checkPhone, trigger: ['blur','change'] }
                ],
                verifyCode: [
                    { validator: checkVerifyCode, trigger: ['blur','change'] }
                ]
            },
            // 密码表单登录规则
            passwordFormRules: {
                phone: [
                    { validator: checkPhone, trigger: ['blur','change'] }
                ],
                password: [
                    { validator: checkPassword, trigger: ['blur','change'] }
                ]
            },
            // 验证码
            validateCode: ""
        }
    },
    methods: {
        checkUserType() {
            if(!this.userType){
                this.userType = Constant.REGISTER_TO_INTERVIEW;
            }
        },
        // 登录状态改变: 求职 / 招聘 / 直接登录
        changLogin(userType) {
            this.resetForm();
            window.localStorage.setItem("userType",userType);
            this.userType = window.localStorage.getItem("userType");
            console.log(this.userType);
            this.getValidateCode();
            this.loginType = Constant.LOGIN_VERIFY_CODE;
        },
        // 获取随机4位验证码
        getValidateCode() {
            const data = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const length = data.length - 1;
            let code = "";
            for(let i = 0; i < 4; i++){
                code += data.charAt(Math.floor(Math.random() * length));
            }
            return this.validateCode = code;
        },
        // 直接登录方式切换: 验证码登录 / 密码登录
        toggleLoginType(toggle){
            this.resetForm();
            this.loginType = toggle.loginType;
            this.getValidateCode();
        },
        // 提交登录表单
        submitForm(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if(formName === 'loginForm') {
                        let login_role = this.userType === this.interview ? "0" : (this.userType === this.recruit ? "1" : "");
                        const res = await this.$axios.request({
                            url: `/login/getUserByPhone`,
                            method: "get",
                            params: {
                                login_phone: this.loginForm.phone,
                                login_role: login_role
                            }
                        });
                        console.log(res);
                        if (res.msg === 'success') {
                            window.localStorage.setItem("login_id", res.data.login_id);
                            window.localStorage.setItem("login_role", res.data.login_role);
                            this.$store.commit("setLogin");
                            // 招聘官要验证是否为刚注册用户，若是，则跳转注册信息页
                            if(login_role === "1") {
                                const res = await this.$axios.request({
                                    url: `/recruiter/info/${this.$store.state.login_id}`,
                                    method: "get"
                                });
                                console.log(res);
                                if(res.msg !== "success" || !res.data){
                                    return this.$router.push("/register");
                                }
                            }
                        }
                        else {
                            this.$message.error(res.msg);
                            return this.resetForm();
                            
                        }
                    }
                    else if(formName === 'passwordForm') {
                        const res = await this.$axios.request({
                            url: `/login/getUserByPass/${this.passwordForm.phone}/${this.passwordForm.password}`,
                            method: "get"
                        });
                        console.log(res);
                        if (res.msg === 'success') {
                            this.$store.commit("setLogin", {
                                login_id: res.data.login_id,
                                login_role: res.data.login_role
                            });
                        } else {
                            this.$message.error("账号或密码错误，请重新登录");
                            return this.resetForm();
                        }
                    }
                    this.$message.success("登录成功");
                    await this.$router.push("/home");
                } else {
                    // alert("登录失败");
                    this.$message.error("登录信息有误，请重新输入");
                    this.resetForm();
                }
            })
        },
        // 重置登录表单
        resetForm() {
            if(this.$refs.loginForm){
                this.$refs.loginForm.resetFields();
            }
            if(this.$refs.passwordForm) {
                this.$refs.passwordForm.resetFields();
            }
            // for (const key of Object.keys(this.loginForm)) {
            //     this.loginForm[key] = "";
            // }
            // for (const key of Object.keys(this.passwordForm)) {
            //     this.passwordForm[key] = "";
            // }
        }
    }
}
</script>

<style lang="less" scoped>
@loginColor: #00c2b3;
.container{
    min-width: 100vw;
    min-height: 100vh;
    background: #2BB594;
    position: relative;
    .login-wrapper{
        width: fit-content;
        height: fit-content;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        h1{
            margin-bottom: 40px;
            color: #fff;
        }
        .login-box{
            padding: 60px;
            background: #fff;
            position: relative;
            aside{
                //padding: 30px 0;
                position: absolute;
                left: calc(50% + 30px);
                top: 50%;
                transform: translateY(-50%);
                font-size: 15px;
                .show-border{
                    border-left: 1px dashed #8d92a1;
                    padding: 40px 100px 40px 120px;
                    .toggle-tip{
                        height: 40px;
                        line-height: 40px;
                    }
                }
                .aside-middle{
                    transform: translateX(-.6em);
                    margin: 8px 0;
                    font-size: 12px;
                }
                
            }
            .login-form{
                margin-right: 360px;
                .login-title{
                    margin-bottom: 40px;
                    h2,h3{
                        height: 40px;
                        line-height: 40px;
                    }
                    h2{
                        font-size: 18px;
                    }
                    h3{
                        font-weight: 400;
                        font-size: 13px;
                        color: #8d92a1;
                        padding-bottom: 25px;
                        box-sizing: content-box;
                        position: relative;
                        &::after{
                            content: "";
                            display: inline-block;
                            width: 56px;
                            height: 3px;
                            border-radius: 3px;
                            background: @loginColor;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                        }
                    }
                    dl dd{
                        h2{
                            display: inline-block;
                            position: relative;
                            cursor: pointer;
                            & + h2{
                                margin-left: 40px;
                            }
                            &:not(.is-active){
                                color: #8d92a1;
                                &::after{
                                    display: none;
                                }
                            }
                            &::after{
                                content: "";
                                display: inline-block;
                                width: 100%;
                                height: 1.5px;
                                border-radius: 3px;
                                background: @loginColor;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                            }
                        }
                    }
                }
                .login-content{
                    .el-form-item:last-of-type{
                        margin-top: 40px;
                    }
                    .el-input{
                        /deep/ .el-input__prefix{
                            left: -2px;
                        }
                        /deep/ .el-input__inner{
                            border-width: 0 0 1px 0;
                            border-radius: 0;
                            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                            &:focus{
                                border-color: @loginColor;
                            }
                        }
                        &.verifyCode{
                            width: 75%;
                            & + .getValidateCode{
                                width: 20%;
                                margin-left: 5%;
                                display: inline-block;
                                border: 1px solid #dcdfe6;
                                text-align: center;
                                font-size: 16px;
                                cursor: pointer;
                            }
                        }
                    }
                    .el-button{
                        width: 100%;
                        height: 100%;
                        letter-spacing: 6px;
                    }
                }
                .login-footer{
                    font-size: 12px;
                    .el-link{
                        color: @loginColor;
                        font-size: 12px;
                        margin: 0;
                    }
                }
            }
        }
        
    }
}
</style>