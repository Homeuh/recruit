<template>
    <div class="container">
      <!-- 顶部导航栏 -->
      <GeneralTopBar :showPosition="false"/>
      <main class="margin-20per">
        <div class="main-header">
          <el-page-header @back="$router.back()" content="新增职位"></el-page-header>
        </div>
        <div class="main-content">
          <div class="post-wrapper">
            <h2>职位基本信息</h2>
            <div class="content">
              <el-form :model="jobForm" :rules="jobFormRules" ref="jobForm">
                  <el-form-item class="left-form-item" label="职位名称" prop="job_duty">
                    <el-input v-model="jobForm.job_duty"></el-input>
                  </el-form-item>
                  <el-form-item class="right-form-item" label="薪资待遇（至少选择最低最高月薪）" prop="job_salary">
                    <el-input-number v-model="min_salary" placeholder="最低月薪" @change="editJobSalary" :min="1" :max="100"></el-input-number>
                    &nbsp;-&nbsp;
                    <el-input-number v-model="max_salary" placeholder="最高月薪"  @change="editJobSalary" :min="1" :max="100"></el-input-number>
                    &nbsp;K&nbsp;·&nbsp;
                    <el-input-number v-model="extra_salary" placeholder="额外薪资" @change="editJobSalary" :min="13" :max="24"></el-input-number>
                    薪
                  </el-form-item>
                  <el-form-item class="left-form-item" label="所属行业" prop="job_industry">
                    <el-select v-model="jobForm.job_industry" placeholder="请选择行业类型">
                      <el-option
                            v-for="item in industryList"
                            :key="item"
                            :label="item"
                            :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="right-form-item" label="职位标签（方便求职者定位技能，选填）" prop="job_tag">
                    <AddTag :tagList.sync="jobForm.job_tag"/>
                  </el-form-item>
                <el-form-item class="left-form-item" label="工作经验" prop="job_year">
                  <el-select v-model="jobForm.job_year" placeholder="请选择工作经验">
                    <el-option
                          v-for="item in ['不限','在校生/应届生','1年以内','1-3年','3-5年','5-10年','10年以上']"
                          :key="item"
                          :label="item"
                          :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="right-form-item" label="学历要求" prop="education">
                  <el-select v-model="jobForm.education" placeholder="请选择学历">
                    <el-option
                          v-for="item in ['不限','初中及以下','中专','高中','大专','本科','硕士','博士']"
                          :key="item"
                          :label="item"
                          :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="left-form-item" label="招聘人数（选填）" prop="recruit_num">
                  <el-select v-model="jobForm.recruit_num" placeholder="请选择招聘人数">
                    <el-option
                          v-for="item in 50"
                          :key="item"
                          :label="item"
                          :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="right-form-item" label="工作类型（默认全职）" prop="job_type">
                  <el-radio v-model="jobForm.job_type" label="全职">全职</el-radio>
                  <el-radio v-model="jobForm.job_type" label="兼职">兼职</el-radio>
                  <el-radio v-model="jobForm.job_type" label="实习">实习</el-radio>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="post-wrapper">
            <h2>工作地点</h2>
            <div class="content">
              <el-form :model="jobForm" :rules="jobFormRules" ref="jobForm">
                <el-form-item class="left-form-item" label="工作所在城市" prop="office_city">
                  <el-input v-model="jobForm.office_city" @focus="dialogVisible = true"></el-input>
                  <CityDialog :visible.sync="dialogVisible"
                              :currentCity.sync="jobForm.office_city"
                              :isUserSelect="true"/>
                </el-form-item>
                <el-form-item class="left-form-item" label="工作所在区" prop="office_district">
                  <el-input v-model="jobForm.office_district"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="office_address">
                  <Address :address.sync="jobForm.office_address" />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="post-wrapper">
            <h2>职位描述</h2>
            <div class="content">
              <el-form :model="jobForm" :rules="jobFormRules" ref="jobForm">
                <el-form-item label="工作内容" prop="job_description">
                  <Editor :placeholder="'请描述工作内容，建议使用短句并分条列出，如下<br>1. .... <br>2. .... <br>3. ....'"
                          :content.sync="jobForm.job_description"
                          :menus="['list']"
                          :showFullScreen="false"/>
                </el-form-item>
                <el-form-item label="岗位要求" prop="job_description">
                  <Editor :placeholder="'请描述岗位要求，建议使用短句并分条列出，如下<br>1. .... <br>2. .... <br>3. ....'"
                          :content.sync="jobForm.job_requirement"
                          :menus="['list']"
                          :showFullScreen="false"/>
                </el-form-item>
                <el-form-item label="职位福利（选填）" prop="job_benefit">
                  <Editor :placeholder="'请描述职位福利，建议使用短句并分条列出，如下<br>1. .... <br>2. .... <br>3. ....'"
                          :content.sync="jobForm.job_requirement"
                          :menus="['list']"
                          :showFullScreen="false"/>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="post-wrapper">
            <h2>其他信息</h2>
            <div class="content">
              <el-form :model="jobForm" ref="jobForm">
                <el-form-item label="附加信息（选填）" prop="attached_info">
                  <Editor :placeholder="'请描述附加信息，建议使用短句并分条列出，例如：<br>工作时间：....<br>特殊技能加分项：....'"
                          :content.sync="jobForm.attached_info"
                          :menus="['list']"
                          :showFullScreen="false"/>
                </el-form-item>
                <el-form-item label="面试信息（选填）" prop="interview_info">
                  <Editor :placeholder="'请描述面试信息，建议使用短句并分条列出，例如：<br>面试方式：...<br>面试轮数：...<br>面试时间：...<br>是否自带简历：...'"
                          :content.sync="jobForm.interview_info"
                          :menus="['list']"
                          :showFullScreen="false"/>
                </el-form-item>
              </el-form>
            </div>
        </div>
          <div class="handle-btn">
            <el-button type="text" class="draft-btn">存入草稿箱</el-button>
            <el-button class="preview-btn" @click="previewVisible = true">预览</el-button>
            <el-button type="primary" class="add-btn">发布</el-button>
          </div>
        </div>
      </main>
      <!-- 底部信息栏 -->
      <GeneralFooter />

      <PreviewPicture v-if="previewVisible" :preview.sync="previewVisible" isProfession="true"/>
    </div>
</template>

<script>
    import GeneralTopBar from "../../../components/GeneralTopBar";
    import GeneralFooter from "../../../components/GeneralFooter";
    import AddTag from "@/components/AddTag";
    import CityDialog from "@/components/CityDialog";
    import Address from "@/components/Address";
    import Editor from "@/components/Editor";
    import PreviewPicture from "@/components/PreviewPicture";
    export default {
        name: "PostJob",
        components: {
            GeneralTopBar,
            GeneralFooter,
            AddTag,
            CityDialog,
            Address,
            Editor,
            PreviewPicture
        },
        data() {
            return {
                jobForm: {
                    job_duty: "",
                    job_industry: "",
                    job_salary: "",
                    job_tag: [],
                    job_year: "",
                    education: "",
                    recruit_num: "",
                    job_type: "全职",
                    job_description: "",
                    job_requirement: "",
                    job_benefit: "",
                    attached_info: "",
                    interview_info: "",
                    office_city: "",
                    office_district: "",
                    office_address: "",
                    job_status: "",
                },
                jobFormRules: {
                    job_duty: [
                        { required: true, message: "请输入职位名称", trigger: ["blur","change"]}
                    ],
                    job_industry: [
                        { required: true, message: "请选择所属行业类型", trigger: ["blur","change"]}
                    ],
                    job_salary: [
                        { required: true, message: "请给出职位薪资", trigger: ["blur","change"]}
                    ],
                    job_year: [
                        { required: true, message: "请选择工作经验", trigger: ["blur","change"]}
                    ],
                    education: [
                        { required: true, message: "请选择学历要求", trigger: ["blur","change"]}
                    ],
                    job_description: [
                        { required: true, message: "工作内容不能为空", trigger: ["blur","change"]}
                    ],
                    job_requirement: [
                        { required: true, message: "岗位要求不能为空", trigger: ["blur","change"]}
                    ],
                    office_city: [
                        { required: true, message: "请选择工作所在城市", trigger: ["blur","change"]}
                    ],
                    office_district: [
                        { required: true, message: "请选择工作所在区", trigger: ["blur","change"]}
                    ],
                    office_address: [
                        { required: true, message: "请输入工作详细地址", trigger: ["blur","change"]}
                    ]
                },
                industryList: ['技术','产品','运营','设计','销售','咨询/翻译/法律','人事/财务/行政','市场','职能','游戏','其他'],
                min_salary: undefined,
                max_salary: undefined,
                extra_salary: undefined,

                dialogVisible: false,
                previewVisible: false
            }
        },
        methods: {
            editJobSalary() {
                let baseSalary = "";
                if(this.min_salary && this.max_salary) {
                    baseSalary = `${this.min_salary}-${this.max_salary}K`;
                }
                if(baseSalary && this.extra_salary) {
                    baseSalary += `·${this.extra_salary}薪`
                }
                this.jobForm.job_salary = baseSalary;
            },
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (formName === 'companyForm') {
                            this.$message.success("职位发布成功");
                            this.resetForm(formName);
                            this.$router.push("/recruiter");
                        } else if(formName === 'recruiterForm') {
                            this.active = 1;
                        }
                    } else {
                        this.$message.error("提交信息有误，请重新输入");
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style lang="less" scoped>

    @mainColor: #5dd5c8;
    @activeColor: #00c2b3;
    @background: #fff;
    @fontColor: #414a60;
    @salaryColor: #fb670f;
    @promptColor: #8d92a1;
    @borderColor: #dcdfe6;
    main{
        margin-top: 30px;
        > div{
            background: @background;
           
        }
        .main-header{
            border-bottom: 1px solid @borderColor;
            .el-page-header{
                padding-left: 30px;
                height: 80px;
                line-height: 80px;
                /deep/ .el-page-header__left{
                    .el-icon-back,
                    .el-page-header__title{
                        color: @fontColor;
                        font-size: 22px;
                    }
                }
                /deep/ .el-page-header__content{
                    color: @activeColor;
                    font-size: 22px;
                }
            }
        }
        .main-content{
            padding: 0 10% ;
            .post-wrapper{
                padding: 30px 0;
                border-bottom: 1px solid @borderColor;
                &:last-of-type{
                    border-bottom: 0;
                }
                h2{
                    margin: 30px 0 60px;
                }
                .content{
                    .el-form-item.left-form-item{
                        padding-right: 15px;
                        width: 40%;
                    }
                    .el-form-item.right-form-item{
                        padding-left: 15px;
                        width: 60%;
                    }
                    .el-form-item{
                        width: 100%;
                        /deep/ .el-form-item__label{
                            color: @fontColor;
                            font-size: 16px;
                        }
                        /deep/ .el-form-item__content{
                            &::before{
                                content: "";
                                clear: both;
                                display: table;
                            }
                        }
                        .el-select{
                            width: 100%;
                        }
                        &:not(.edit-btn){
                            display: inline-block;
                        }
                        .el-input-number{
                            width: 150px;
                            /deep/ .el-input__inner{
                                padding: 0 40px;
                            }
                        }
                    }
                }
            }
            .handle-btn{
                height: 160px;
                line-height: 160px;
                display: flex;
                align-items: center;
                .preview-btn{
                    margin-left: auto;
                }
                .preview-btn,.add-btn{
                    height: 50px;
                    line-height: 50px;
                    width: 140px;
                }
            }
        }
    }
</style>