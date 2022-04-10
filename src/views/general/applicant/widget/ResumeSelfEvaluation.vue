<template>
    <div class="resume-self-evaluation">
      <div class="self-evaluation" v-if="!editSelfEvaluation">
        <h2>个人优势<span data-html2canvas-ignore="true" @click="toggleEdit('editSelfEvaluation', resume, resumeForm)"><i class="el-icon-edit"></i>编辑</span></h2>
        <div class="empty-box" v-if="Object.keys(resume).length === 0 || !resume.self_evaluation">
          <el-empty :image-size="200"></el-empty>
        </div>
        <div class="content" v-else>
          <p v-for="(eva,index) in filterText(resume.self_evaluation)" :key="eva + index">{{ eva }}</p>
        </div>
      </div>
      <div class="edit-self-evaluation editDialog" v-else>
        <div class="edit-title">编辑个人优势</div>
        <div class="edit-content">
          <el-form :model="resumeForm" ref="resumeForm">
            <el-form-item>
              <Editor placeholder="请描述个人优势"
                      :content.sync="resumeForm.self_evaluation"
                      :menus="['list']" :showFullScreen="false"/>
            </el-form-item>
            <el-form-item class="edit-btn">
              <el-button type="primary" @click="submitForm('resumeForm','editSelfEvaluation')">保存</el-button>
              <el-button type="text" @click="resetForm('editSelfEvaluation')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    import Editor from "@/components/Editor.vue";
    export default {
        name: "ResumeSelfEvaluation",
        components: { Editor },
        props: {
            resume_id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                resume: {},
                /*resume: {
                    resume_id: "",
                    applicant_id: "",
                    self_evaluation: "对待工作责任感强，细致认真，积极向上，有较强的团队意识。\n" +
                        "喜欢与他人交往、热爱生活、乐于助人。\n" +
                        "自学能力较强，刻苦努力，不断要求自己、提升自己。\n" +
                        "同时善于观察周围的事物，善于收集资料分析问题，并能快速解决问题。"
                },*/
                resumeForm: {
                    resume_id: this.resume_id,
                    applicant_id: "",
                    self_evaluation: ""
                },
                //个人优势 编辑框
                editSelfEvaluation: false,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: `/resume/selfEvaluation/${this.resume_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    this.resume = Object.assign({},{},res.data.resume);
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
            // 提交表单
            submitForm(formName, editDialog) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$axios.request({
                            url: `/resume/saveOrUpdate`,
                            method: "post",
                            data: this.resumeForm
                        });
                        console.log(res);
                        if(res.msg === 'success'){
                            for (const [key, value] of Object.entries(res.data.resume)) {
                                this.$set(this.resume,key,value);
                            }
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
                for (const key of Object.keys(this.resumeForm)) {
                    if(key !== "resume_id"){
                        this.resumeForm[key] = ""
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
        padding: 10px;
        &:hover{
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
        }
        .icon{
            font-size: 45px;
            float: left;
            & + div{
                margin-left: 70px;
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
        }
    }
    .editDialog{
        padding: 30px 40px;
        background: @editBackground;
    }

    .resume-self-evaluation{
        font-size: 16px;
        > div + div{
            margin-top: 40px;
        }
        .self-evaluation{
            p{
                line-height: 32px;
            }
        }
        .edit-self-evaluation{
            .edit-content .el-form-item{
                width: 100%;
            }
        }
    }
</style>