<template>
    <div class="container">
      <!-- 顶部导航栏 -->
      <GeneralTopBar :showPosition="false" :is-register="true"/>
      <main class="margin-20per">
        <div class="register-applicant" v-if="$store.state.login_role === '0'">
          <div class="register">
            <h1>完善个人基本信息</h1>
            <el-form class="applicant-form" :model="resumeForm" :rules="resumeRules" ref="resumeForm" label-width="160px">
              <el-form-item label="头像" prop="applicant_avatar">
                <el-button type="text" @click="uploadVisible = true">
                  <img v-if="resumeForm.applicant_avatar" :src="resumeForm.applicant_avatar"
                       style="width: 80px; height: 80px; border-radius: 50%"/>
                  <span class="image-occupation" v-else>
                    <i class="el-icon-s-custom"></i>
                  </span>
                </el-button>
                <UploadAvatar :visible.sync="uploadVisible"
                              :avatar.sync="resumeForm.applicant_avatar"
                              @is-default="isDefaultAvatar = $event"
                              :avatarName.sync="avatarName"
                              :avatarFile.sync="avatarFile">
                </UploadAvatar>
              </el-form-item>
              <el-form-item label="姓名" prop="applicant_name">
                <el-input v-model="resumeForm.applicant_name" placeholder="请填写你的真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="applicant_sex">
                <el-select v-model="resumeForm.applicant_sex" placeholder="请选择性别"  :popper-append-to-body="false">
                  <el-option
                        v-for="item in ['男','女']"
                        :key="item"
                        :label="item"
                        :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄" prop="applicant_age">
                <el-select v-model="resumeForm.applicant_age" placeholder="请选择年龄">
                  <el-option
                        v-for="item in ageRange"
                        :key="item"
                        :label="item"
                        :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学历" prop="applicant_education">
                <el-select v-model="resumeForm.applicant_education" placeholder="请选择学历">
                  <el-option
                        v-for="item in ['初中及以下','中专','高中','大专','本科','硕士','博士']"
                        :key="item"
                        :label="item"
                        :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="当前所在城市" prop="applicant_city">
                <el-input v-model="resumeForm.applicant_city" @focus="dialogVisible = true"></el-input>
                <CityDialog :visible.sync="dialogVisible"
                            :currentCity.sync="resumeForm.applicant_city"
                            :isUserSelect="true"/>
              </el-form-item>
              <el-form-item label="身份类型" prop="applicant_identity">
                <el-select v-model="resumeForm.applicant_identity" placeholder="请选择身份类型"  :popper-append-to-body="false">
                  <el-option
                        v-for="item in ['学生','职场人士']"
                        :key="item"
                        :label="item"
                        :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作经验" prop="working_year">
                <el-select v-model="resumeForm.working_year" placeholder="请选择工作经验">
                  <el-option
                        v-for="item in ['暂无','在校生/应届生','1年','2年','3年','4年','5年','5-10年','10年以上']"
                        :key="item"
                        :label="item"
                        :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系手机" prop="applicant_tel">
                <el-input v-model="resumeForm.applicant_tel" placeholder="请填写联系手机"></el-input>
              </el-form-item>
              <el-form-item label="联系邮箱" prop="applicant_email">
                <el-input v-model="resumeForm.applicant_email" placeholder="请填写联系邮箱"></el-input>
              </el-form-item>
              <el-form-item class="edit-btn">
                <el-button type="primary" @click="submitForm('resumeForm')">完成</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="register-recruiter" v-if="$store.state.login_role === '1'">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="完善个人信息"></el-step>
            <el-step title="确认公司信息"></el-step>
          </el-steps>
          <div class="register">
            <transition name="el-fade-in" mode="out-in">
              <div class="register-wrapper" v-if="active === 0" :key="active">
                <el-form :model="recruiterForm" :rules="recruiterFormRules" ref="recruiterForm" label-width="120px">
                  <el-form-item label="头像" prop="recruiter_avatar">
                    <el-button type="text" @click="uploadVisible = true">
                      <img v-if="recruiterForm.recruiter_avatar" :src="recruiterForm.recruiter_avatar"
                           style="width: 80px; height: 80px; border-radius: 50%"/>
                      <span class="image-occupation" v-else>
                        <i class="el-icon-s-custom"></i>
                      </span>
                    </el-button>
                    <UploadAvatar :visible.sync="uploadVisible"
                                  :avatar.sync="recruiterForm.recruiter_avatar"
                                  @is-default="isDefaultAvatar = $event"
                                  :avatarName.sync="avatarName"
                                  :avatarFile.sync="avatarFile">
                    </UploadAvatar>
                  </el-form-item>
                  <el-form-item label="姓名" prop="recruiter_name">
                    <el-input v-model="recruiterForm.recruiter_name" placeholder="请填写你工作中的姓名，用于向求职者展示"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="recruiter_sex">
                    <el-select v-model="recruiterForm.recruiter_sex" placeholder="请选择性别"  :popper-append-to-body="false">
                      <el-option
                            v-for="item in ['男','女']"
                            :key="item"
                            :label="item"
                            :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="职位" prop="recruiter_duty">
                    <el-input v-model="recruiterForm.recruiter_duty" placeholder="请填写你在当前公司的任职职位"></el-input>
                  </el-form-item>
                  <el-form-item label="微信号" prop="recruiter_wechat">
                    <el-input v-model="recruiterForm.recruiter_wechat" placeholder="请填写你常用的微信号"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="recruiter_tel">
                    <el-input v-model="recruiterForm.recruiter_tel" placeholder="请填写你常用的联系电话"></el-input>
                  </el-form-item>
                  <el-form-item label="公司名称" prop="company_full_name">
                    <el-input v-model="recruiterForm.company_full_name" placeholder="请填写营业执照上或与公司发票抬头上一致的公司完整名称"></el-input>
                  </el-form-item>
                  <el-form-item class="edit-btn">
                    <el-button type="primary" @click="submitForm('recruiterForm')">下一步</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="register-wrapper" v-else-if="active === 1 && !hasMemberCode" :key="active">
                <el-form class="company-form" :model="companyForm" :rules="companyFormRules" ref="companyForm" label-width="145px">
                  <el-form-item label="公司全称" prop="company_full_name">
                    <el-input v-model="companyForm.company_full_name" placeholder="请填写公司的完整名称"></el-input>
                  </el-form-item>
                  <el-form-item label="公司简称" prop="company_name">
                    <el-input v-model="companyForm.company_name" placeholder="请填写公司的简称，例如：腾讯是深圳市腾讯计算机系统有限公司的简称"></el-input>
                  </el-form-item>
                  <el-form-item label="公司logo" prop="company_logo">
                    <el-button type="text" @click="uploadLogoVisible=true">
                      <div class="upload-wrapper">
                        <img v-if="companyForm.company_logo" :src="companyForm.company_logo" :alt="company.company_name"
                             style="display:block; width: 178px; height: 178px; border-radius: 6px;"/>
                        <i v-else class="el-icon-plus"></i>
                      </div>
                    </el-button>
                    <UploadAvatar :visible.sync="uploadLogoVisible"
                                  title="请选择公司logo并上传"
                                  :is-avatar="false"
                                  :avatar.sync="companyForm.company_logo"
                                  :avatarFile.sync="avatarFile">
                      <template v-slot:body-notice>
                        <div>&nbsp;+&nbsp;点击上传公司logo</div>
                      </template>
                    </UploadAvatar>
                  </el-form-item>
                  <el-form-item label="公司行业" prop="company_tag">
                    <el-select v-model="companyForm.company_tag" placeholder="请选择行业类型" :popper-append-to-body="false">
                      <el-option
                            v-for="item in companyTags"
                            :key="item"
                            :label="item"
                            :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所在城市" prop="company_city">
                    <el-input v-model="companyForm.company_city" @focus="dialogVisible = true" placeholder="请选择公司当前所在城市"></el-input>
                    <CityDialog :visible.sync="dialogVisible"
                                :currentCity.sync="companyForm.company_city"
                                :isUserSelect="true"/>
                  </el-form-item>
                  <el-form-item label="公司位置" prop="company_address">
                    <Address :address.sync="companyForm.company_address" placeholder="请填写具体的公司位置"/>
                  </el-form-item>
                  <el-form-item label="公司规模" prop="company_size">
                    <el-select v-model="companyForm.company_size" placeholder="请选择" :popper-append-to-body="false">
                      <el-option
                            v-for="item in ['少于15人','15-50人','50-150人','150-500人','500-2000人','2000人以上']"
                            :key="item"
                            :label="item"
                            :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="公司类型" prop="company_type">
                    <el-select v-model="companyForm.company_type" placeholder="请选择" :popper-append-to-body="false">
                      <el-option
                            v-for="item in ['外资(欧美)','外资(非欧美)','合资','国企','民营公司','上市公司','创业公司','外企代表处','政府机关','事业单位','非营利组织']"
                            :key="item"
                            :label="item"
                            :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="公司简单描述" prop="company_description">
                    <el-input v-model="companyForm.company_description" placeholder="请填写公司的简单描述（选填）"></el-input>
                  </el-form-item>
                  <el-form-item label="公司介绍" prop="company_introduction">
                    <Editor placeholder="请详细介绍贵公司"
                            :content.sync="companyForm.company_introduction"
                            :showFullScreen="false"/>
                  </el-form-item>
                  <el-form-item label="公司网站链接" prop="company_website">
                    <el-input v-model="companyForm.company_website" placeholder="请填写公司的网站链接"></el-input>
                  </el-form-item>
                  <el-form-item label="营业执照" prop="business_license">
                    <el-button type="text" @click="uploadLicenseVisible=true">
                      <div class="upload-wrapper">
                        <img v-if="companyForm.business_license" :src="companyForm.business_license" :alt="company.company_name"
                             style="display:block; width: 178px; height: 178px; border-radius: 6px;"/>
                        <i v-else class="el-icon-plus"></i>
                      </div>
                    </el-button>
                    <UploadAvatar :visible.sync="uploadLicenseVisible"
                                  title="请选择公司营业执照并上传"
                                  :is-avatar="false"
                                  :avatar.sync="companyForm.business_license"
                                  :avatarFile.sync="logoFile">
                      <template v-slot:body-notice>
                        <div>&nbsp;+&nbsp;点击上传公司营业执照</div>
                      </template>
                    </UploadAvatar>
                  </el-form-item>
                  <el-form-item class="edit-btn">
                    <el-button type="primary" class="register-btn" @click="submitForm('companyForm')">注册公司</el-button>
                    <el-button type="text" @click="active = 0">返回上一步</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="register-wrapper" v-else-if="active === 1 && hasMemberCode" :key="active">
                <div class="association-link margin-10per">
                  <div class="recruiter-association">
                    <img :src="recruiterForm.recruiter_avatar" :alt="recruiterForm.recruiter_name"
                         style="width: 178px; height: 178px; border-radius: 50%"/>
                    <p>{{ recruiterForm.recruiter_name }}&nbsp;·&nbsp;{{ recruiterForm.recruiter_duty }}</p>
                  </div>
                  <div class="link-line"></div>
                  <div class="company-association">
                    <img :src="company.company_logo" :alt="company.company_full_name"
                         style="width: 178px; height: 178px;"/>
                    <p>{{ company.company_full_name }}</p>
                  </div>
                </div>
                <div class="company-info margin-10per">
                  <div class="info-wrapper">
                    <div class="title">公司全名</div>
                    <div class="content">{{ company.company_full_name }}</div>
                  </div>
                  <div class="info-wrapper">
                    <div class="title">公司简称</div>
                    <div class="content">{{ company.company_name }}</div>
                  </div>
                  <div class="info-wrapper">
                    <div class="title">行业类型</div>
                    <div class="content">{{ company.company_tag }}</div>
                  </div>
                  <div class="info-wrapper">
                    <div class="title">公司性质</div>
                    <div class="content">{{ company.company_type }}</div>
                  </div>
                  <el-form class="member-code-form" :model="companyMemberForm" :rules="companyMemberRules" ref="companyMemberForm">
                    <el-form-item label="公司会员码" prop="member_code" label-width="145px">
                      <el-input v-model="companyMemberForm.member_code" placeholder="请填写公司唯一会员码注册成为招聘官"></el-input>
                    </el-form-item>
                    <el-form-item class="edit-btn">
                      <el-button type="primary" @click="submitForm('companyMemberForm')">加入公司</el-button>
                      <el-button type="text" @click="active = 0">返回上一步</el-button>
                    </el-form-item>

                  </el-form>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </main>
      <!-- 底部信息栏 -->
      <GeneralFooter />
    </div>
</template>

<script>
    import GeneralTopBar from "../components/GeneralTopBar";
    import GeneralFooter from "../components/GeneralFooter";
    import CityDialog from "../components/CityDialog";
    import Address from "@/components/Address";
    import Editor from "@/components/Editor";
    import UploadAvatar from "@/components/UploadAvatar";
    export default {
        name: "Register",
        components: {
            GeneralTopBar,
            GeneralFooter,
            CityDialog,
            Address,
            Editor,
            UploadAvatar,
        },
        watch: {
            active: function(newVal) {
                // 查询是否公司已注册（是否存在唯一会员码）
                if(newVal === 1 && Object.keys(this.company).length === 0){
                    this.companyForm.company_full_name = this.recruiterForm.company_full_name
                } else {
                    this.hasMemberCode = true;
                }
            },
            "resumeForm.applicant_avatar": function() {
                this.$refs.resumeForm.clearValidate(['applicant_avatar']);
            },
            "recruiterForm.recruiter_avatar": function() {
                this.$refs.recruiterForm.clearValidate(['recruiter_avatar']);
            }
        },
        data() {
            let checkPhone = (rule, value, callback) => {
                let reg = /^[1][34578][0-9]{9}$/;
                if (!value) {
                    return callback(new Error("手机号不能为空"));
                }
                else if (!reg.test(value)) {
                    callback(new Error("手机号输入错误，请输入正确的手机号"));
                } else {
                    callback();
                }
            };
            return {
                active: 0,
                hasMemberCode: false,
                company: {},
                /*company: {
                    company_full_name: "北京三快科技有限公司",
                    company_name: "美团",
                    company_logo: require("@/image/company/meituan.jpg"),
                    company_tag: "工具类产品",
                    company_type: "合资",
                },*/
                companyMemberForm: {
                    member_code: ""
                },
                companyMemberRules: {
                    member_code: [
                        { required: true, message: "公司会员码不能为空", trigger: 'change'}
                    ]
                },
                
                recruiterForm: {
                    login_id: this.$store.state.login_id,
                    recruiter_avatar: "",
                    recruiter_name: "",
                    recruiter_sex: "",
                    recruiter_duty: "",
                    recruiter_tel: "",
                    recruiter_wechat: "",
                    company_full_name: ""
                },
                recruiterFormRules: {
                    recruiter_avatar: [
                        { required: true, message: "请上传头像", trigger: 'change'}
                    ],
                    recruiter_name: [
                        { required: true, message: "姓名不能为空", trigger: 'change'}
                    ],
                    recruiter_sex: [
                        { required: true, message: "性别不能为空", trigger: 'change'}
                    ],
                    recruiter_duty: [
                        { required: true, message: "职位不能为空", trigger: 'change'}
                    ],
                    recruiter_wechat: [
                        { required: true, message: "微信号不能为空", trigger: 'change'}
                    ],
                    recruiter_tel: [
                        { required: true, validator: checkPhone, trigger: 'change'}
                    ],
                    company_full_name: [
                        { required: true, message: "公司名称不能为空", trigger: 'change'}
                    ],
                },

                companyForm: {
                    company_full_name: "",
                    company_name: "",
                    company_logo: "",
                    company_tag: "",
                    company_city: "",
                    company_address: "",
                    company_size: "",
                    company_type: "",
                    company_description: "",
                    company_introduction: "",
                    company_website: "",
                    business_license: ""
                },
                companyFormRules: {
                    company_full_name: [
                        { required: true, message: "此项不能为空", trigger: 'change'}
                    ],
                    company_name: [
                        { required: true, message: "此项不能为空", trigger: 'change'}
                    ],
                    company_tag: [
                        { required: true, message: "此项不能为空", trigger: 'change'}
                    ],
                    company_city: [
                        { required: true, message: "此项不能为空", trigger: 'change'}
                    ],
                    company_address: [
                        { required: true, message: "此项不能为空", trigger: ['blur','change']}
                    ],
                    company_size: [
                        { required: true, message: "此项不能为空", trigger: 'change'}
                    ],
                    company_type: [
                        { required: true, message: "此项不能为空", trigger: 'change'}
                    ]
                },
                companyTags: [
                    "社交平台", "内容咨询", "内容社区", "社交媒体", "音频 | 视频媒体",
                    "短视频", "影视 | 动漫", "MCN | 直播平台", "新媒体", "文化传媒",
                    "工具类产品", "专业服务 | 咨询", "软件服务 | 咨询", "数据服务 | 咨询",
                    "IT技术服务 | 咨询", "营销服务 | 咨询", "人工智能服务", "网络通信",
                    "信息安全", "信息检索","区块链","物联网","在线教育","教育 | 培训",
                    "科技金融", "金融业", "在线医疗", "医疗 | 保健 | 美容",
                    "房地厂 | 建筑 | 物业", "电商平台","分类信息","消费生活","生活服务",
                    "汽车交易平台","居住服务","新零售","批发 | 零售","贸易 | 进出口","物流平台",
                    "物流 | 运输","旅游 | 出行","服务业","休闲 | 娱乐","游戏","制造业",
                    "新能源汽车制造","智能硬件","能源 | 矿产 | 环保","农林牧渔"
                ],

                resumeForm: {
                    login_id: this.$store.state.login_id,
                    applicant_avatar:"",
                    applicant_name: "",
                    applicant_sex: "",
                    applicant_age: "",
                    applicant_education: "",
                    applicant_identity: "",
                    working_year: "",
                    applicant_tel: "",
                    applicant_email: "",
                    applicant_city: ""
                },
                resumeRules: {
                    applicant_avatar: [
                      { required: true, message: "请上传头像", trigger: 'change'}
                    ],
                    applicant_name: [
                        { required: true, message: "请输入姓名", trigger: 'blur'},
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    applicant_sex: [
                        { required: true, message: "性别不能为空", trigger: 'change'}
                    ],
                    applicant_age: [
                        { required: true, message: "请选择年龄", trigger: 'blur'}
                    ],
                    applicant_education: [
                        { required: true, message: "请选择学历", trigger: 'blur'}
                    ],
                    applicant_identity: [
                        { required: true, message: "身份不能为空", trigger: 'change'}
                    ],
                    working_year: [
                        { required: true, message: "请选择工作年限", trigger: 'blur'}
                    ],
                    applicant_tel: [
                        { required: true, validator: checkPhone, trigger: ['blur','change'] }
                    ],
                    applicant_email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change'] }
                    ],
                    applicant_city: [
                        { required: true, message: "请输入当前所在城市", trigger: ['blur','change']}
                    ]
                },
                
                dialogVisible: false,

                //求职者注册upload可视
                uploadVisible: false,
                //招聘官注册upload可视
                uploadLogoVisible: false,
                // 是否选择的是默认头像
                isDefaultAvatar: false,
                // 如果是默认头像，设置变量接收头像名称（数据库表存储）
                avatarName: "",
                // 如果是自定义头像，设置变量接收头像文件
                avatarFile: "",


                uploadLicenseVisible: false,
                // 如果是自定义logo，设置变量接收logo文件
                logoFile: "",
            }
        },
        computed: {
            ageRange() {
                const range = [];
                for (let i = 18; i < 60; i++) {
                    range.push(i);
                }
                return range;
            },
        },
        created() {
            this.$store.commit("setLogin");
        },
        methods: {
            // 表单统一提交方式封装
            async postForm(options) {
                const requestArr = [];
                await options.forEach(opt => {
                    let fn = async () => {
                        const res = await this.$axios.request(opt);
                        console.log(res);
                        return res;
                    }
                    requestArr.push(fn());
                })
                return this.$axios.all(requestArr)
                    .then(value => {
                        console.log(value);
                        let successNum = 0;
                        value.forEach(item => {
                            successNum += item.code === 200 ? 1 : 0;
                        })
                        if (successNum === value.length){
                            this.$message.success("信息提交成功");
                            this.$router.push("/home");
                        } else {
                            this.$message.error("信息提交失败，请联系管理员审查");
                        }
                    })
                    .catch(reason => {
                        console.log(reason);
                        this.$message.error("信息提交失败，请联系管理员审查");
                    });
            },
            // 查找公司是否已注册，已注册则填写公司唯一会员码注册成为招聘官，未注册需要完成公司注册
            async getCompanyInfo() {
                const res = await this.$axios.request({
                    url: "/company/getCompanyInfo",
                    method: "get",
                    params: {
                        company_full_name: this.recruiterForm.company_full_name
                    }
                });
                if (res.msg === "success") {
                    res.data.company.company_logo = require("@/image/company/" + res.data.company.company_logo);
                    this.company = Object.assign({},{},res.data.company);
                }
                this.active = 1
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if(formName === 'resumeForm') {
                            // 异步更新求职者头像
                            this.postForm([{
                                url: "/applicant/saveOrUpdate",
                                method: "post",
                                data: this.resumeForm
                            }]).then(() => {
                                this.changeAvatar("resumeForm");
                            });
                        }
                        else if (formName === 'companyForm') {
                            // 异步更新公司logo后，进行招聘官注册，再进行招聘官的头像更新
                            this.postForm([{
                                url: "/company/saveOrUpdate",
                                method: "post",
                                data: this.companyForm
                            }]).then(() => {
                                this.changeAvatar("companyForm");
                                this.postForm([{
                                    url: "/recruiter/saveOrUpdate",
                                    method: "post",
                                    data: this.recruiterForm
                                }]).then(() => {
                                    this.changeAvatar("recruiterForm");
                                    this.$message.success("公司新建成功，您已成为该公司首位招聘官，请尽快发布你的第一个职位吧!");
                                })
                            });
                            // this.$router.push("/home");
                        } else if(formName === 'companyMemberForm') {
                            // 检验会员码是否正确，正确则成功注册招聘官身份，否则提示错误
                            await this.$axios.request({
                                url: `/company/getMemberCode?company_id=${this.company.company_id}&member_code=${this.companyMemberForm.member_code}`,
                                method: "get"
                            }).then(res => {
                                console.log(res);
                                if(res.data.companyExist){
                                    this.postForm([{
                                        url: "/recruiter/saveOrUpdate",
                                        method: "post",
                                        data: this.recruiterForm
                                    }]).then(() => {
                                        this.changeAvatar("recruiterForm");
                                        this.$message.success("加入公司成功，请尽快发布你的第一个职位吧!");
                                    })
                                } else {
                                    return this.$message.error("会员码有误，请重新输入！")
                                }
                            });
                            // this.$router.push("/home");
                        } else if(formName === 'recruiterForm') {
                            this.getCompanyInfo();
                        }
                    } else {
                        this.$message.error("提交信息有误，请重新输入");
                        return false;
                    }
                });
            },
            // 头像(logo、营业执照)上传和表单数据异步进行，先在数据库表中传递名称，存在该条记录后进行更新
            changeAvatar(formName) {
                switch(formName) {
                    case "resumeForm":
                      if(this.isDefaultAvatar){
                          this.postForm([{
                              url: `/applicant/uploadDefault?avatarName=${this.avatarName}&login_id=${this.$store.state.login_id}`,
                              method: "post"
                          }])
                      } else {
                          this.postForm([{
                              url: `/applicant/upload/${this.$store.state.login_id}`,
                              method: "post",
                              data: this.avatarFile
                          }])
                      }
                      break;
                    case "companyForm":
                        this.postForm([{
                            url: `/company/upload/${this.companyForm.company_full_name}`,
                            method: "post",
                            data: this.avatarFile
                        }])
                        break;
                    case "recruiterForm":
                        if(this.isDefaultAvatar){
                            this.postForm([{
                                url: `/recruiter/uploadDefault?avatarName=${this.avatarName}&login_id=${this.$store.state.login_id}`,
                                method: "post"
                            }])
                        } else {
                            this.postForm([{
                                url: `/recruiter/upload/${this.$store.state.login_id}`,
                                method: "post",
                                data: this.avatarFile
                            }])
                        }
                        break;
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .container{
        background: #ffffff;
        position: relative;
        main{
            text-align: center;
            .el-steps{
                display: inline-flex;
                align-items: center;
                width: 35vw;
                height: 300px;
                /deep/ .el-step__icon{
                    width: 40px;
                    height: 40px;
                    font-size: 18px;
                }
                /deep/ .el-step__title{
                    font-size: 18px;
                }
            }
            .register{
                h1{
                    padding: 50px 0;
                }
                .applicant-form{
                    display: inline-block;
                    margin-left: -160px;
                    text-align: left;
                    .el-form-item{
                        width: 650px;
                        .el-select{
                            width: 100%;
                        }
                    }
                    .edit-btn{
                        .el-button{
                            width: 160px;
                            height: 45px;
                            font-size: 20px;
                            &.register-btn{
                                width: 180px;
                            }
                        }
                    }
                }
                .register-wrapper{
                    .el-form{
                        margin-left: 8vw;
                        text-align: left;
                        &.company-form .el-form-item{
                            width: 800px;
                        }
                        .el-form-item{
                            width: 650px;
                            margin-bottom: 30px;
                            /deep/ .el-form-item__label{
                                padding-right: 25px;
                                height: 56px;
                                line-height: 56px;
                                font-size: 20px;
                            }
                            .el-input,
                            .el-select,
                            .address{
                                /deep/ .el-input__inner {
                                    height: 56px;
                                    line-height: 56px;
                                    font-size: 18px;
                                }
                            }
                            .el-select{
                                /deep/ .el-select-dropdown__item{
                                    font-size: 16px;
                                }
                            }
                            /deep/ .el-form-item__error{
                                font-size: 16px;
                            }
                            &.edit-btn{
                                .el-button{
                                    width: 160px;
                                    height: 45px;
                                    font-size: 20px;
                                    &.register-btn{
                                        width: 180px;
                                    }
                                }
                            }
                        }
                    }
                    .association-link{
                        padding: 60px 30px;
                        border: 1px solid #dcdfe6;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .recruiter-association,
                        .company-association{
                            text-align: center;
                            font-size: 20px;
                            p{
                                line-height: 60px;
                            }
                        }
                        .link-line{
                            width: 250px;
                            height: 2px;
                            margin: 0 25px;
                            background: #dcdfe6;
                        }
                    }
                    .company-info{
                        text-align: left;
                        padding-left: 30px;
                        margin-top: 60px;
                        font-size: 21px;
                        .info-wrapper{
                            line-height: 60px;
                            > div{
                                display: inline-block;
                            }
                            .title{
                                width: 120px;
                                text-align: right;
                                margin-right: 25px;
                            }
                            &.edit-btn{
                                margin-top: 20px;
                                .el-button{
                                    width: 160px;
                                    height: 45px;
                                    font-size: 20px;
                                    &.register-btn{
                                        width: 180px;
                                    }
                                }
                            }
                        }
                    }
                    .member-code-form{
                        margin-left: 0;
                        .el-form-item{
                            /deep/ .el-form-item__label{
                                color: #414a60;
                                font-size: 21px;
                                height: 60px;
                                line-height: 60px;
                            }
                            /deep/ .el-input {
                                height: 60px;
                                line-height: 60px;
                                .el-input__inner{
                                    font-size: 20px;
                                    width: 400px;
                                    height: 50px;
                                    line-height: 50px;
                                }
                            }
                        }
                    }
                }
            }
        }
        footer{
            border-top: 1px solid #dcdfe6;
        }
    }


    .upload-wrapper {
        width: 180px;
        height: 180px;
        line-height: 180px;
        border: 1px dashed #d9d9d9;
        box-sizing: content-box;
        border-radius: 6px;
        &:hover {
            border-color: #00c2b3;
        }
        i{
            font-size: 28px;
            color: #8c939d;
        }
    }

    .image-occupation{
        i{
            color: #dcdfe6;
            font-size: 64px;
            width: 80px;
            height: 80px;
            border:1px solid #dcdfe6;
            border-radius: 50%;
            &::before{
                display: block;
                transform: translateY(4px);
            }
        }
    }
</style>