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
          <span v-for="nav in navList" :key="nav"
                :class="{'is-selected': currentNav === nav}"
                @click="currentNav = nav"
          >{{ nav }}
          </span>
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
        <transition name="el-fade-in" mode="out-in">
          <div class="setting" v-if="currentNav === '账号设置'" :key="currentNav">
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
              <div class="setting-name">联系电话</div>
              <el-input
                    v-model="loginForm.recruiter_tel"
                    :disabled="true">
              </el-input>
              <el-button type="primary" @click="editOpen('telDialogVisible')">更换电话</el-button>
            </div>
            <div class="setting-wrapper">
              <div class="setting-name">微信号码</div>
              <el-input
                    v-model="loginForm.recruiter_wechat"
                    :disabled="true">
              </el-input>
              <el-button type="primary" @click="editOpen('wechatDialogVisible')">更换微信</el-button>
            </div>
          </div>
          <div class="setting" v-else-if="currentNav === '个人展示'" :key="currentNav">
          <el-form class="recruiter-setting" :model="recruiterForm" :rules="recruiterFormRules" ref="recruiterForm" label-width="100px">
            <el-form-item label="个性头像：" prop="recruiter_avatar">
              <el-button type="text" @click="uploadVisible = true">
                <img :src="recruiterForm.recruiter_avatar" :alt="recruiterForm.recruiter_name"
                     style="width: 65px; height: 65px; border-radius: 50%">
              </el-button>
              <UploadAvatar :visible.sync="uploadVisible" tablePath="recruiter" :uploadDirectly="true" @update:data="getRecruiter"></UploadAvatar>
            </el-form-item>
            <el-form-item label="我的名字：" prop="recruiter_name">
              <el-input v-model="recruiterForm.recruiter_name" placeholder="输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="recruiter_sex">
              <el-radio v-model="recruiterForm.recruiter_sex" label="男">男</el-radio>
              <el-radio v-model="recruiterForm.recruiter_sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="公司任职：" prop="recruiter_duty">
              <el-input v-model="recruiterForm.recruiter_duty" placeholder="输入在职身份"></el-input>
            </el-form-item>
            <el-form-item label="来源公司：" class="company-info">
              <img :src="recruiterForm.company_logo" :alt="recruiterForm.company_name"
                   style="width: 65px; height: 65px;">
              <span class="company-name">{{ recruiterForm.company_name }}</span>
              <el-button class="unbind-btn" type="primary">解绑</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('recruiterForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('recruiterForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        </transition>
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
    <!-- 更换联系电话 -->
    <el-dialog
          :close-on-click-modal="false"
          title="新的联系电话"
          :visible.sync="telDialogVisible"
          width="30%">
      <el-form :model="telForm" :rules="telRules" ref="telForm" label-width="84px">
        <el-form-item label="登录手机" prop="login_phone">
          <el-input placeholder="请输入当前登录手机号码" v-model="telForm.login_phone"></el-input>
        </el-form-item>
        <el-form-item label="密码验证" prop="password" v-if="loginForm.password">
          <el-input placeholder="请输入当前账号登录密码" v-model="telForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新的电话" prop="newTel">
          <el-input placeholder="请输入新的联系电话" v-model="telForm.newTel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('telForm','telDialogVisible')">取 消</el-button>
        <el-button type="primary" @click="submitForm('telForm','telDialogVisible')">确 定</el-button>
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
  </div>
</template>

<script>
    import GeneralTopBar from "../../../components/GeneralTopBar";
    import GeneralFooter from "../../../components/GeneralFooter";
    import SymbolIcon from "@/components/SymbolIcon";
    import UploadAvatar from "@/components/UploadAvatar";
    export default {
        name: "RecruiterSetting",
        components: { GeneralTopBar, GeneralFooter, SymbolIcon, UploadAvatar},
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
            let checkNewTel = (rule, value, callback) => {
                let reg = /^[1][34578][0-9]{9}$/;
                if (!value) {
                    return callback(new Error("新的手机号不能为空"));
                }
                else if (!reg.test(value)) {
                    callback(new Error("请输入正确的手机号"));
                } else if(this.loginForm.recruiter_tel === value){
                    callback(new Error("新的手机号不能和旧手机号相同"));
                } else {
                    callback();
                }
            };
            return {
                menuList: [
                    { icon: "el-icon-gongzuotai", name: "工作台", href: "/recruiter"},
                    { icon: "el-icon-zhiwei", name: "职位管理", href: "/recruiter/job"},
                    { icon: "el-icon-jianli", name: "简历处理", href: "/recruiter/resume"},
                    { icon: "el-icon-mianshi", name: "面试相关", href: "/recruiter/interview"},
                    { icon: "el-icon-xiaoxi", name: "我的消息", href: "/recruiter/message"},
                    { icon: "el-icon-shezhi", name: "账号设置", href: "/recruiter/setting"}
                ],
                currentMenu: "账号设置",
                navList: ["账号设置","个人展示"],
                currentNav: "账号设置",
                loginForm: {},
                /*loginForm: {
                    login_phone: "13522342234",
                    password: "12345678",
                    recruiter_tel: "15725562556",
                    recruiter_wechat: "Recruiter"
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

                // 更换联系电话
                telForm: {
                    login_phone: "",
                    password: "",
                    newTel: "",
                },
                telRules: {
                    login_phone: [
                        { required: true, validator: checkPhone, blur: ['blur','change']}
                    ],
                    password: [
                        { required: true, validator: checkPassword, blur: ['blur','change']}
                    ],
                    newTel: [
                        { required: true, validator: checkNewTel, blur: 'blur'}
                    ],
                },
                telDialogVisible: false,

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

                recruiterForm: {},
                /*recruiterForm: {
                    recruiter_id: "",
                    recruiter_avatar: require("@/image/avatar/recruiter_li.png"),
                    recruiter_name: "李玲",
                    recruiter_sex: "女",
                    recruiter_duty: "招聘主管",
                    company_logo: require("@/image/company/meituan.jpg"),
                    company_name: "美团",
                },*/
                recruiterFormRules: {
                    recruiter_name: [
                        { validator: (rule, value, callback) => {
                              if(!value) {
                                  callback(new Error("姓名不允许为空"))
                              } else {
                                  callback();
                              }
                          }
                          , trigger: 'change'}
                    ],
                    recruiter_duty: [
                        { validator: (rule, value, callback) => {
                             if(!value) {
                                 callback(new Error("在职身份不允许为空"))
                             } else {
                                 callback();
                             }
                         }
                            , trigger: 'change'}
                    ],
                },

                uploadVisible: false,
            }
        },
        created() {
            this.$store.commit("setLogin");
            this.initData();
        },
        methods: {
            initData() {
                this.$axios.all([this.getSettingInfo(),this.getRecruiter()]);
            },
            async getSettingInfo() {
                const res = await this.$axios.request({
                    url: "/recruiter/setting/" + this.$store.state.login_id,
                    method: "get"
                })
                console.log(res)
                if (res.msg === "success") {
                    this.loginForm = Object.assign({},{},res.data.loginForm);
                }
            },
            async getRecruiter() {
                const res = await this.$axios.request({
                    url: "/recruiter/info/" + this.$store.state.login_id,
                    method: "get"
                })
                console.log(res)
                if (res.msg === "success") {
                    res.data.recruiterForm.recruiter_avatar = require("@/image/avatar/" + res.data.recruiterForm.recruiter_avatar);
                    res.data.recruiterForm.company_logo = require("@/image/company/" + res.data.recruiterForm.company_logo);
                    this.recruiterForm = Object.assign({},{},res.data.recruiterForm);
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
                        await this.getSettingInfo();
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
                        await this.getSettingInfo();
                        break;
                    case "telForm":
                        res = await this.$axios.request({
                            url: "/recruiter/updateTel",
                            method: "post",
                            data: {
                                login_id: this.$store.state.login_id,
                                newTel: this[formName].newTel
                            }
                        });
                        console.log(res);
                        await this.getSettingInfo();
                        break;
                    case "wechatForm":
                        res = await this.$axios.request({
                            url: "/recruiter/updateWechat",
                            method: "post",
                            data: {
                                login_id: this.$store.state.login_id,
                                newWechat: this[formName].newWechat
                            }
                        });
                        console.log(res);
                        await this.getSettingInfo();
                        break;
                    case "recruiterForm":
                        res = await this.$axios.request({
                            url: "/recruiter/update",
                            method: "post",
                            data: this.recruiterForm
                        });
                        console.log(res);
                        await this.getRecruiter();
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
                        if(this.currentNav === '个人展示'){
                            this.resetForm(formName);
                        }
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName, editDialog) {
                this.$refs[formName].resetFields();
                this.editOpen(editDialog);
            }
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

    main {
        padding-top: 30px;
        display: flex;
        aside {
            background: @background;
            width: 160px;
            height: fit-content;
            margin-right: 20px;
            flex-shrink: 0;
            ul li {
                font-size: 15px;
                height: 60px;
                line-height: 60px;
                position: relative;

                &.selected {
                    &::after {
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

                .icon {
                    font-size: 18px;
                    margin-left: 30px;
                    margin-right: 12px;
                }

                .el-link {
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
                > span{
                    font-size: 1em;
                    position: relative;
                    cursor: pointer;
                    & + span{
                      margin-left: 25px;
                    }
                    &::after{
                        content: "";
                        display: block;
                        width: 56px;
                        height: 3px;
                        background: @activeColor;
                        position: absolute;
                        top: 42px;
                        left: 0;
                    }
                    &:not(.is-selected){
                        color: @promptColor;
                        &::after{
                            display: none;
                        }
                    }
                }
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
                .recruiter-setting{
                    .el-form-item{
                        width: 319px;
                        /deep/ .el-form-item__label{
                            color: @fontColor;
                            font-size: 16px;
                            font-weight: 700;
                        }
                        &.company-info{
                            display: flex;
                            align-items: center;
                            /deep/ .el-form-item__content{
                                display: flex;
                                align-items: center;
                                margin-left: 0 !important;
                            }
                            .company-name{
                                white-space: nowrap;
                                margin: 0 30px 0 10px;
                            }
                            .unbind-btn{
                                width: 88px;
                            }
                        }
                        &:last-of-type{
                            .el-button{
                                width: 88px;
                            }
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