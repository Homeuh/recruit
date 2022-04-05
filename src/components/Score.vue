<template>
  <div class="score">
    <el-rate :value="score" :disabled="disabled" :disabled-void-color="disabledColor"></el-rate>
  </div>
</template>

<script>
export default {
    name: "Score",
    props: {
        value: {
            type: Number,
            required: true
        },
        disabled: {
            type: Boolean,
            default: true
        },
        disabledColor: {
            type: String,
            default: "#EFF2F7"
        }
    },
    data() {
        return {
            score: this.value ,
        }
    },
}
</script>

<style scoped>
.score{
    display: inline-block;
}
</style>