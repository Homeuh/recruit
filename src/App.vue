<template>
  <div id="app">
    <!-- 顶部导航栏 -->
<!--    <GeneralTopBar :showPosition="false"/>-->
    <router-view></router-view>
    <!-- 底部信息栏 -->
<!--    <GeneralFooter />-->
  </div>
</template>

<script>
// import GeneralTopBar from "@/components/GeneralTopBar"
// import GeneralFooter from "@/components/GeneralFooter"
export default {
  name: 'App',
  components: {
      // GeneralTopBar, GeneralFooter
  }
}
</script>

<style>
</style>
