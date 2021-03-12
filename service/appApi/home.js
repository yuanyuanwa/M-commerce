const Router =require('koa-router')

let router=new Router()
router.get('/',async(cxt)=>{
    cxt.body='这是home'
})

module.exports=router