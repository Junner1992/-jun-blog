const path = require('path')
module.exports = {
    port: 8082, //端口
    md5_key: 'asdjkHSALKDJKASLa/./asdas.dsa%#(#)*$#))Q(#$*%*%)#AHDJKASHD',

    //数据库
    db_host: 'localhost',
   // db_host: '124.156.100.136',
    db_port: 3306,
    db_user: 'root',
    db_pass: 'w7410951',
    db_name: 'blog',

    //redis
    redis_host: 'localhost',
    // redis_host:'124.156.100.136',
    redis_port: 6379,
    // redis_pass:undefined,

    //upload
    uploadDir: path.resolve(__dirname, 'upload'),

    //key
    key_count: 1024,
    key_len: 1024,
    key_path: path.resolve(__dirname, '.keys'),

    //session
    maxAge: 86400 * 1000,

    //static_path
    static_path: path.resolve(__dirname, 'static'),

    //errors
    errors_404: path.resolve(__dirname, 'errors/404.html'),
    errors_500: path.resolve(__dirname, 'errors/500.html')

}
