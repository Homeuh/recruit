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
        <h2>
          <span>账号设置</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="账号注销">账号注销</el-dropdown-item>
              <el-dropdown-item command="重置密码">重置密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </h2>
        <div class="setting">
           <div class="setting-wrapper">
             <div class="setting-name">登录手机</div>
             <el-input
                   v-model="loginForm.login_phone"
                   :disabled="true">
             </el-input>
             <el-button type="primary" @click="editOpen('phoneDialogVisible')">更换号码</el-button>
           </div>
          <div class="setting-wrapper">
            <div class="setting-name">登录密码</div>
            <el-input
                  v-model="loginForm.password"
                  :disabled="true"
                  show-password>
            </el-input>
            <el-button type="primary" @click="editOpen('passwordDialogVisible')">修改密码</el-button>
          </div>
          <div class="setting-wrapper">
            <div class="setting-name">微信号码</div>
            <el-input
                  v-model="loginForm.applicant_wechat"
                  :disabled="true">
            </el-input>
            <el-button type="primary" @click="editOpen('wechatDialogVisible')">更换微信</el-button>
          </div>
          <div class="setting-wrapper">
            <div class="setting-name">绑定邮箱</div>
            <el-input
                  v-model="loginForm.applicant_email"
                  :disabled="true">
            </el-input>
            <el-button type="primary" @click="editOpen('emailDialogVisible')">更换邮箱</el-button>
          </div>
        </div>
      </div>
    </main>
    <!-- 底部信息栏 -->
    <GeneralFooter />
    
    <!-- 更换登录手机号 -->
    <el-dialog
          :close-on-click-modal="false"
          title="新的登录手机号码"
          :visible.sync="phoneDialogVisible"
          width="30%">
          <el-form :model="phoneForm" :rules="phoneRules" ref="phoneForm" label-width="84px">
            <el-form-item label="登录手机" prop="login_phone">
              <el-input placeholder="请输入当前登录手机号码" v-model="phoneForm.login_phone"></el-input>
            </el-form-item>
            <el-form-item label="密码验证" prop="password" v-if="loginForm.password">
              <el-input placeholder="请输入当前账号登录密码" v-model="phoneForm.password"></el-input>
            </el-form-item>
            <el-form-item label="新的手机" prop="newPhone">
              <el-input placeholder="请输入新的手机号码" v-model="phoneForm.newPhone"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('phoneForm','phoneDialogVisible')">取 消</el-button>
        <el-button type="primary" @click="submitForm('phoneForm','phoneDialogVisible')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
          :close-on-click-modal="false"
          title="修改密码"
          :visible.sync="passwordDialogVisible"
          width="30%">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="84px">
        <el-form-item label="旧密码" prop="password" v-if="loginForm.password">
          <el-input placeholder="请输入旧密码" v-model="passwordForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input placeholder="请输入新密码" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input placeholder="请二次确认新密码" v-model="passwordForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('passwordForm','passwordDialogVisible')">取 消</el-button>
        <el-button type="primary" @click="submitForm('passwordForm','passwordDialogVisible')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 换绑微信 -->
    <el-dialog
          :close-on-click-modal="false"
          title="微信绑定"
          :visible.sync="wechatDialogVisible"
          width="30%">
      <el-form :model="wechatForm" :rules="wechatRules" ref="wechatForm" label-width="84px">
        <el-form-item label="登录手机" prop="login_phone">
          <el-input placeholder="请输入当前登录手机号码" v-model="wechatForm.login_phone"></el-input>
        </el-form-item>
        <el-form-item label="密码验证" prop="password" v-if="loginForm.password">
          <el-input placeholder="请输入当前账号登录密码" v-model="wechatForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新的微信" prop="newWechat">
          <el-input placeholder="请输入新的微信号" v-model="wechatForm.newWechat"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('wechatForm','wechatDialogVisible')">取 消</el-button>
        <el-button type="primary" @click="submitForm('wechatForm','wechatDialogVisible')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 换绑邮箱 -->
    <el-dialog
          :close-on-click-modal="false"
          title="邮箱绑定"
          :visible.sync="emailDialogVisible"
          width="30%">
      <el-form :model="emailForm" :rules="emailRules" ref="emailForm" label-width="84px">
        <el-form-item label="登录手机" prop="login_phone">
          <el-input placeholder="请输入当前登录手机号码" v-model="emailForm.login_phone"></el-input>
        </el-form-item>
        <el-form-item label="密码验证" prop="password" v-if="loginForm.password">
          <el-input placeholder="请输入当前账号登录密码" v-model="emailForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新的邮箱" prop="newEmail">
          <el-input placeholder="请输入新的邮箱地址" v-model="emailForm.newEmail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('emailForm','emailDialogVisible')">取 消</el-button>
        <el-button type="primary" @click="submitForm('emailForm','emailDialogVisible')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import GeneralTopBar from "@/components/GeneralTopBar";
    import GeneralFooter from "@/components/GeneralFooter";
    import SymbolIcon from "@/components/SymbolIcon";

    export default {
        name: "ApplicantSetting",
        components: { GeneralTopBar, GeneralFooter, SymbolIcon},
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("请输入登录手机号"));
                }
                else if (this.loginForm.login_phone !== value) {
                    callback(new Error("手机号输入有误，请重新输入"));
                } else {
                    callback();
                }
            };
            let checkPassword = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入旧密码"));
                } else if (this.loginForm.password !== value) {
                    callback(new Error("密码输入有误，请重新输入"))
                } else {
                    callback();
                }
            };
            let checkNewPhone = (rule, value, callback) => {
                let reg = /^[1][34578][0-9]{9}$/;
                if (!value) {
                    return callback(new Error("新的手机号不能为空"));
                }
                else if (!reg.test(value)) {
                    callback(new Error("请输入正确的手机号"));
                } else if(this.loginForm.login_phone === value){
                    callback(new Error("新的手机号不能和旧手机号相同"));
                } else {
                    callback();
                }
            };
            let checkNewPassword = (rule, value, callback) => {
                let reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;
                if (!value) {
                    callback(new Error("新的密码不能为空"));
                } else if (!reg.test(value)) {
                    callback(new Error("新的密码需要同时拥有数字、字母，且长度为6-18位"))
                } else if(this.loginForm.password === value){
                    callback(new Error("新的密码不能与旧密码相同"));
                } else {
                    callback();
                }
            };
            let confirmPassword = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请二次确认新的密码"));
                } else if(this.passwordForm.newPassword !== value) {
                    callback(new Error("输入密码与上一次密码不同，请重新输入"));
                } else {
                    callback();
                }
            };
            let checkEmail = (rule, value, callback) => {
                let reg = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/
                if (!value) {
                    callback(new Error("新的邮箱地址不能为空"));
                } else if (!reg.test(value)) {
                    callback(new Error("邮箱地址格式有误，请重新输入"))
                } else {
                    callback();
                }
            }
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
                currentMenu: "账号设置",
                loginForm: {},
                /*loginForm: {
                    login_phone: "13522342234",
                    password: "12345678",
                    applicant_wechat: "Homeuh",
                    applicant_email: "850609866@qq.com"
                },*/
                
                // 更换手机
                phoneForm: {
                    login_phone: "",
                    password: "",
                    newPhone: "",
                },
                phoneRules: {
                    login_phone: [
                        { required: true, validator: checkPhone, blur: ['blur','change']}
                    ],
                    password: [
                        { required: true, validator: checkPassword, blur: ['blur','change']}
                    ],
                    newPhone: [
                        { required: true, validator: checkNewPhone, blur: 'blur'}
                    ],
                },
                phoneDialogVisible: false,

                // 修改密码
                passwordForm: {
                    password: "",
                    newPassword: "",
                    confirmPassword: ""
                },
                passwordRules: {
                    password: [
                        { required: true, validator: checkPassword, blur: ['blur','change']}
                    ],
                    newPassword: [
                        { required: true, validator: checkNewPassword, blur: ['blur','change']}
                    ],
                    confirmPassword: [
                        { required: true, validator: confirmPassword, blur: 'blur'}
                    ],
                },
                passwordDialogVisible: false,

                // 换绑微信
                wechatForm: {
                    login_phone: "",
                    password: "",
                    newWechat: ""
                },
                wechatRules: {
                    login_phone: [
                        { required: true, validator: checkPhone, blur: ['blur','change']}
                    ],
                    password: [
                        { required: true, validator: checkPassword, blur: ['blur','change']}
                    ],
                    newWechat: [
                        { required: true, message: "新的微信号不能为空", blur: ['blur','change']}
                    ],
                },
                wechatDialogVisible: false,
                
                // 换绑邮箱
                emailForm: {
                    login_phone: "",
                    password: "",
                    newEmail: ""
                },
                emailRules: {
                    login_phone: [
                        { required: true, validator: checkPhone, blur: ['blur','change']}
                    ],
                    password: [
                        { required: true, validator: checkPassword, blur: ['blur','change']}
                    ],
                    newEmail: [
                        { required: true, validator: checkEmail, blur: ['blur','change']}
                    ],
                },
                emailDialogVisible: false,
            }
        },
        created() {
            this.$store.commit("setLogin");
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: "/applicant/setting/" + this.$store.state.login_id,
                    method: "get"
                })
                console.log(res)
                if (res.msg === "success") {
                    this.loginForm = Object.assign({},{},res.data.loginForm);
                }
            },
            async postForm(formName) {
                let res;
                switch(formName){
                    case "phoneForm":
                        res = await this.$axios.request({
                            url: "/login/updatePhone",
                            method: "post",
                            data: {
                                login_id: this.$store.state.login_id,
                                newPhone: this[formName].newPhone
                            }
                        });
                        console.log(res);
                        await this.initData();
                        break;
                    case "passwordForm":
                        res = await this.$axios.request({
                            url: "/login/updatePass",
                            method: "post",
                            data: {
                                login_id: this.$store.state.login_id,
                                newPass: this[formName].newPassword
                            }
                        });
                        console.log(res);
                        await this.initData();
                        break;
                    case "wechatForm":
                        res = await this.$axios.request({
                            url: "/applicant/updateWechat",
                            method: "post",
                            data: {
                                login_id: this.$store.state.login_id,
                                newWechat: this[formName].newWechat
                            }
                        });
                        console.log(res);
                        await this.initData();
                        break;
                    case "emailForm":
                        res = await this.$axios.request({
                            url: "/applicant/updateEmail",
                            method: "post",
                            data: {
                                login_id: this.$store.state.login_id,
                                newEmail: this[formName].newEmail
                            }
                        });
                        console.log(res);
                        await this.initData();
                        break;
                }
            },
            menuSelect(name) {
                this.currentMenu = name;
            },
            handleCommand(command) {
                console.log(command)
                switch(command){
                    case "账号注销":
                        break;
                    case "重置密码":
                        break;
                }
            },
            editOpen(editDialog) {
                this[editDialog] = !this[editDialog];
            },
            // 提交表单
            submitForm(formName, editDialog) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.postForm(formName);
                        this.$message.success("更换成功");
                        this.resetForm(formName, editDialog);
                    } else {
                        this.$message.error("更换失败");
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName, editDialog) {
                this.$refs[formName].resetFields();
                this.editOpen(editDialog);
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
        .main-content{
            flex: 1 1 auto;
            margin-right: 20px;
            padding: 30px;
            background: @background;
            h2{
                font-size: 20px;
                position: relative;
                .el-dropdown{
                    font-size: 1em;
                    float: right;
                    color: @fontColor;
                    .el-link-active();
                    cursor: pointer;
                }
            }
            .setting {
                padding: 30px 0;
                .setting-wrapper{
                    .setting-name{
                        font-size: 16px;
                        font-weight: 700;
                        height: 40px;
                        line-height: 40px;
                    }
                    .el-input{
                        width: 175px;
                        margin-right: 25px;
                        /deep/ .el-input__inner{
                            cursor: default;
                        }
                    }
                }
            }
        }
    }
    .el-dialog__wrapper{
        /deep/ .el-dialog__header{
            .el-dialog__headerbtn:hover .el-dialog__close{
                color: @activeColor;
            }
        }
    }
</style>