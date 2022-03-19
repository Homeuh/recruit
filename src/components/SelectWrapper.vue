<template>
  <div class="select-wrapper" ref="wrapper">
    <div class="select-label">
      {{ value }}
      <i class="el-icon-caret-bottom"></i>
    </div>
    <transition name="el-zoom-in-top">
      <div class="select-options" ref="options" v-show="isHover">
        <ul>
          <li v-for="(opt,index) in options" :key="opt + index"
              :class="{'is-active': currentOption === opt}"
              @click="handleClick(opt)"
          >{{ opt }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
    name: "SelectWrapper",
    props: {
        label: {
            type: String,
            default: ""
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        this.$refs.wrapper.onmouseenter = () => {
            this.isHover = true;
        }
        this.$refs.wrapper.onmouseleave = () => {
            this.isHover = false;
        }
    },
    data() {
        return{
            value: this.label,
            currentOption: "",
            isHover: false,
        }
    },
    methods: {
        handleClick(option) {
            this.value = this.currentOption = option;
            this.$emit("update:label", this.value);
            this.isHover = false;
        }
    }
}
</script>

<style lang="less" scoped>
.select-wrapper{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: inherit;
    position: relative;
    background: #ffffff;
    cursor: pointer;
    .select-label{
        width: 100px;
        min-width: 100px;
        display: inline-block;
        i{
            height: 40px;
            line-height: 40px;
            float: right;
            color: #999;
        }
        &::after{
            content: "";
            display: inline-block;
            width: 100%;
            height: 2px;
            background: transparent;
            position: absolute;
            top: 100%;
            left: 0;
        }
    }
    .select-options{
        position: absolute;
        margin-top: 2px;
        top: 100%;
        left: 0;
        z-index: 2;
        ul{
            li{
                padding: 0 15px;
                width: 120px;
                box-sizing: content-box;
                height: 32px;
                line-height: 32px;
                color: #8d92a1;
                background: #ffffff;
                &:hover{
                    background: #f5f7fa;
                }
                &.is-active{
                    color: #5dd5c8;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>