<template>
    <div class="resume-detail">
      <!-- 基本信息 -->
      <ResumeBaseInfo />
      <div class="resume-content">
        <!-- 个人优势 -->
        <ResumeSelfEvaluation />
        <!-- 求职意向 -->
        <ResumeJobIntention />
        <!-- 工作经验 -->
        <ResumeJobExperience />
        <!-- 项目经验 -->
        <ResumeProjectExperience />
        <!-- 教育经历 -->
        <ResumeEducation />
        <!-- 专业技能 -->
        <ResumeSkill />
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
        }
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