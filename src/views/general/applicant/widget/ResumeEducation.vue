<template>
    <div class="resume-education">
      <div class="education" v-if="!editEducation">
        <h2>教育经历<span data-html2canvas-ignore="true" @click="editOpen('editEducation')"><i class="el-icon-circle-plus-outline"></i>添加</span></h2>
        <div class="content" v-if="educationList.length === 0">
            <el-empty :image-size="200"></el-empty>
        </div>
        <div class="content" v-else>
          <div class="education-wrapper" v-for="(education, index) in educationList" :key="education.school_name + index">
            <el-button type="text" icon="el-icon-edit" class="edit"
                       @click="toggleEdit('editEducation',education, educationForm)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete-solid" class="remove"
                       @click="remove(education)">删除</el-button>
            <img v-if="$store.state.onlyReadResume" class="icon"
                 :src="require('@/image/illustration/el-icon-school.png')"
                 style="width: 45px; height: 45px; float: left" />
            <SymbolIcon v-else icon-class="el-icon-school" />
            <div class="education-info">
              <h3>
                <span>{{ education.school_name }}</span>
                <span>
                      {{ education.education }}&nbsp;·
                      <span v-if="education.examination_flag === 'N'">非</span>统招&nbsp;·
                      <span v-if="education.fulltime_flag === 'N'">非</span>全日制
                      <el-divider direction="vertical"></el-divider>
                      {{ education.major }}
                </span>
                <span>
                    {{ education.start_date.split("-").slice(0,2).join(".") }}
                    &nbsp;-&nbsp;
                    {{ education.end_date.split("-").slice(0,2).join(".") }}</span>
              </h3>
              <div class="education-honor" v-if="education.honor">
                <h4>荣誉 / 奖项</h4>
                <p>{{ education.honor }}</p>
              </div>
              <div class="education-certificate" v-if="education.certificate">
                <h4>证书</h4>
                <p>{{ education.certificate }}</p>
              </div>
              <div class="attached_info" v-if="education.attached_info">
                <h4>附加信息</h4>
                <p>{{ education.attached_info }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-education editDialog" v-else>
        <div class="edit-title">编辑教育经历</div>
        <div class="edit-content">
          <el-form :model="educationForm" :rules="educationRules" ref="educationForm" label-width="100px">
            <el-form-item label="学校名称" prop="school_name">
              <el-input v-model="educationForm.school_name"></el-input>
            </el-form-item>
            <el-form-item label="在校时间" required class="date-form-item">
              <el-form-item prop="start_date" label-width="0" class="start-date-form-item">
                <el-date-picker
                      v-model="educationForm.start_date"
                      type="month"
                      placeholder="入学时间"
                      format="yyyy.MM"
                      value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="end_date" label-width="0" class="end-date-form-item">
                <el-date-picker
                      v-model="educationForm.end_date"
                      type="month"
                      placeholder="毕业时间"
                      format="yyyy.MM"
                      value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="学历" prop="education">
              <el-select v-model="educationForm.education" placeholder="请选择学历">
                <el-option
                      v-for="item in ['初中及以下','中专','高中','大专','本科','硕士','博士']"
                      :key="item"
                      :label="item"
                      :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业名称" prop="major">
              <el-input v-model="educationForm.major"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
              <el-form-item label="是否为统招" prop="examination_flag" label-width="114px">
                <el-switch
                      v-model="examination_flag"
                      @change="((newStatus) => switchStatus(newStatus, 'examination_flag'))"
                      active-color="#00d7c6"
                      inactive-color="#c0ccda">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否为全日制" prop="fulltime_flag" label-width="128px">
                <el-switch
                      v-model="fulltime_flag"
                      @change="((newStatus) => switchStatus(newStatus, 'fulltime_flag'))"
                      active-color="#00d7c6"
                      inactive-color="#c0ccda">
                </el-switch>
              </el-form-item>
            </el-form-item>
            <el-form-item label="荣誉 / 奖项" prop="honor">
              <el-input v-model="educationForm.honor"></el-input>
            </el-form-item>
            <el-form-item label="证书" prop="certificate">
              <el-input v-model="educationForm.certificate"></el-input>
            </el-form-item>
            <el-form-item label="附加信息" prop="attached_info">
              <el-input v-model="educationForm.attached_info"></el-input>
            </el-form-item>
            <el-form-item class="edit-btn">
              <el-button type="primary" @click="submitForm('educationForm','editEducation')">保存</el-button>
              <el-button type="text" @click="resetForm('editEducation')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    import SymbolIcon from "@/components/SymbolIcon";
    export default {
        name: "ResumeEducation",
        components: { SymbolIcon},
        props: {
            resume_id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                educationList: [],
                // educationList: [
                //     {
                //         education_id: "",
                //         school_name: "清华大学",
                //         education: "本科",
                //         start_date: "2018.09",
                //         end_date: "2022.06",
                //         major: "软件工程",
                //         examination_flag: "N",
                //         fulltime_flag: "Y",
                //         honor: "国家奖学金、国家励志奖学金、红棉奖学金一等（学业优秀）、英语四六级",
                //         certificate: "软考中级软件设计师、软考中级数据库系统工程师",
                //         attached_info: ""
                //     },
                //     {
                //         education_id: "",
                //         school_name: "北京大学",
                //         education: "硕士",
                //         start_date: "2022.09",
                //         end_date: "2025.06",
                //         major: "电子信息工程",
                //         examination_flag: "Y",
                //         fulltime_flag: "N",
                //         honor: "",
                //         certificate: "",
                //         attached_info: "在XXX导师带领下完成SCI论文并发表至XXX网站"
                //     }
                // ],
                educationForm: {
                    education_id: "",
                    resume_id: this.resume_id,
                    school_name: "",
                    education: "",
                    start_date: "",
                    end_date: "",
                    major: "",
                    examination_flag: "Y",
                    fulltime_flag: "Y",
                    honor: "",
                    certificate: "",
                    attached_info: ""
                },
                educationRules: {
                    school_name: [
                        { required: true, message: "请输入学校名称", trigger: 'blur'},
                    ],
                    education: [
                        { required: true, message: "请输入学历", trigger: 'blur'},
                    ],
                    start_date: [
                        { required: true, message: "请输入入学时间", trigger: 'blur'},
                    ],
                    end_date: [
                        { required: true, message: "请输入毕业时间", trigger: 'blur'},
                    ],
                    major: [
                        { required: true, message: "请输入所学专业", trigger: 'blur'},
                    ],
                },
                //教育经历 编辑框
                editEducation: false,

                examination_flag: true,
                fulltime_flag: true,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: `/education/list/${this.resume_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    this.educationList = Object.assign([],[],res.data.educationList);
                }
                // 获取完数据告知父组件已更新完毕,用于预览简历的异步通知
                this.$emit("updatePart:resume", 1)
            },
            // 切换为编辑框
            editOpen(editDialog){
                this[editDialog] = !this[editDialog];
            },
            // 切换为编辑框时 如果是编辑按钮，传递表单所需属性值
            toggleEdit(editDialog,defaultForm,editForm){
                if (defaultForm) {
                    for (const [defaultKey, defaultValue] of Object.entries(defaultForm)) {
                        for (const editKey of Object.keys(editForm)) {
                            if (editKey === defaultKey){
                                editForm[editKey] = defaultValue;
                            }
                        }
                    }
                    this.examination_flag = editForm.examination_flag === 'Y';
                    this.fulltime_flag = editForm.fulltime_flag === 'Y';
                    // console.log(this.educationForm);
                }
                this.editOpen(editDialog);
            },
            switchStatus(status, key) {
                status ? this.educationForm[key] = 'Y' : this.educationForm[key] = 'N';
                // console.log(this.educationForm)
            },
            // 教育经历删除
            async remove(education) {
                const res = await this.$axios.request({
                    url: `/education/delete`,
                    method: "delete",
                    data: education
                })
                console.log(res);
                this.initData();
            },
            // 提交表单
            submitForm(formName, editDialog) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$axios.request({
                            url: `/education/saveOrUpdate`,
                            method: "post",
                            data: this.educationForm
                        });
                        console.log(res);
                        if(res.msg === 'success'){
                            this.initData();
                        }
                        this.$message.success("保存成功");
                        this.resetForm(editDialog);
                    } else {
                        this.$message.error("保存失败");
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(editDialog) {
                for (const key of Object.keys(this.educationForm)) {
                    if(key !== "resume_id") { 
                        this.educationForm[key] = ""
                    }
                }
                this.examination_flag = true;
                this.fulltime_flag = true;
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
    @editBackground: #f8f9fc;
    @fontColor: #414a60;
    @salaryColor: #fb670f;
    @promptColor: #8d92a1;
    @borderColor: #dcdfe6;

    h2{
        font-size: 20px;
        padding-left: 20px;
        position: relative;
        &::before{
            content: "";
            display: block;
            width: 2px;
            height: 16px;
            position: absolute;
            border-radius: 3px;
            background: @activeColor;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        span{
            font-size: 15px;
            font-weight: normal;
            cursor: pointer;
            color: @activeColor;
          .el-link-active();
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            i{
                margin-right: 5px;
            }
        }
    }
    .content{
        margin-top: 30px;
        .education-wrapper{
            padding: 10px;
            position: relative;
            &:hover{
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
                h3 >span:last-of-type{
                    display: none;
                }
                .edit,.remove{
                    display: block;
                }
            }
            .edit,.remove{
                display: none;
                position: absolute;
                right: 10px;
                top: 10px;
                z-index: 1;
                &.edit{
                    right: 80px;
                }
            }
            .icon{
                font-size: 45px;
                float: left;
                & + div{
                    margin-left: 70px;
                }
            }
        }
    }
    .edit-title{
        font-size: 16px;
        font-weight: bold;
        color: @activeColor;
    }
    .edit-content{
        margin-top: 30px;
        .el-form-item{
            width: 50%;
            &:not(.edit-btn){
                display: inline-block;
            }
            &.editor-form-item{
                width: 100%;
            }
            &.date-form-item{
                width: 50%;
                .el-date-editor.el-input, .el-date-editor.el-input__inner{
                    width: 100%;
                }
                .start-date-form-item /deep/ .el-form-item__content{
                    margin-right: 10px !important;
                }
                .end-date-form-item /deep/ .el-form-item__content{
                    margin-left: 10px !important;
                }
            }
        }
    }
    .editDialog{
        padding: 30px 40px;
        background: @editBackground;
    }
    
    .resume-education{
        font-size: 16px;
        .education{
            .education-info{
                h3{
                    position: relative;
                    > span:nth-child(1){
                        display: block;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    > span:nth-child(2){
                        display: block;
                        line-height: 32px;
                        color: @promptColor;
                        font-size: 16px;
                        font-weight: normal;
                    }
                    > span:nth-child(3){
                        font-size: 16px;
                        font-weight: normal;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }
                > div{
                    margin-top: 20px;
                    h4{
                        font-weight: bold;
                        line-height: 32px;
                    }
                    p{
                        font-size: 14px;
                        line-height: 32px;
                    }
                }
            }
        }
    }

</style>