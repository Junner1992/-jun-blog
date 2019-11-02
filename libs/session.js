const session = require('koa-session')
const fs = require('promise-fs')
const config = require('../config')
let client = require('./redis');
module.exports = async (server)=>{

    try {
        let buffer = await fs.readFile(config.key_path);
        server.keys = JSON.parse(buffer.toString())
    } catch (e) {
        console.log('读取失败，请先生成key');
        return
    }
    const store = {
        async get(key, maxAge) {
            let data = await client.getAsync(key);

            if (!data) return {};

            try {
                return JSON.parse(data)
            } catch (e) {
                return {}
            }
        },
        async set(key, session, maxAge) {
            //有效期
            await client.psetexAsync(key, maxAge, JSON.stringify(session));
        },
        async destroy(key) {
            await client.delAsync(key);
        }
    }
    server.use(session({
        maxAge: config.maxAge,
        renew: false,
       // store
    }, server))
}
