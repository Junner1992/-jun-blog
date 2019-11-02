const fs = require('promise-fs')
const config = require('../config')

module.exports = async server=>{
  let error_404 = '',
      error_500 = '';

  try{
      error_404 = await fs.readFile(config.errors_404);
      error_404 = error_404.toString()
  }catch(e){
      console.log('read 404 file error');
  }
  try{
      error_500 = await fs.readFile(config.errors_500);
      error_500 = error_500.toString()
  }catch(e){
      console.log('read 500 file error');
  }

  server.use(async (ctx,next)=>{
      try{
          await next()
          if(!ctx.body){
              ctx.status = 404
              ctx.body = error_404 || 'Not Found';
          }
      }catch(e){
          ctx.status = 500;
          ctx.body = error_500 || 'Internal Server Error';
          console.error(e)
      }
  })
}