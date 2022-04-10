<template>
    <div class="resume-job-intention">
      <div class="job-intention" v-if="!editJobIntention">
        <h2>求职意向<span data-html2canvas-ignore="true" @click="editOpen('editJobIntention')"><i class="el-icon-circle-plus-outline"></i>添加</span></h2>
        <div class="content" v-if="jobIntentionList.length === 0">
            <el-empty :image-size="200"></el-empty>
        </div>
        <div class="content" v-else>
          <div class="job-intention-wrapper" v-for="(jobIntention, index) in jobIntentionList" :key="jobIntention.intention_duty + index">
            <el-button type="text" icon="el-icon-edit" class="edit"
                       @click="toggleEdit('editJobIntention',jobIntention, jobIntentionForm,index)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete-solid" class="remove"
                       @click="remove(jobIntention)">删除</el-button>
            <p>
              <i class="el-icon-zhiwei position-icon"></i>
              <span>{{jobIntention.intention_duty}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{jobIntention.intention_type}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{jobIntention.intention_city}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{jobIntention.min_salary.split("K")[0]}}&nbsp;-&nbsp;{{jobIntention.max_salary}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{jobIntention.arrive_date}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="edit-job-intention editDialog" v-else>
        <div class="edit-title">编辑求职意向</div>
        <div class="edit-content">
          <el-form :model="jobIntentionForm" :rules="jobIntentionRules" ref="jobIntentionForm" label-width="100px">
            <el-form-item label="期望职位" prop="intention_duty">
              <el-input v-model="jobIntentionForm.intention_duty"></el-input>
            </el-form-item>
            <el-form-item label="工作类型" prop="intention_type">
              <el-select v-model="jobIntentionForm.intention_type" placeholder="请选择期望工作类型">
                <el-option
                      v-for="item in ['全职','兼职','实习']"
                      :key="item"
                      :label="item"
                      :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期望城市" prop="intention_city">
              <el-input v-model="jobIntentionForm.intention_city" @focus="dialogVisible = true"></el-input>
              <CityDialog :visible.sync="dialogVisible"
                          :currentCity.sync="jobIntentionForm.intention_city"
                          :isUserSelect="true"/>
            </el-form-item>
            <el-form-item label="到岗时间" prop="arrive_date">
              <el-select v-model="jobIntentionForm.arrive_date" placeholder="请选择到岗时间">
                <el-option
                      v-for="item in ['即刻到岗','1周内','2周内','1个月内','3个月内','待定']"
                      :key="item"
                      :label="item"
                      :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期望月薪" required>
              <el-form-item prop="min_salary" label-width="0">
                <el-select v-model="jobIntentionForm.min_salary" placeholder="请选择最低薪资">
                  <el-option
                        v-for="item in 100"
                        :key="item"
                        :label="item + 'K'"
                        :value="item + 'K'">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="max_salary" label-width="0">
                <el-select v-model="jobIntentionForm.max_salary" placeholder="请选择最高薪资">
                  <el-option
                        v-for="item in 100"
                        :key="item"
                        :label="item + 'K'"
                        :value="item + 'K'">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item class="edit-btn">
              <el-button type="primary" @click="submitForm('jobIntentionForm','editJobIntention')">保存</el-button>
              <el-button type="text" @click="resetForm('editJobIntention')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    import CityDialog from "@/components/CityDialog";
    export default {
        name: "ResumeJobIntention",
        components: { CityDialog},
        props: {
            resume_id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                jobIntentionList: [],
                // jobIntentionList: [
                //     {
                //         intention_id: "",
                //         intention_duty: "前端工程师",
                //         intention_type: "全职",
                //         intention_city: "深圳",
                //         min_salary: "8K",
                //         max_salary: "14K",
                //         arrive_date: "2周内"
                //     },
                //     {
                //         intention_id: "",
                //         intention_duty: "web前端开发工程师",
                //         intention_type: "全职",
                //         intention_city: "广州",
                //         min_salary: "7K",
                //         max_salary: "13K",
                //         arrive_date: "1个月内"
                //     }
                // ],
                jobIntentionForm: {
                    intention_id: "",
                    resume_id: this.resume_id,
                    intention_duty: "",
                    intention_type: "",
                    intention_city: "",
                    min_salary: "",
                    max_salary: "",
                    arrive_date: ""
                },
                jobIntentionRules: {
                    intention_duty: [
                        { required: true, message: "请输入期望职位", trigger: 'blur'},
                    ],
                    intention_type: [
                        { required: true, message: "请选择期望工作类型", trigger: 'blur'},
                    ],
                    intention_city: [
                        { required: true, message: "请选择期望城市", trigger: ['blur','change']},
                    ],
                    min_salary: [
                        { required: true, message: "请选择最低薪资", trigger: 'blur'},
                    ],
                    max_salary: [
                        { required: true, message: "请选择最高薪资", trigger: 'blur'},
                    ],
                    arrive_date: [
                        { required: true, message: "请选择到岗日期", trigger: 'blur'},
                    ],
                },
                //求职意向 编辑框
                editJobIntention: false,
                
                dialogVisible: false
            }
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                const res = await this.$axios.request({
                    url: `/job-intention/list/${this.resume_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === 'success'){
                    this.jobIntentionList = Object.assign([],[],res.data.jobIntentionList);
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
                this.editOpen(editDialog);
            },
            // 求职意向删除
            async remove(jobIntention) {
                const res = await this.$axios.request({
                    url: `/job-intention/delete`,
                    method: "delete",
                    data: jobIntention
                })
                console.log(res);
                this.initData();
            },
            // 提交表单
            submitForm(formName, editDialog) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$axios.request({
                            url: `/job-intention/saveOrUpdate`,
                            method: "post",
                            data: this.jobIntentionForm
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
                for (const key of Object.keys(this.jobIntentionForm)) {
                    if(key !== "resume_id") {
                        this.jobIntentionForm[key] = "";
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
        .job-intention-wrapper{
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
        }
    }
    .editDialog{
        padding: 30px 40px;
        background: @editBackground;
    }
    
    .resume-content{
        font-size: 16px;
        > div + div{
            margin-top: 40px;
        }
        .job-intention{
            .position-icon{
                font-size: 20px;
                margin-right: 16px;
            }
            .el-divider{
                margin: 0 16px;
            }
        }
    }
</style>