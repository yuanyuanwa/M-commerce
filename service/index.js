const Koa=require('koa')
const { connect, initSchemas } = require('./database/init.js')
const app=new Koa()
const mongoose=require('mongoose')

const Router=require('koa-router')

let user=require('./appApi/user')
let home=require('./appApi/home')

//装载所有子路由
let router=new Router()

router.use('/ss',user.routes())//ss访问路由的路劲
router.use('/hh',home.routes())//hh
//egg.js

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


// ;(async()=>{
//     await connect()
//     //添加数据,再次插入会失败
//     initSchemas()
//     const User=mongoose.model('User')
//     let oneUser=new User({userName:'yuanyuan5',password:'123456'})
//     oneUser.save().then(()=>{
//         console.log('插入成功');
//     })

//     //查找数据
//     // let user=await User.find({'userName':'yuanyuan'}).exec()
//     let user=await User.findOne({'userName':'yuanyuan122'}).exec()
//     console.log('----------------------------------');
//     console.log(user);
// })()


//如果把所有路由都写在这里会很多，所有需要进行模块化
app.use(async(ctx)=>{
    ctx.body='<h1>hello</h1>'
})

app.listen(3000,()=>{
    console.log('beging');
})

