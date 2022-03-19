// 设置页面主内容最小高度
export default function setMinHeight(self, el) {
    // 获取侧栏高度：包括margin值
    const aside = self.$refs.aside;
    const outerHeight = self.$(aside).outerHeight(true);
    el.style.minHeight = outerHeight + "px";
    console.log(el.style.minHeight)
}