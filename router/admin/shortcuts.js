const Router = require('koa-router');
const { post, upload } = require('../../libs/body')

let router = new Router();

//获取
router.get('/shortcuts', async ctx => {
  ctx.redirect('/admin/shortcuts/1')
})
const page_size = 5;
router.get('/shortcuts/:page', async ctx => {

  let { page } = ctx.params
  page = parseInt(page)
  if (isNaN(page) || page < 1) page = 1

  let data = await ctx.db.query("SELECT * FROM shortcuts_table ORDER BY ID DESC LIMIT ?,?", [(page - 1) * page_size, page_size])
  let rows = await ctx.db.query(`SELECT count(*) AS c FROM shortcuts_table`)
  let count = rows[0].c;
  let page_count = Math.ceil(count / page_size)


  await ctx.render('admin/shortcuts.art', { act_num: 2, data, page, page_count  })
})

//添加
router.post('/shortcuts', post(), async ctx => {
  let { title, shortcuts_desc, shortcuts_url, label} = ctx.request.fields

  await ctx.db.query("INSERT INTO shortcuts_table (title,shortcuts_desc,shortcuts_url,label) VALUES(?,?,?,?)", [title,shortcuts_desc,shortcuts_url,label])

  await ctx.redirect('/admin/shortcuts')
})

//修改
router.post('/editshortcuts/:id', post(), async ctx => {

  let { id } = ctx.params

  let { title, shortcuts_desc, shortcuts_url, label} = ctx.request.fields

  await ctx.db.query("UPDATE shortcuts_table SET title=?,shortcuts_desc=?,shortcuts_url=?,label=? WHERE ID=?", [title, shortcuts_desc, shortcuts_url, label, id])

  await ctx.redirect('/admin/shortcuts')
})

//删除
router.get('/delshortcuts/:id', async ctx => {
  let { id } = ctx.params;

  let ids = JSON.parse(id)

  ids.map(async item => {
    await ctx.db.query(`DELETE FROM shortcuts_table WHERE ID=?`, [item])
  })

  await ctx.redirect('/admin/shortcuts')
})


module.exports = router.routes();
