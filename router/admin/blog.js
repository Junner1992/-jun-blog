const Router = require('koa-router');
const getTime = require('../../libs/getTime')
const md5 = require('../../libs/md5')
const { post, upload } = require('../../libs/body')

let router = new Router();

//获取
router.get('/blog', async ctx => {
  await ctx.redirect('/admin/blog/1')
})
const page_size = 5;
router.get('/blog/:page', async ctx => {

  let { page } = ctx.params
  page = parseInt(page)
  if (isNaN(page) || page < 1) page = 1

  let data = await ctx.db.query("SELECT * FROM blogs_table ORDER BY ID DESC LIMIT ?,?", [(page - 1) * page_size, page_size])
  let rows = await ctx.db.query(`SELECT count(*) AS c FROM blogs_table`)
  let count = rows[0].c;
  let page_count = Math.ceil(count / page_size)

  data.forEach(item => {
    item.createTime = getTime(item.createTime)
  })
  await ctx.render('admin/blog.art', { act_num: 1, data,page, page_count })
})

//添加
router.get('/addblog',async ctx=>{
  await ctx.render('admin/addBlog.art')
})
router.post('/blog', ...upload(), async ctx => {
  let { title, context, tip } = ctx.request.fields

  let blog_id = md5(Math.round(Math.random() * 99999).toString())

  await ctx.db.query("INSERT INTO blogs_table (title,context,tip,blog_id) VALUES(?,?,?,?)", [title, context, tip, blog_id])

  await ctx.redirect('/admin/blog')
})

//修改
router.get('/editblog/:id',async ctx=>{
  let { id } = ctx.params
  let rows = await ctx.db.query("SELECT * FROM blogs_table WHERE ID=?",[id])
  await ctx.render('admin/editBlog.art',{data:rows[0],id})
})
router.post('/editblog/:id', post(), async ctx => {

  let { id } = ctx.params

  let { title, context, tip } = ctx.request.fields

  await ctx.db.query("UPDATE blogs_table SET title=?,context=?,tip=? WHERE ID=?", [title, context, tip, id])

  await ctx.redirect('/admin/blog')
})

//删除
router.get('/delblog/:id', async ctx => {
  let { id } = ctx.params;

  let ids = JSON.parse(id)

  ids.map(async item => {
    await ctx.db.query(`DELETE FROM blogs_table WHERE ID=?`, [item])
  })

  await ctx.redirect('/admin/blog/1')
})


module.exports = router.routes();
