const os = require('os') //系统
const config = require('../config');

let arr = [];
let systemConfigs = os.networkInterfaces() //网络接口

for (let name in systemConfigs) {
    systemConfigs[name].forEach(item => {
        if (item.family == 'IPv4') {
            // console.log(item.address)
            arr.push(item.address)
        }
    })
}

module.exports = arr