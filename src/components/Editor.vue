<!--
    封装一个富文本编辑器，父组件传递一个回调函数，在子组件内容修改时触发
-->
<template>
  <div id="wangeditor" style="height: 100%">
    <div ref="editor"></div>
  </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
        components: {},
        props: {
            placeholder: String,
            content: String,
            menus: Array,
            showFullScreen: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                editor: null,
                editorContent: this.content
            };
        },
        created() {
            this.contentTransform();
        },
        mounted() {
            this.editor = new E(this.$refs.editor);
            // 配置菜单
            if(this.menus) {
                this.editor.config.menus = this.menus;
            }
            // 是否可全屏展示
            this.editor.config.showFullScreen = this.showFullScreen
            this.editor.config.onchange = html => {
                this.editorContent = html;
                // console.log(this.editorContent)
                this.$emit("update:content",this.editorEvent());
            };
            this.editor.config.placeholder = this.placeholder;
            this.editor.config.pasteIgnoreImg = true;
            // 配置粘贴文本的内容处理
            this.editor.create();
            this.editorContent && this.editor.txt.html(this.editorContent);
        },
        beforeDestroy() {
            // 销毁编辑器
            this.editor.destroy()
            this.editor = null
        },
        methods: {
            // 切换为文本编辑器前，传递内容 转换 格式
            contentTransform() {
                let str = "";
                // 将\n的元数据 修改为 富文本编辑器所展示的ul无序列表数据 / ol有序列表数据
                if(/\n/.test(this.editorContent)){
                    if(/\d\./.test(this.editorContent)){
                        str += "<ol>"
                        this.editorContent = this.editorContent.replace(/\d\./g, "");
                        this.editorContent.split("\n").forEach(item => {
                            str += `<li>${item}</li>`
                        })
                        str += "</ol>";
                    } else {
                        str = "<ul>"
                        this.editorContent.split("\n").forEach(item => {
                            str += `<li>${item}</li>`
                        })
                        str += "</ul>";
                    }
                } else {
                    str = this.editorContent;
                }
                return this.editorContent = str;
            },
            getFormatText(children,tag) {
                // console.log(tag);
                let formatText = "";
                children.forEach((item,index) => {
                    if(tag === "ol"){
                        formatText += Object.prototype.toString.call(item) !== '[object Object]' ? `${item}\n` : `${index + 1}. ${this.getFormatText(item.children)}`;
                    } else {
                        formatText += Object.prototype.toString.call(item) !== '[object Object]' ? `${item}\n` : this.getFormatText(item.children);
                    }
                    
                })
                return formatText;
            },
            // 文本编辑器回调内容 格式化
            editorEvent() {
                let formatText = "";
                this.editor.txt.getJSON().forEach(item => {
                    if(this.editor.txt.text()){
                         if(item.tag === "br"){
                            formatText += "\n";
                        } else{
                            // console.log(item.tag);
                            formatText += this.getFormatText(item.children, item.tag);
                        }
                    }
                })
                console.log(formatText);
                return formatText;
            }
        },
    }
</script>
<style scoped>
    #wangeditor >>> .w-e-toolbar{
        z-index: 101 !important;
    }
    #wangeditor >>> .w-e-text-container{
        z-index: 100 !important;
    }
</style>