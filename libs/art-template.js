const path = require('path');

module.exports = {
  //模板目录
  root: path.resolve(__dirname, '../template'),
  //模板扩展名
  extname: 'art',
  debug: process.env.NODE_ENV !== 'production'
}