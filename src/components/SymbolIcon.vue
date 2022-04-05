<!--
    iconfont多色图标组件封装，传递symbol代码值即可
 -->
<template>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: "SymbolIcon",
    props: {
        iconClass: {
            type: String,
            required: true
        }
    },
    computed: {
        iconName() {
            return `#${this.iconClass}`
        }
    }
}
</script>

<style scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>