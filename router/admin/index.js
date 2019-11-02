const Router = require('koa-router');
let router = new Router();

router.use('', require('./login'))
router.use('',require('./news'))
router.use('',require('./blog'))
router.use('',require('./shortcuts'))
// router.use('',require('./msgs'))


module.exports = router.routes();
