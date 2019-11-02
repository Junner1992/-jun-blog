module.exports = {
  admin: {
    // username 4-32位，字母，数字
    username: /^\w{4,32}$/,
    // password 6-32位
    password: /^\w{6,32}$/,
    title: /^.{6,32}$/
  },
  web: {

  }
}