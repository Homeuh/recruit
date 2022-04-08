<template>
    <div class="preview-picture">
      <!-- 预览功能 -->
      <el-image-viewer
            v-if="previewDialogVisible"
            :url-list="[resumeImg]"
            :on-close="closeViewer"/>
      <!-- 绝对定位隐藏 -->
      <Resume v-if="previewResume" :applicant_id="applicant_id" ref="resume" style="position: absolute; top: -100%; transform: translateY(-100%)"/>
      <!-- 绝对定位隐藏 -->
      <ProfessionDetail v-if="previewProfession" ref="profession" style="position: absolute; top: -100%; transform: translateY(-100%)"/>
    </div>
</template>

<script>
    import Resume from "@/views/general/applicant/widget/Resume.vue";
    import ProfessionDetail from "@/views/general/profession/ProfessionDetail.vue";
    import ElImageViewer from "element-ui/packages/image/src/image-viewer";
    import html2canvas from 'html2canvas';
    export default {
        name: "PreviewPicture",
        props: {
            preview: {
                type: Boolean,
                required: true
            },
            isResume: {
                type: Boolean,
                default: false
            },
            isProfession: {
                type: Boolean,
                default: false
            },
            applicant_id: {
                type: String,
                default: ""
            },
        },
        components: {
            Resume,
            ProfessionDetail,
            ElImageViewer
        },
        created() {
            this.$store.commit("setOnlyReadResume");
        },
        mounted() {
            // console.log(this.preview)
            this.resumePreview();
        },
        destroyed() {
            this.$store.commit("recoverOnlyReadResume");
        },
        data() {
            return {
                previewDialogVisible: this.preview,
                previewResume: this.isResume,
                previewProfession: this.isProfession,
                resumeImg: ""
            }
        },
        methods: {
            // 简历预览
            resumePreview() {
                let obj = "";
                if(this.isResume) {
                    obj = this.$refs.resume.$el;
                }
                if(this.isProfession) {
                    obj = this.$refs.profession.$el;
                }
                html2canvas(obj, {
                    background: null,
                    // width: 972
                }).then((canvas) => {
                    console.log(canvas);
                    // 截图成功后销毁组件
                    // this.previewResume = false;
                    // this.previewProfession = false;
                    //将canvas转为base64格式
                    // const imgUrl = canvas.toDataURL("image/png");
                    // console.log(imgUrl);
                    this.resumeImg = canvas.toDataURL("image/png");
                });

                this.stopMove();
                this.$emit("update:preview", true);
            },
            // 停止页面滚动
            stopMove () {
                let m = function(e){e.preventDefault()}
                document.body.style.overflow = 'hidden'
                document.addEventListener("touchmove",m,{ passive: false }) // 禁止页面滑动
            },
            //开启页面滚动
            move () {
                let m =function(e){e.preventDefault()}
                document.body.style.overflow = 'auto' // 出现滚动条
                document.removeEventListener("touchmove", m, { passive: true })
            },
            // 关闭预览
            closeViewer() {
                this.move();
                this.$emit("update:preview", false);
            }
        },
    }
</script>

<style scoped>

</style>