const crypto=require('crypto')
const {md5_key} = require('../config')

function md5(data) {
  let obj = crypto.createHash('md5')
  obj.update(data)

  return obj.digest('hex')
}

module.exports = function (data) {
  return md5(md5(data) + md5_key)
}
