const Router = require('koa-router');
const { post } = require('../../libs/body')
const md5 = require('../../libs/md5')
const { admin } = require('../../libs/regs')
let router = new Router();

router.get('/login', async ctx => {
  await ctx.render('admin/login.art', { error: null, username: '', password: '' })
})

router.post('/login', post(), async ctx => {

  let { username, password } = ctx.request.fields

  username = username.toLowerCase(); //转换为大写

  async function render(msg) {
    await ctx.render('admin/login.art', { error: msg, username, password })
  }
  //数据校验 

  if (!admin.username.test(username)) {
    await render('用户名格式不对，4-32个字母，数字')
    return
  }
  if (!admin.password.test(password)) {
    await render('密码格式不对，6-32个字母，数字')
    return
  }

  //1.用户存在？
  let rows = await ctx.db.query("SELECT ID,password FROM admin_table WHERE username=?", [username])

  if (rows.length == 0) {
    await await render('此用户不存在')
  } else {
    //2.密码校验
    if (rows[0].password == md5(password)) {
      ctx.session['adminID'] = rows[0].ID
      ctx.redirect('/admin/news')
    } else {
      await render('用户名或密码错误')
    }
  }
})

module.exports = router.routes();