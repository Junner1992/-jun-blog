const Router = require('koa-router');
const getTime = require('../../libs/getTime')
const { post, upload } = require('../../libs/body')

let router = new Router();

//获取
router.get('/news',async ctx=>{
  let data = await ctx.db.query("SELECT * FROM news_table ORDER BY ID DESC")

  data.forEach(item => {
      item.createTime = getTime(item.createTime)
  })
  await ctx.render('admin/news.art',{act_num:0,data})
})

//添加
router.post('/news',post(),async ctx=>{
  let { title, context, tip } = ctx.request.fields

  ctx.db.query("INSERT INTO news_table (title, context, tip) VALUES(?,?,?)", [title, context, tip])

  ctx.redirect('/admin/news')
})

//修改
router.post('/editnews/:id',post(),async ctx=>{

  let { id } = ctx.params

  let { title, context, tip } = ctx.request.fields

  await ctx.db.query("UPDATE news_table SET title=?,context=?,tip=? WHERE ID=?", [title, context, tip,id])

  ctx.redirect('/admin/news')
})

//删除
router.get('/delnews/:id',async ctx=>{
  let { id } = ctx.params;

  let ids = JSON.parse(id)

  ids.map(async item=>{
    await ctx.db.query(`DELETE FROM news_table WHERE ID=?`, [item])
  })

  ctx.redirect('/admin/news')
})


module.exports = router.routes();
