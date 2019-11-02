const Router = require('koa-router');
const static = require('../../libs/contentStatic')
const getTime = require('../../libs/getTime')
const { upload,post } = require('../../libs/body')

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

let router = new Router();

//起始页
router.get('/', async ctx=>{
    await ctx.render('web/start.art')
})

//首页 home
router.get('/home',async ctx=>{
    let data = await ctx.db.query("SELECT * FROM news_table ORDER BY ID DESC ")

    data.forEach(item => {
        item.createTime = getTime(item.createTime)
    })

    await ctx.render('web/index.art', { data,tab_index: 0 })
})

//博客列表
router.get('/blog',async ctx=>{
    ctx.redirect('/blog/1')
})
const page_size = 5;
router.get('/blog/:page',async ctx=>{

    let { page } = ctx.params
    page = parseInt(page)
    if (isNaN(page) || page < 1) page = 1

    let data = await ctx.db.query("SELECT * FROM blogs_table ORDER BY ID DESC LIMIT ?,?", [(page - 1) * page_size, page_size])

    let rows = await ctx.db.query(`SELECT count(*) AS c FROM blogs_table`)
    let count = rows[0].c;
    let page_count = Math.ceil(count / page_size)

    data.forEach(item =>{
        item.createTime = getTime(item.createTime)
        item.context = entities.decode(item.context)
    })

    await ctx.render('web/blog_list.art', { data,page,page_count,tab_index: 1 })
})

//文章页面
router.get('/article/:id', async ctx => {
    let rows = await ctx.db.query("SELECT * FROM blogs_table WHERE blog_id=?", [ctx.params.id])

    rows[0].createTime = getTime(rows[0].createTime)
    rows[0].context = entities.decode(rows[0].context)

    await ctx.render('web/blog_content.art', { data:rows[0]});
});

//快捷方式
router.get('/shortcuts',async ctx=>{
    ctx.redirect('/shortcuts/all')
})
router.get('/shortcuts/:label',async ctx=>{

    let {label} = ctx.params
    
    let data
    if(label == 'all'){
        data = await ctx.db.query("SELECT * FROM shortcuts_table")
    }else{
        data = await ctx.db.query(`SELECT * FROM shortcuts_table WHERE label=?`,[label])
    }
    

    await ctx.render('web/shortcuts.art', { data,label,tab_index: 2 })
})

//留言墙
router.get('/msg',async ctx=>{

    let data = await ctx.db.query("SELECT * FROM msg_table ORDER BY ID DESC")

    await ctx.render('web/msg.art',{data})
})
//添加留言
router.post('/msg', post(),async ctx=>{
    let { name, value } = ctx.request.fields
    await ctx.db.query("INSERT INTO msg_table (name,value) VALUES(?,?)", [name,value])
    ctx.body = 'ok'
})


module.exports = router.routes();