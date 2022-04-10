<template>
    <div class="resume-skill">
      <div class="skill" v-if="!editSkillList" ref="skill">
        <h2>专业技能<span data-html2canvas-ignore="true" @click="editOpen('editSkillList')"><i class="el-icon-circle-plus-outline"></i>添加</span></h2>
        <div class="content" v-if="skillList.length === 0">
            <el-empty :image-size="200"></el-empty>
        </div>
        <div class="content" v-else>
          <div v-for="(skill,index) in skillList" :key="skill.skill_name + index"
               class="skill-degree">
            <el-button type="text" icon="el-icon-edit" class="edit"
                       @click="toggleEdit('editSkillList',skill, skillForm)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete-solid" class="remove"
                       @click="remove(skill)">删除</el-button>
            <span class="skill-name">{{ skill.skill_name }}</span>
            <el-progress color="#00c2b3" :stroke-width="13" :percentage="skillPercentage(skill.mastery_degree)" :format="((val) => skillFormat(val,skill))"></el-progress>
          </div>
        </div>
      </div>
      <div class="edit-skill editDialog" v-else>
        <div class="edit-title">编辑专业技能</div>
        <div class="edit-content">
          <el-form :model="skillForm" :rules="skillRules" ref="skillForm" label-width="100px">
            <el-form-item label="技能名称" prop="skill_name">
              <el-input v-model="skillForm.skill_name"></el-input>
            </el-form-item>
            <el-form-item label="掌握程度" prop="mastery_degree">
              <el-select v-model="skillForm.mastery_degree" placeholder="请选择技能掌握程度">
                <el-option
                      v-for="item in ['了解','掌握','熟练','精通']"
                      :key="item"
                      :label="item"
                      :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="edit-btn">
              <el-button type="primary" @click="submitForm('skillForm','editSkillList')">保存</el-button>
              <el-button type="text" @click="resetForm('editSkillList')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Resume-skill",
        props: {
            resume_id: {
                type: String,
                required: true
            }
        },
        mounted() {
            this.setMinWidth();
        },
        updated() {
            this.setMinWidth();
        },
        data() {
            return {
                skillList: [],
                /* skillList: [
                    { skill_id: "", skill_name: "SQL、MySQL", mastery_degree: "精通"},
                    { skill_id: "", skill_name: "HTML、CSS、JS", mastery_degree: "熟练"},
                    { skill_id: "", skill_name: "算法、数据结构", mastery_degree: "掌握"},
                    { skill_id: "", skill_name: "webpack、git、svn", mastery_degree: "了解"},
                ], */
                skillForm: {
                    skill_id: "",
                    resume_id: this.resume_id,
                    skill_name: "",
                    mastery_degree: "",
                },
                skillRules: {
                    skill_name: [
                        { required: true, message: "请输入技能名称", trigger: 'blur'}
                    ],
                    mastery_degree: [
                        { required: true, message: "请选择技能掌握程度", trigger: 'blur'}
                    ],
                },
                //专业技能 编辑框
                editSkillList: false,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: `/skill/list/${this.resume_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    this.skillList = Object.assign([],[],res.data.skillList);
                }
                // 获取完数据告知父组件已更新完毕,用于预览简历的异步通知
                this.$emit("updatePart:resume", 1)
            },
            // 切换为编辑框
            editOpen(editDialog){
                this[editDialog] = !this[editDialog];
                // this.setMinWidth();
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
            skillPercentage(degree){
                return degree === "精通" ? 100 :
                    (degree === "熟练" ? 75 :
                        (degree === "掌握" ? 50 : 25))
            },
            skillFormat(per,skill) {
                return skill.mastery_degree;
            },
            // 设置专业技能模块 所有专业名称 最小宽度
            setMinWidth() {
                const skillList = document.querySelectorAll(".skill-name");
                let minWidth = 0;
                skillList.forEach(skill => {
                    if(this.$(skill).width() > minWidth)
                        minWidth = this.$(skill).width();
                })
                minWidth += 20;
                skillList.forEach(skill => {
                    skill.style.minWidth = minWidth + "px";
                })
            },
            // 专业技能删除
            async remove(skill) {
                const res = await this.$axios.request({
                    url: `/skill/delete`,
                    method: "delete",
                    data: skill
                })
                console.log(res);
                this.initData();
            },
            // 提交表单
            submitForm(formName, editDialog) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$axios.request({
                            url: `/skill/saveOrUpdate`,
                            method: "post",
                            data: this.skillForm
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
                for (const key of Object.keys(this.skillForm)) {
                    if(key !== "resume_id") { 
                        this.skillForm[key] = ""
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
    
    .resume-skill{
        .skill{
            .skill-degree{
                padding: 10px;
                position: relative;
                &:hover{
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
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
                span{
                    float: left;
                }
                .el-progress{
                    width: 370px;
                    display: inline-block;
                    /deep/ .el-progress-bar{
                        padding-right: 70px;
                    }
                    /deep/ .el-progress-bar__outer{
                        background: transparent;
                    }
                }
            }
        }
    }
</style>