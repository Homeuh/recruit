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
            currentOption: this.label,
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
        min-width: 100px;
        display: inline-block;
        i{
            height: 40px;
            line-height: 40px;
            float: right;
            margin-left: 15px;
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
        max-height: 288px;
        overflow: auto;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        position: absolute;
        margin-top: 2px;
        top: 100%;
        left: 0;
        z-index: 2;
        ul{
            li{
                padding: 0 15px;
                min-width: 120px;
                white-space: nowrap;
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

/*滚动条一键化*/
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
}
::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    &:hover{
        background: rgba(0, 0, 0, 0.2);
    }
}
::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 10px;
    background   : transparent;
}

</style>