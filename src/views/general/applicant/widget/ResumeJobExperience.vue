<template>
    <div class="resume-job-experience">
      <div class="job-experience" v-if="!editJobExperience">
        <h2>工作经验<span data-html2canvas-ignore="true" @click="editOpen('editJobExperience')"><i class="el-icon-circle-plus-outline"></i>添加</span></h2>
        <div class="content" v-if="jobExperienceList.length === 0">
            <el-empty :image-size="200"></el-empty>
        </div>
        <div class="content" v-else>
          <div class="job-experience-wrapper" v-for="(jobExperience, index) in jobExperienceList" :key="jobExperience.job_duty + index">
            <el-button type="text" icon="el-icon-edit" class="edit"
                       @click="toggleEdit('editJobExperience',jobExperience, jobExperienceForm)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete-solid" class="remove"
                       @click="remove(jobExperience)">删除</el-button>
            <img v-if="$store.state.onlyReadResume" class="icon"
                 :src="require('@/image/illustration/el-icon-company.png')"
                 style="width: 45px; height: 45px; float: left" />
            <SymbolIcon v-else icon-class="el-icon-company" />
            <div class="job-info">
              <h3>
                <span>{{ jobExperience.company_name }}</span>
                <span>{{ jobExperience.job_duty }}</span>
                <span>
                    {{ jobExperience.start_date.split("-").slice(0,2).join(".") }}
                    &nbsp;-&nbsp;
                    {{ jobExperience.end_date.split("-").slice(0,2).join(".") }}
                </span>
              </h3>
              <p v-for="(des,index) in filterText(jobExperience.job_description)" :key="des + index">{{ des }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-job-experience editDialog" v-else>
        <div class="edit-title">编辑工作经验</div>
        <div class="edit-content">
          <el-form :model="jobExperienceForm" :rules="jobExperienceRules" ref="jobExperienceForm" label-width="100px">
            <el-form-item label="公司名称" prop="company_name">
              <el-input v-model="jobExperienceForm.company_name"></el-input>
            </el-form-item>
            <el-form-item label="职位名称" prop="job_duty">
              <el-input v-model="jobExperienceForm.job_duty"></el-input>
            </el-form-item>
            <el-form-item label="在职时间" required class="date-form-item">
              <el-form-item prop="start_date" label-width="0" class="start-date-form-item">
                <el-date-picker
                      v-model="jobExperienceForm.start_date"
                      type="month"
                      placeholder="入职时间"
                      format="yyyy.MM"
                      value-format="yyyy-MM-dd"
                      :picker-options="{
                          disabledDate(time) {
                            return time.getTime() > Date.now();
                      }}">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="end_date" label-width="0" class="end-date-form-item">
                <el-date-picker
                      v-model="jobExperienceForm.end_date"
                      type="month"
                      placeholder="离职时间"
                      format="yyyy.MM"
                      value-format="yyyy-MM-dd"
                      :picker-options="{
                          disabledDate(time) {
                            return time.getTime() > Date.now();
                      }}">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="工作内容" prop="job_description" class="editor-form-item">
              <Editor placeholder="请描述工作内容"
                      :content.sync="jobExperienceForm.job_description"
                      :menus="['list']" :showFullScreen="false"/>
            </el-form-item>
            <el-form-item class="edit-btn">
              <el-button type="primary" @click="submitForm('jobExperienceForm','editJobExperience')">保存</el-button>
              <el-button type="text" @click="resetForm('editJobExperience')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    import SymbolIcon from "@/components/SymbolIcon.vue";
    import Editor from "@/components/Editor.vue"
    export default {
        name: "ResumeJobExperience",
        components: { SymbolIcon, Editor},
        props: {
            resume_id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                jobExperienceList: [],
                /* jobExperienceList: [
                    {
                        experience_id: "",
                        company_name: "迅雷网络",
                        job_duty: "前端工程师",
                        job_description: "1.参与产品需求、研发设计的相关讨论，从前端设计角度提升产品使用性和美观度的要求；\n" +
                            "2.负责公司产品的前端开发工作，实现产品所需的交互效果；\n" +
                            "3.与后台技术开发保持良好的沟通，完成具体的开发工作。",
                        start_date: "2018.12",
                        end_date: "2020.06",
                    },
                    {
                        experience_id: "",
                        company_name: "字节跳动",
                        job_duty: "前端开发工程师",
                        job_description: "1、 根据工作安排高效、高质地完成代码编写，确保符合规范的前端代码规范；\n" +
                            "2、 负责公司项目的前端修改调试和开发工作，优化用户交互体验\n" +
                            "3、 与设计团队紧密配合，实现设计师的设计想法；\n" +
                            "4、 与后端开发团队紧密配合，确保代码有效对接，优化页面前端性能；\n" +
                            "5、 通过各类前端技术对页面进行**的优化，良好的前端代码习惯。",
                        start_date: "2016.09",
                        end_date: "2018.10",
                    }
                ], */
                jobExperienceForm: {
                    experience_id: "",
                    resume_id: this.resume_id,
                    company_name: "",
                    job_duty: "",
                    job_description: "",
                    start_date: "",
                    end_date: "",
                },
                jobExperienceRules: {
                    company_name: [
                        { required: true, message: "请输入公司名称", trigger: 'blur'},
                    ],
                    job_duty: [
                        { required: true, message: "请输入职位名称", trigger: 'blur'},
                    ],
                    job_description: [
                        { required: true, message: "请描述工作内容", trigger: 'blur'},
                    ],
                    start_date: [
                        { required: true, message: "请选择入职时间", trigger: 'blur'},
                    ],
                    end_date: [
                        { required: true, message: "请选择离职时间", trigger: 'blur'},
                    ],
                },
                //工作经验 编辑框
                editJobExperience: false,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: `/job-experience/list/${this.resume_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    this.jobExperienceList = Object.assign([],[],res.data.jobExperienceList);
                }
                // 获取完数据告知父组件已更新完毕,用于预览简历的异步通知
                this.$emit("updatePart:resume", 1)
            },
            // 切换为编辑框
            editOpen(editDialog){
                this[editDialog] = !this[editDialog];
            },
            // 切换为编辑框时 如果是编辑按钮，传递表单所需属性值
            toggleEdit(editDialog, defaultForm, editForm){
                if (defaultForm) {
                    for (const [defaultKey, defaultValue] of Object.entries(defaultForm)) {
                        for (const editKey of Object.keys(editForm)) {
                            if (editKey === defaultKey){
                                editForm[editKey] = defaultValue;
                            }
                        }
                    }
                }
                console.log(this.jobExperienceForm);
                this.editOpen(editDialog);
            },
            // 过滤文本
            filterText(data) {
                return data.split("\n");
            },
            // 工作经验删除
            async remove(jobExperience) {
                const res = await this.$axios.request({
                    url: `/job-experience/delete`,
                    method: "delete",
                    data: jobExperience
                })
                console.log(res);
                this.initData();
            },
            // 提交表单
            submitForm(formName, editDialog) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$axios.request({
                            url: `/job-experience/saveOrUpdate`,
                            method: "post",
                            data: this.jobExperienceForm
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
                for (const key of Object.keys(this.jobExperienceForm)) {
                    if(key !== "resume_id") { 
                        this.jobExperienceForm[key] = "";
                    }
                }
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
        .job-experience-wrapper{
            padding: 10px;
            position: relative;
            &:hover{
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
                h3 span:last-of-type{
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
    
    .resume-job-experience{
        font-size: 16px;
        .job-experience{
            .job-info{
                h3{
                    position: relative;
                    span:nth-child(1){
                        display: block;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    span:nth-child(2){
                        display: block;
                        line-height: 32px;
                        color: @promptColor;
                        font-size: 16px;
                        font-weight: normal;
                    }
                    span:nth-child(3){
                        font-size: 16px;
                        font-weight: normal;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }
                p{
                    font-size: 14px;
                    line-height: 32px;
                    &:first-of-type{
                        margin-top: 15px;
                    }
                }
            }
        }
    }
</style>