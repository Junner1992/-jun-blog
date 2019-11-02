const Koa = require('koa')
const config = require('./config')
const network = require('./libs/network')
const render = require('koa-art-template');

let server = new Koa();

(async ()=>{

    server.context.db = await require('./libs/mysql');  
   // server.context.redis = require('./libs/redis');

    //全局错误处理
    await require('./libs/error')(server)

    //session
    await require('./libs/session')(server);

    //router
    server.use(require('./router'));

    //模板引擎
    render(server, require('./libs/art-template'));


    server.listen(config.port ,()=>{
        network.forEach(ip =>{
            console.log(`server runing at ${ip}:${config.port}`)
        })
    })

})()














