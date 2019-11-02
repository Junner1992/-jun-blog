const static = require('koa-static')
const { static_path } = require('../config')

module.exports = function(router){
    //图片
    router.all(/\.(jpg|png|gif)$/i, static(static_path, {
        maxage: 60 * 86400 * 1000
    }))
    //css
    router.all(/\.css$/i, static(static_path, {
        maxage: 7 * 86400 * 1000
    }))
    //js
    router.all(/\.jsx?$/i, static(static_path, {
        maxage: 1 * 86400 * 1000
    }))
    //网页
    router.all(/\.(html|html|xhtml)$/i, static(static_path, {
        maxage: 1 * 86400 * 1000
    }))

    router.all('*', static(static_path, {
        maxage: 7 * 86400 * 1000
    }))
}