<template>
    <div class="add-tag">
      <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            type="info"
            :disable-transitions="false"
            @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" icon="el-icon-circle-plus-outline" @click="showInput" >添加</el-button>
    </div>
</template>

<script>
    export default {
        name: "AddTag",
        props: {
            tagList: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                dynamicTags: this.tagList,
                inputVisible: false,
                inputValue: ''
            };
        },
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                this.$emit("update:tagList", this.dynamicTags);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                    this.$emit("update:tagList", this.dynamicTags);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style scoped>
  .el-tag{
      margin-right: 20px;
  }
  .el-tag:last-of-type{
      margin-right: 30px;
  }
</style>