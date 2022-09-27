module.exports = {
    //基本路径
    publicPath: '/',
    //输出文件目录
    outputDir: 'dist',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    //开发服务器配置
    devServer: {
        port: 8088,
        proxy: {
            '/api': {
                target: 'http://120.78.69.29:8085/recruit',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //实际请求去掉/api以空字符串代替
                }
            },
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '万忧招聘'
        }
    }
};