<!-- 
    地图快捷指令，全局开发环境引入(上线需修改)
-->

<template>
    <div class="address">
        <el-input id='tipinput' v-model="value" :placeholder="placeholder"/>
    </div>
</template>

<script>
    export default {
        props: {
            address: {
                type: String,
                default: ""
            },
            placeholder: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                value: this.address
            }
        },
        mounted() {
            //输入提示
            var auto = new AMap.Autocomplete({
                input: "tipinput"
            });
            AMap.event.addListener(auto, "select", e => {
                console.log(e.poi.district + e.poi.address)
                console.log(e);
                this.value = e.poi.district + e.poi.address + e.poi.name;
                this.value = this.value.replace(/.+省/,"");
                this.$emit("update:address", this.value);
            });//注册监听，当选中某条记录时会触发
        }
    }
</script>

<style scoped>
.address{
    display: flex;
    align-items: center;
}
input{
    width: 239px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #E3E3E3;
    outline: none;
    font-size: 14px;
    padding-left: 14px;
}
input:hover{
    border-color: #c0c4cc;
}
input:focus{
    border-color: #238AFE;
}
.el-icon-location-outline{
    margin-left: 20px;
    font-size: 22px;
    color: #333333;
}
</style>