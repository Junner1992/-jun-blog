const Router = require('koa-router');
const send = require('koa-send')
const {uploadDir} = require('../config')

let router = new Router();

// 登录路由判断
router.use(async (ctx, next) => {
  let b = ctx.url.startsWith('/admin') //true
  if (b) {
    if (!ctx.session['adminID'] && ctx.url != '/admin/login') {
      ctx.redirect('/admin/login')
    } else {
      await next()
    }
  } else {
    await next()
  }
})

router.use('',require('./web'))
router.use('/admin',require('./admin'))

router.get('/upload/:img',async ctx=>{
  let {img} = ctx.params
  await send(ctx,img,{
    maxAge:10*86400*1000,
    immutable:true,
    root: uploadDir
  })
})

require('./static')(router);


module.exports = router.routes();
