<template>
    <el-dialog
          class="upload-avatar"
          :title="title"
          :visible="visible" @update:visible="visibleSync"
          width="30%">
      <div class="ready-upload" v-if="!selectedAvatar">
        <div class="default-avatar" v-if="isAvatar">
          <img v-for="(avatar,index) in defaultAvatar" :key="avatar.name + index"
               :src="avatar.url" :alt="avatar.name" :title="avatar.name"
               style="width: 80px; height: 80px; border-radius: 50%; cursor: pointer"
               @click="changeAvatar(avatar.name)"/>
        </div>
        <input type="file" id="avatar-box"
               accept=".png, .jpg, .jpeg"
               @change="getFile"
               hidden
        />
        <div class="upload-wrapper" @click="userUpload">
          <slot name="body-notice">
            <div>&nbsp;+&nbsp;点击上传头像</div>
          </slot>
          <div>仅支持JPG、PNG、JPEG格式</div>
        </div>
      </div>
      <div class="upload-over" v-else>
        <img :src="selectedAvatar" style="width: 300px; height: 300px; border-radius: 50%;"/>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "UploadAvatar",
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: "请选择头像并上传"
            },
            // 接口对应表名：求职者->applicant，招聘官->recruiter，公司->company（有logo和营业执照，暂时不写）
            tablePath: {
                type: String,
                default: "applicant"
            },
            // 默认是头像上传
            isAvatar: {
                type: Boolean,
                default: true,
            },
            // 接收变量
            avatar: {
                type: String,
                default: "",
            },
            // 是否选中后立即上传，作为注册时和修改时的选择
            uploadDirectly: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                selectedAvatar: this.avatar,
                file: "",
                defaultAvatar: [
                    { url: require("@/image/avatar/boy-1.png"), name: "boy-1.png"},
                    { url: require("@/image/avatar/boy-2.png"), name: "boy-2.png"},
                    { url: require("@/image/avatar/boy-3.png"), name: "boy-3.png"},
                    { url: require("@/image/avatar/girl-1.png"), name: "girl-1.png"},
                    { url: require("@/image/avatar/girl-2.png"), name: "girl-2.png"},
                    { url: require("@/image/avatar/girl-3.png"), name: "girl-3.png"},
                ]
            }
        },
        methods: {
            visibleSync(event) {
                this.$emit('update:visible', event);
            },
            // 上传默认头像
            async changeAvatar(avatarName) {
                // console.log(avatarName);
                if(this.uploadDirectly){
                    const res = await this.$axios.request({
                        url: `/${this.tablePath}/uploadDefault?avatarName=${avatarName}&login_id=${this.$store.state.login_id}`,
                        method: "post"
                    })
                    console.log(res);
                    if(res.msg === "success"){
                        this.$message.success("上传成功");
                        this.$emit('update:visible', false);
                        this.$emit("update:data", true);
                    }
                } else {
                    // 告诉父组件选择的是默认头像
                    this.$emit("is-default", true);
                    // 回调传递默认头像名称（数据库表存储）
                    this.$emit("update:avatarName", avatarName);
                    // 回调修改头像路径
                    this.$emit("update:avatar", require("@/image/avatar/" + avatarName));
                    this.$emit('update:visible', false);
                }
            },
            // 获取formData数据
            getFile(event) {
                let fileObj = event.target.files[0]
                if (window.createObjcectURL !== undefined) {
                    this.selectedAvatar = window.createOjcectURL(fileObj);
                } else if (window.URL !== undefined) {
                    this.selectedAvatar = window.URL.createObjectURL(fileObj);
                } else if (window.webkitURL !== undefined) {
                    this.selectedAvatar = window.webkitURL.createObjectURL(fileObj);
                }
                console.log(this.selectedAvatar)
                let data = new FormData();
                data.append("file", fileObj);
                this.file = data;
            },
            // 头像上传提交
            async submit() {
                console.log(this.file.get("file"))
                if(this.uploadDirectly){
                    const res = await this.$axios.request({
                        url: `/${this.tablePath}/upload/${this.$store.state.login_id}`,
                        method: "post",
                        data: this.file
                    })
                    console.log(res)
                    if(res.msg === "success"){
                        this.$message.success("上传成功");
                        this.$emit('update:visible', false);
                        this.$emit("update:data", true);
                    }
                } else {
                    // 如果是选择的自定义头像，向父组件传递头像文件
                    this.$emit("update:avatarFile", this.file);
                    // 回调修改头像路径
                    this.$emit("update:avatar", this.selectedAvatar);
                    this.$emit('update:visible', false);
                }
            },
            // 用户上传框点击
            userUpload() {
                document.getElementById('avatar-box').click()
            }
        },
    }
</script>

<style lang="less" scoped>
    .upload-avatar{
        /deep/ .el-dialog__header{
            //padding: 0;
            span{
                display: inline-block;
                height: 50px;
                line-height: 50px;
                &:first-child{
                    font-weight: 400;
                    font-size: 17px;
                }
            }
            i{
                color: #dcdfe6;
                transition: background-color .2s;
                &:hover{
                    color: #fff;
                    background: rgba(0,0,0,.1);
                }
            }
        }
        /deep/ .el-dialog__body{
            text-align: center;
        }
    }
    .default-avatar{
        display: grid;
        grid-template-columns: repeat(3, 80px);
        gap: 30px;
        justify-content: center;
    }
    .ready-upload{
        /deep/ .upload-wrapper{
            display: inline-block;
            margin: 60px 0;
            padding: 30px 80px;
            border: 1px solid #dcdfe6;
            text-align: center;
            cursor: pointer;
            div:first-of-type{
                color: #2BB594;
                line-height: 45px;
            }
        }
    }
    .upload-over{
        display: inline-block;
        img{
            display: block;
        }
        .el-button{
            background: #2BB594;
            &:hover,&:focus{
                opacity: 1;
            }
            margin-top: 60px;
            padding: 0 30px;
            font-size: 18px;
        }
    }
</style>