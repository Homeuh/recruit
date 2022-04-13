<template>
    <div class="show-resume">
      <Resume v-if="!resumeImg" :applicant_id="applicant_id" ref="resume" @completeUpdate:resume="resumePreview"/>
      <img v-else ref="resume_img" class="resume-img">
    </div>
</template>

<script>
    import Resume from "@/views/general/applicant/widget/Resume.vue";
    import html2canvas from "html2canvas";
    export default {
        name: "ShowResume",
        components: { Resume},
        props: {
            applicant_id: {
                type: String,
                required: true
            }
        },
        created() {
            this.$store.commit("setOnlyReadResume");
        },
        mounted() {
            this.resumePreview();
            // console.log(this.$refs.resume)
        },
        updated() {
            // console.log(this.$refs.img)
            this.$refs.resume_img.src = this.resumeImg;
        },
        destroyed() {
            this.$store.commit("recoverOnlyReadResume");
        },
        data() {
            return {
                resumeImg: ""
            }
        },
        methods: {
            // 简历转换为base64图片
            resumePreview(isComplete) {
                if(isComplete){
                    this.$nextTick(() =>{
                        html2canvas(this.$refs.resume.$el, {
                            background: null,
                        }).then((canvas) => {
                            console.log(canvas)
                            //将canvas转为base64格式
                            // console.log(canvas.toDataURL("image/png"));
                            this.resumeImg = canvas.toDataURL("image/png");
                        });
                    })
                }
            },
        },
    }
</script>

<style scoped>
    .resume-detail{
        position: absolute;
        top: -100vw;
        transform: translateY(-100%);
    }
    .resume-img{
        width: 100%;
    }
</style>