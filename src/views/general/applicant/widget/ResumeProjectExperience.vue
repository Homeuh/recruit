<template>
    <div class="resume-project-experience">
      <div class="project-experience" v-if="!editProjectExperience">
        <h2>项目经验<span data-html2canvas-ignore="true" @click="editOpen('editProjectExperience')"><i class="el-icon-circle-plus-outline"></i>添加</span></h2>
        <div class="content" v-if="projectExperienceList.length === 0">
            <el-empty :image-size="200"></el-empty>
        </div>
        <div class="content" v-else>
          <div class="project-experience-wrapper" v-for="(projectExperience, index) in projectExperienceList" :key="projectExperience.project_name + index">
            <el-button type="text" icon="el-icon-edit" class="edit"
                       @click="toggleEdit('editProjectExperience',projectExperience, projectExperienceForm)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete-solid" class="remove"
                       @click="remove(projectExperience)">删除</el-button>
            <img v-if="$store.state.onlyReadResume" class="icon"
                 :src="require('@/image/illustration/el-icon-project.png')"
                 style="width: 45px; height: 45px; float: left" />
            <SymbolIcon v-else icon-class="el-icon-project" />
            <div class="project-info">
              <h3>
                <span>{{ projectExperience.project_name }}</span>
                <span>{{ projectExperience.project_duty }}</span>
                <span>
                    {{ projectExperience.start_date.split("-").slice(0,2).join(".") }}
                    &nbsp;-&nbsp;
                    {{ projectExperience.end_date.split("-").slice(0,2).join(".") }}</span>
              </h3>
              <div class="project-description">
                <h4>项目介绍</h4>
                <p v-for="(des,index) in filterText(projectExperience.project_description)" :key="des + index">{{ des }}</p>
              </div>
              <div class="project-description">
                <h4>我的职责</h4>
                <p v-for="(duty,index) in filterText(projectExperience.duty_description)" :key="duty + index">{{ duty }}</p>
              </div>
              <div class="project-url" v-if="projectExperience.project_url">
                <h4>项目链接</h4>
                <el-link :href="projectExperience.project_url">{{ projectExperience.project_url }}</el-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-project-experience editDialog" v-else>
        <div class="edit-title">编辑项目经验</div>
        <div class="edit-content">
          <el-form :model="projectExperienceForm" :rules="projectExperienceRules" ref="projectExperienceForm" label-width="100px">
            <el-form-item label="项目名称" prop="project_name">
              <el-input v-model="projectExperienceForm.project_name"></el-input>
            </el-form-item>
            <el-form-item label="项目身份" prop="project_duty">
              <el-input v-model="projectExperienceForm.project_duty"></el-input>
            </el-form-item>
            <el-form-item label="项目周期" required class="date-form-item">
              <el-form-item prop="start_date" label-width="0" class="start-date-form-item">
                <el-date-picker
                      v-model="projectExperienceForm.start_date"
                      type="month"
                      placeholder="开始时间"
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
                      v-model="projectExperienceForm.end_date"
                      type="month"
                      placeholder="结束时间"
                      format="yyyy.MM"
                      value-format="yyyy-MM-dd"
                      :picker-options="{
                          disabledDate(time) {
                            return time.getTime() > Date.now();
                      }}">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="项目链接" prop="project_url">
              <el-input v-model="projectExperienceForm.project_url" placeholder="请填写项目链接（选填，https://开头）"></el-input>
            </el-form-item>
            <el-form-item label="项目介绍" prop="project_description" class="editor-form-item">
              <Editor placeholder="请输入项目介绍"
                      :content.sync="projectExperienceForm.project_description"
                      :menus="['list']"
                      :showFullScreen="false"/>
            </el-form-item>
            <el-form-item label="我的职责" prop="duty_description" class="editor-form-item">
              <Editor placeholder="请输入职责描述"
                      :content.sync="projectExperienceForm.duty_description"
                      :menus="['list']"
                      :showFullScreen="false"/>
            </el-form-item>
            <el-form-item class="edit-btn">
              <el-button type="primary" @click="submitForm('projectExperienceForm','editProjectExperience')">保存</el-button>
              <el-button type="text" @click="resetForm('editProjectExperience')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    import SymbolIcon from "@/components/SymbolIcon";
    import Editor from "@/components/Editor.vue";
    export default {
        name: "ResumeProjectExperience",
        components: { SymbolIcon, Editor},
        props: {
            resume_id: {
                type: String,
                required: true
            }
        },
        data() {
            let checkUrl = (rule, value, callback) => {
                let reg = 	/^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                if(!value){
                    return callback();
                } else if(!reg.test(value)) {
                    callback(new Error("链接格式有误，请重新输入"));
                } else {
                    callback();
                }
            };
            return {
                projectExperienceList: [],
                /* projectExperienceList: [
                    {
                        project_id: "",
                        project_name: "万优招聘网站",
                        project_description: "基于Vue全家桶 + ElementUI的招聘网站，模拟boss直聘",
                        project_duty: "项目负责人",
                        duty_description: "1、参与网站的需求讨论以及开发全过程\n" +
                            "2、负责整个项目的前端代码实现，解决浏览器适配问题以及性能优化\n" +
                            "3、通过从服务器请求数据完成逻辑功能开发（json数据解析），协调后端同学完成产品的开发",
                        start_date: "2022.02",
                        end_date: "2022.04",
                        project_url: "https://www.gitee.com"
                    },
                    {
                        project_id: "",
                        project_name: "电商后台管理系统",
                        project_description: "项目技术：Vue2全家桶 + axios + Less + Echarts\n" +
                            "项目特点：\n" +
                            "1.实现首页、用户管理、权限管理、商品管理、订单管理模块，有一定增删改查功能\n" +
                            "2.顶部导航菜单及左侧导航三者联动的面包屑实现\n" +
                            "3.mock数据模拟后台数据库请求\n" +
                            "4.封装axios实现异步请求",
                        project_duty: "项目负责人",
                        duty_description: "练手项目",
                        start_date: "2021.12",
                        end_date: "2021.11",
                        project_url: "https://www.github.com"
                    }
                ], */
                projectExperienceForm: {
                    project_id: "",
                    resume_id: this.resume_id,
                    project_name: "",
                    project_description: "",
                    project_duty: "",
                    duty_description: "",
                    start_date: "",
                    end_date: "",
                    project_url: ""
                },
                projectExperienceRules: {
                    project_name: [
                        { required: true, message: "请输入项目名称", trigger: 'blur'}
                    ],
                    project_description: [
                        { required: true, message: "请输入项目介绍", trigger: 'blur'}
                    ],
                    project_duty: [
                        { required: true, message: "请输入项目身份", trigger: 'blur'}
                    ],
                    duty_description: [
                        { required: true, message: "请输入项目名称", trigger: 'blur'}
                    ],
                    start_date: [
                        { required: true, message: "请输入项目开始时间", trigger: 'blur'}
                    ],
                    end_date: [
                        { required: true, message: "请输入项目结束时间", trigger: 'blur'}
                    ],
                    project_url: [
                        { validator: checkUrl, trigger: 'blur'}
                    ]
                },
                //项目经验 编辑框
                editProjectExperience: false,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: `/project-experience/list/${this.resume_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    this.projectExperienceList = Object.assign([],[],res.data.projectExperienceList);
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
                }
                this.editOpen(editDialog);
            },
            // 过滤文本
            filterText(data) {
                return data.split("\n");
            },
            // 项目经验删除
            async remove(projectExperience) {
                const res = await this.$axios.request({
                    url: `/project-experience/delete`,
                    method: "delete",
                    data: projectExperience
                })
                console.log(res);
                this.initData();
            },
            // 提交表单
            submitForm(formName, editDialog) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$axios.request({
                            url: `/project-experience/saveOrUpdate`,
                            method: "post",
                            data: this.projectExperienceForm
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
                for (const key of Object.keys(this.projectExperienceForm)) {
                    if(key !== "resume_id") { 
                        this.projectExperienceForm[key] = ""
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
        .project-experience-wrapper{
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
    
    .resume-project-experience{
        font-size: 16px;
        .project-experience{
            .project-info{
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
                    .el-link{
                        color: @fontColor;
                        .el-link-active();
                        
                    }
                }
            }
        }
    }
</style>