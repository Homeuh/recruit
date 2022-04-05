<template>
    <div></div>
</template>

<script>
export default {
    name: "ReloadCurRoute",
    created() {
        const path = this.$route.query.path;
        this.$router.push(path);
    }
}
</script>

<style scoped>

</style>