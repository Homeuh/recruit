<template>
    <div class="resume-detail" v-if="resume_id">
      <!-- 基本信息 -->
      <ResumeBaseInfo :resume_id="resume_id" @updatePart:resume="resumeProgress += $event"/>
      <div class="resume-content">
        <!-- 个人优势 -->
        <ResumeSelfEvaluation :resume_id="resume_id" @updatePart:resume="resumeProgress += $event"/>
        <!-- 求职意向 -->
        <ResumeJobIntention :resume_id="resume_id" @updatePart:resume="resumeProgress += $event"/>
        <!-- 工作经验 -->
        <ResumeJobExperience :resume_id="resume_id" @updatePart:resume="resumeProgress += $event"/>
        <!-- 项目经验 -->
        <ResumeProjectExperience :resume_id="resume_id" @updatePart:resume="resumeProgress += $event"/>
        <!-- 教育经历 -->
        <ResumeEducation :resume_id="resume_id" @updatePart:resume="resumeProgress += $event"/>
        <!-- 专业技能 -->
        <ResumeSkill :resume_id="resume_id" @updatePart:resume="resumeProgress += $event"/>
      </div>
    </div>
</template>

<script>
    import ResumeBaseInfo from "./ResumeBaseInfo.vue";
    import ResumeSelfEvaluation from "./ResumeSelfEvaluation.vue";
    import ResumeJobIntention from "./ResumeJobIntention.vue";
    import ResumeJobExperience from "./ResumeJobExperience.vue";
    import ResumeProjectExperience from "./ResumeProjectExperience.vue";
    import ResumeEducation from "./ResumeEducation.vue";
    import ResumeSkill from "./ResumeSkill.vue";
    export default {
        name: "Resume",
        components: {
            ResumeBaseInfo,
            ResumeSelfEvaluation,
            ResumeJobIntention,
            ResumeJobExperience,
            ResumeProjectExperience,
            ResumeEducation,
            ResumeSkill
        },
        props: {
            applicant_id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                resume_id: "",
                // 简历模块获取数据进度：有7部分
                resumeProgress: 0,
            }
        },
        created() {
            console.log(this.applicant_id);
            this.getResumeId();
        },
        watch: {
            // 时刻监听子组件数据更新完毕的通知，如果全部更新完毕，向父组件告知已完全更新完毕，用于预览简历
            resumeProgress: function(newVal){
                if(newVal === 7){
                    this.$emit("completeUpdate:resume", true);
                }
            }
        },
        methods: {
            async getResumeId() {
                const res = await this.$axios.request({
                    url: `/resume/getId/${this.applicant_id}`,
                    method: "get",
                });
                console.log(res);
                if(res.msg === "success") {
                    this.resume_id = res.data.resume_id;
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    @background: #fff;
    @borderColor: #dcdfe6;
    
    .resume-detail{
        min-width: 1188px;
        background: @background;
        border: 1px solid @borderColor;
        > div{
            padding: 50px;
        }

        .resume-content{
            font-size: 16px;
            > div + div{
                margin-top: 40px;
            }
        }
    }
</style>