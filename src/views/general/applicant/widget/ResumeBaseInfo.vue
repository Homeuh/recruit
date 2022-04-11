<template>
    <div class="resume-base-info">
      <div class="empty-box" v-if="Object.keys(resume).length === 0">
        <el-empty :image-size="200"></el-empty>
      </div>
      <div class="basic-info" v-else-if="!editResume">
        <el-button type="text" class="img-btn" @click="uploadVisible = true">
          <img v-if="resume.applicant_avatar" :src="resume.applicant_avatar" :alt="resume.applicant_name"
               style="width: 100px; height: 100px; border-radius: 50%"/>
          <img v-else :src="require('@/image/avatar/boy-1.png')" :alt="resume.applicant_name"
               style="width: 100px; height: 100px; border-radius: 50%"/>
        </el-button>
        <UploadAvatar :visible.sync="uploadVisible" :uploadDirectly="true" @update:data="initData"></UploadAvatar>
        <div class="applicant-info">
          <h1>{{ resume.applicant_name }}<span data-html2canvas-ignore="true" @click="toggleEdit('editResume',resume,resumeForm)"><i class="el-icon-edit"></i>编辑</span></h1>
          <p class="applicant-base">
            <span>{{ resume.applicant_sex }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ resume.applicant_age }}岁</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ resume.working_year }}经验</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ resume.applicant_education }}</span>
          </p>
          <p class="applicant-contact">
            <span><i class="el-icon-mobile-phone"></i>{{ resume.applicant_tel }}</span>
            <span><i class="el-icon-message"></i>{{ resume.applicant_email }}</span>
          </p>
        </div>
      </div>
      <div class="edit-base-info" v-else>
        <div class="edit-title">编辑基本信息</div>
        <div class="edit-content">
          <el-form :model="resumeForm" :rules="resumeRules" ref="resumeForm" label-width="114px">
            <el-form-item label="姓名" prop="applicant_name">
              <el-input v-model="resumeForm.applicant_name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="applicant_sex">
              <el-radio v-model="resumeForm.applicant_sex" label="男">男</el-radio>
              <el-radio v-model="resumeForm.applicant_sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label-width="0">
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
            </el-form-item>
            <el-form-item label="当前所在城市" prop="applicant_city">
              <el-input v-model="resumeForm.applicant_city" @focus="dialogVisible = true"></el-input>
              <CityDialog :visible.sync="dialogVisible"
                          :currentCity.sync="resumeForm.applicant_city"
                          :isUserSelect="true"/>
            </el-form-item>
            <el-form-item label="身份类型" prop="applicant_identity">
              <el-radio v-model="resumeForm.applicant_identity" label="学生">学生</el-radio>
              <el-radio v-model="resumeForm.applicant_identity" label="职场人士">职场人士</el-radio>
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
            <el-form-item label="手机号码" prop="applicant_tel">
              <el-input v-model="resumeForm.applicant_tel"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="applicant_email">
              <el-input v-model="resumeForm.applicant_email"></el-input>
            </el-form-item>
            <el-form-item class="edit-btn">
              <el-button type="primary" @click="submitForm('resumeForm','editResume')">保存</el-button>
              <el-button type="text" @click="resetForm('resumeForm','editResume')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    import CityDialog from "@/components/CityDialog";
    import UploadAvatar from "@/components/UploadAvatar";
    export default {
        name: "ResumeBaseInfo",
        components: { CityDialog, UploadAvatar},
        props: {
            resume_id: {
                type: String,
                required: true
            }
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
            return {
                resume: {},
                /*resume: {
                    applicant_id: "",
                    applicant_avatar: require("@/image/avatar/applicant_zhang.png"),
                    applicant_name: "张三",
                    applicant_sex: "男",
                    applicant_age: 22,
                    applicant_identity: "职场人士",
                    working_year: "1年",
                    applicant_education: "本科",
                    applicant_tel: "13522342234",
                    applicant_email: "850609866@qq.com",
                    applicant_city: "深圳",
                },*/
                resumeForm: {
                    applicant_id: "",
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
                    applicant_name: [
                        { required: true, message: "请输入姓名", trigger: 'blur'},
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    applicant_sex: [
                        { required: true}
                    ],
                    applicant_age: [
                        { required: true, message: "请选择年龄", trigger: 'blur'}
                    ],
                    applicant_education: [
                        { required: true, message: "请选择学历", trigger: 'blur'}
                    ],
                    applicant_identity: [
                        { required: true}
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
                // 基本信息 编辑框
                editResume: false,
                
                // 城市选择框
                dialogVisible: false,
                // 头像选择框
                uploadVisible: false
            }
        },
        computed: {
            ageRange() {
                const range = [];
                for (let i = 18; i < 60; i++) {
                    range.push(i);
                }
                return range;
            }
        },
        created() {
            // console.log(this.resume_id);
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: `/applicant/baseInfo/${this.resume_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    if (res.data.resume.applicant_avatar){
                        res.data.resume.applicant_avatar = require( "@/image/avatar/" + res.data.resume.applicant_avatar);
                    }
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
                console.log(this.resumeForm)
                this.editOpen(editDialog);
            },
            // 提交表单
            submitForm(formName, editDialog) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$axios.request({
                            url: `/applicant/saveOrUpdate`,
                            method: "post",
                            data: this.resumeForm
                        });
                        console.log(res);
                        if(res.msg === 'success'){
                            await this.initData();
                        }
                        this.$message.success("保存成功");
                        this.resetForm(formName,editDialog);
                    } else {
                        this.$message.error("保存失败");
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName,editDialog) {
               if(this.$refs[formName]){
                   this.$refs[formName].resetFields()
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
    .resume-base-info{
        background: @editBackground;
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
    }
    .basic-info{
        h1{
            position: relative;
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
        .img-btn{
            float: left;
        }
        .applicant-info{
            margin-left: 120px;
            p{
                font-size: 16px;
            }
            .applicant-base{
                line-height: 50px;
                .el-divider{
                    margin: 0 16px;
                }
            }
            .applicant-contact{
                span:first-child{
                    margin-right: 30px;
                }
                i{
                    margin-right: 8px;
                }
            }
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