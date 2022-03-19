// 路由插件：可以直接访问二级路由，需要父级路由调用函数renderCurRoute( () => import() )

export default function renderCurRoute (component) {
    return {
        name: "renderCurRoute",
        computed: {
            showChild() {
                const deepestMatchedRoute = this.$route.matched[this.$route.matched.length - 1];
                return deepestMatchedRoute.instances.default !== this;
            }
        },
        render(h) {
            return this.showChild ? h('router-view') : h(component);
        }
    }
}