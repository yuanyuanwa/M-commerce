const Koa=require('koa')
const { connect, initSchemas } = require('./database/init.js')
const app=new Koa()
const mongoose=require('mongoose')

const Router=require('koa-router')
const bodyParser = require('koa-bodyparser')


let user=require('./appApi/user')
let home=require('./appApi/home')
let goods=require('./appApi/goods')


const cors = require('koa2-cors')

//两个顺序不能变
app.use(bodyParser())
// 处理跨域，放到中间件的最前面
app.use(cors());


//装载所有子路由
let router=new Router()

router.use('/ss',user.routes())//访问路由的路劲
router.use('/hh',home.routes())
router.use('/goods',goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())



;(async()=>{
    await connect()
    //添加数据,再次插入会失败
    initSchemas()
})()


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

