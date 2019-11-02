const mysql = require('../libs/mysql');
const md5 = require('../libs/md5');
const readline = require('../libs/readline');

(async () => {
  let db = await mysql;

  while (1) {
    let name = await readline.questionAsync('请输入用户名：')

    if (!name) {
      break;
    }
    //检查
    let rows = await db.query("SELECT * FROM admin_table WHERE username=?", [name])

    if (rows.length > 0) {
      console.log('该账户已存在:' + name)
    } else {
      let pass = await readline.questionAsync('请输入密码：')

      await db.query("INSERT INTO admin_table (username,password) VALUES(?,?)", [name, md5(pass)])
      console.log('管理员账号添加成功')
    }
  }

  readline.close()

})()